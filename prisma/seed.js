const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a category
  const category = await prisma.category.create({
    data: {
      name: "General",
    },
  });

  // Create a product linked to the category
  const product = await prisma.product.create({
    data: {
      name: "Sample Product",
      sku: "SP-001",
      price: 10.0,
      category: { connect: { id: category.id } },
    },
  });

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
    },
  });

  // Create a supplier
  const supplier = await prisma.supplier.create({
    data: { name: "Main Supplier" },
  });

  // Create a customer
  const customer = await prisma.customer.create({
    data: { name: "John Doe" },
  });

  // Create a purchase
  await prisma.purchase.create({
    data: {
      supplier: { connect: { id: supplier.id } },
      user: { connect: { id: user.id } },
      items: {
        create: [{ product: { connect: { id: product.id } }, quantity: 5, cost: 8.0 }],
      },
    },
  });

  // Create a sale
  await prisma.sale.create({
    data: {
      customer: { connect: { id: customer.id } },
      user: { connect: { id: user.id } },
      items: {
        create: [{ product: { connect: { id: product.id } }, quantity: 2, price: 10.0 }],
      },
    },
  });

  // Create an inventory transaction
  await prisma.inventoryTransaction.create({
    data: {
      product: { connect: { id: product.id } },
      quantity: 100,
      type: "IN",
      user: { connect: { id: user.id } },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
