"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { currentUser } from "@clerk/nextjs/server";

// Helper to get or create DB User matching Clerk session
async function getOrCreateDbUser() {
  let email = "user@example.com";
  let name = "Sample User";

  try {
    const clerkUser = await currentUser();
    if (clerkUser) {
      email = clerkUser.emailAddresses[0]?.emailAddress || email;
      name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || name;
    }
  } catch (e) {
    console.warn("Failed to retrieve Clerk user, falling back to seed user", e);
  }

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        role: "ADMIN",
      },
    });
  }
  return user;
}

export type SerializedProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice?: number;
  stock: number;
  reorderPoint: number;
  supplier: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type SerializedTransaction = {
  id: string;
  productId: string;
  type: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  user: string;
  reason: string;
  createdAt: string;
};

// Map Prisma Product to serializable UI Product type
function mapDbProduct(p: any): SerializedProduct {
  return {
    id: p.id,
    name: p.name,
    sku: p.sku,
    category: p.category.name,
    price: Number(p.price),
    costPrice: p.costPrice ? Number(p.costPrice) : undefined,
    stock: p.stock,
    reorderPoint: p.reorderPoint,
    supplier: p.supplier ? p.supplier.name : "Unspecified Supplier",
    location: p.location || "General Storage",
    description: p.description || "",
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
  };
}

// 1. READ ALL
export async function getProducts() {
  const dbProducts = await prisma.product.findMany({
    include: {
      category: true,
      supplier: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return dbProducts.map(mapDbProduct);
}

// 2. READ ONE BY ID
export async function getProductById(id: string) {
  const p = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      supplier: true,
      inventoryTransactions: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!p) return null;

  const product = mapDbProduct(p);

  const transactions: SerializedTransaction[] = p.inventoryTransactions.map((tx: any) => {
    // Determine previous stock level if possible or just represent the state
    return {
      id: tx.id,
      productId: tx.productId,
      type: tx.type === "IN" ? "STOCK_IN" : tx.type === "OUT" ? "STOCK_OUT" : "ADJUSTMENT",
      quantity: tx.quantity,
      previousStock: 0, // derived representation or placeholder
      newStock: 0,      // calculated on frontend or log
      user: tx.user.name || tx.user.email,
      reason: tx.type === "IN" ? "Stock replenishment / receiving" : "Stock reduction / sales",
      createdAt: tx.createdAt.toISOString(),
    };
  });

  return { product, transactions };
}

// 3. CREATE
export async function createProduct(data: {
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice?: number;
  stock: number;
  reorderPoint: number;
  supplier: string;
  location: string;
  description: string;
}) {
  const dbUser = await getOrCreateDbUser();

  // Find or create Supplier (name is not unique in schema, findFirst matches)
  let dbSupplier = null;
  if (data.supplier.trim()) {
    dbSupplier = await prisma.supplier.findFirst({
      where: { name: data.supplier.trim() },
    });
    if (!dbSupplier) {
      dbSupplier = await prisma.supplier.create({
        data: { name: data.supplier.trim() },
      });
    }
  }

  // Create Product with Category connectOrCreate
const created = await prisma.product.create({
  data: {
    name: data.name,
    sku: data.sku.toUpperCase(),
    price: data.price,
    costPrice: data.costPrice,
    stock: data.stock,
    reorderPoint: data.reorderPoint,
    description: data.description,
    location: data.location,
    category: {
      connectOrCreate: {
        where: { name: data.category.trim() },
        create: { name: data.category.trim() },
      },
    },
    ...(dbSupplier && {
      supplier: {
        connect: { id: dbSupplier.id },
      },
    }),
  },
});
  // Create initial transaction if stock > 0
  if (data.stock > 0) {
    await prisma.inventoryTransaction.create({
      data: {
        productId: created.id,
        quantity: data.stock,
        type: "IN",
        userId: dbUser.id,
      },
    });
  }

  revalidatePath("/products");
  return created.id;
}

// 4. UPDATE
export async function updateProduct(
  id: string,
  data: {
    name: string;
    sku: string;
    category: string;
    price: number;
    costPrice?: number;
    stock: number;
    reorderPoint: number;
    supplier: string;
    location: string;
    description: string;
  }
) {
  const dbUser = await getOrCreateDbUser();

  // Find or create Supplier
  let dbSupplier = null;
  if (data.supplier.trim()) {
    dbSupplier = await prisma.supplier.findFirst({
      where: { name: data.supplier.trim() },
    });
    if (!dbSupplier) {
      dbSupplier = await prisma.supplier.create({
        data: { name: data.supplier.trim() },
      });
    }
  }

  // Get current product stock for record transactions if stock was direct edited
  const current = await prisma.product.findUnique({
    where: { id },
  });

  const stockDiff = current ? data.stock - current.stock : 0;

  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      sku: data.sku.toUpperCase(),
      price: data.price,
      costPrice: data.costPrice,
      stock: data.stock,
      reorderPoint: data.reorderPoint,
      description: data.description,
      location: data.location,
      category: {
        connectOrCreate: {
          where: { name: data.category.trim() },
          create: { name: data.category.trim() },
        },
      },
      supplierId: dbSupplier ? dbSupplier.id : null,
    },
  });

  // Log transaction for manual stock edit difference
  if (stockDiff !== 0) {
    await prisma.inventoryTransaction.create({
      data: {
        productId: id,
        quantity: Math.abs(stockDiff),
        type: stockDiff > 0 ? "IN" : "OUT",
        userId: dbUser.id,
      },
    });
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  return updated.id;
}

// 5. DELETE
export async function deleteProduct(id: string) {
  // Safe cascade deletes for child tables
  await prisma.inventoryTransaction.deleteMany({ where: { productId: id } });
  await prisma.saleItem.deleteMany({ where: { productId: id } });
  await prisma.purchaseItem.deleteMany({ where: { productId: id } });

  const deleted = await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/products");
  return deleted.id;
}

// 6. STOCK ADJUSTMENT
export async function adjustProductStock(
  productId: string,
  data: {
    type: "STOCK_IN" | "STOCK_OUT" | "ADJUSTMENT";
    quantity: number; // always positive in modal inputs, we apply positive/negative sign
    user: string;
    reason: string;
  }
) {
  const dbUser = await getOrCreateDbUser();
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  let delta = data.quantity;
  if (data.type === "STOCK_OUT") {
    delta = -data.quantity;
  } else if (data.type === "ADJUSTMENT") {
    // If reason mentions reduction or is negative, adjust accordingly
    delta = data.reason.toLowerCase().includes("remove") || data.reason.toLowerCase().includes("damage")
      ? -data.quantity
      : data.quantity;
  }

  const previousStock = product.stock;
  const newStock = Math.max(0, previousStock + delta);

  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: newStock,
    },
  });

  const transaction = await prisma.inventoryTransaction.create({
    data: {
      productId,
      quantity: Math.abs(delta),
      type: delta >= 0 ? "IN" : "OUT",
      userId: dbUser.id,
    },
  });

  revalidatePath("/products");
  revalidatePath(`/products/${productId}`);
  return { transactionId: transaction.id, newStock };
}
