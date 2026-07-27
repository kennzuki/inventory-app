"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";

// fetch all categories from database
export async function getAllCategories() {
   const categories=await prisma.category.findMany({
    orderBy:{name:"asc"},
    include:{
      _count:{select:{products:true}}
    }
   })
   return categories
}

//get largest category by count of products
export async function getLargestCategory() {
  const categories=await prisma.category.findMany({
    orderBy:{
      products:{_count:"desc"}
    },
    include:{
      _count:{select:{products:true}}
    }
  })
  return categories[0]
} 

//get low stock order level for display in categories page

export async function getLowStockProductsByCategory() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          id: true,
          name: true,
          sku: true,
          stock: true,
          reorderPoint: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
 
  return categories
    .map((c) => ({
      categoryId: c.id,
      category: c.name,
      products: c.products.filter((p) => p.stock <= p.reorderPoint),
    }))
    .filter((c) => c.products.length > 0);
}

//add category by using useActionState


export type ActionResult = {
  success?: boolean;
  error?: string;
};
 
export async function addCategory(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
 
  if (!name) {
    return { error: "Category name is required" };
  }
 
  if (name.length < 2) {
    return { error: "Name must be at least 2 characters" };
  }
 
  if (name.length > 60) {
    return { error: "Name must be under 60 characters" };
  }
 
  const existing = await prisma.category.findUnique({
    where: { name },
    select: { id: true },
  });
 
  if (existing) {
    return { error: "A category with this name already exists" };
  }
 
  await prisma.category.create({ data: { name } });
 
  revalidatePath("/categories");
  return { success: true };
}



//current stock count
export async function getStockCountByCategory() {
  const categories = await prisma.category.findMany({
    include: {
      products: { select: { stock: true } },
    },
    orderBy: { name: "asc" },
  });

  return categories.map((c) => ({
    categoryId: c.id,
    category: c.name,
    totalStock: c.products.reduce((sum, p) => sum + p.stock, 0),
  }));
}


//get category by id


export async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          sku: true,
          stock: true,
          reorderPoint: true,
        },
        orderBy: { name: "asc" },
      },
      _count: { select: { products: true } },
    },
  });
 
  return category;
}
 