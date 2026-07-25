const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PRODUCTS_DATA = [
  {
    name: "Wireless Mouse M2",
    sku: "SKU-1042",
    category: "Electronics",
    price: 15.00,
    costPrice: 8.50,
    stock: 312,
    reorderPoint: 25,
    supplier: "LogiTech Direct",
    location: "Aisle A, Shelf 2",
    description: "Ergonomic wireless mouse with 2.4GHz USB receiver and long battery life."
  },
  {
    name: "USB-C Hub 7-in-1",
    sku: "SKU-2210",
    category: "Electronics",
    price: 30.00,
    costPrice: 16.00,
    stock: 275,
    reorderPoint: 30,
    supplier: "Anker Technologies",
    location: "Aisle A, Shelf 4",
    description: "7-in-1 USB-C hub with HDMI 4K, 3x USB 3.0, SD card reader, and 100W PD pass-through."
  },
  {
    name: "Mechanical Keyboard",
    sku: "SKU-3081",
    category: "Electronics",
    price: 60.00,
    costPrice: 35.00,
    stock: 198,
    reorderPoint: 20,
    supplier: "Keychron Co.",
    location: "Aisle B, Shelf 1",
    description: "Compact tactile mechanical keyboard with RGB backlighting and Bluetooth support."
  },
  {
    name: "Desk Lamp LED",
    sku: "SKU-1177",
    category: "Home & Kitchen",
    price: 20.00,
    costPrice: 9.20,
    stock: 164,
    reorderPoint: 15,
    supplier: "BrightLife Goods",
    location: "Aisle C, Shelf 3",
    description: "Dimmable LED desk lamp with touch controls, 5 color modes, and USB charging port."
  },
  {
    name: "Bluetooth Speaker Mini",
    sku: "SKU-4402",
    category: "Electronics",
    price: 28.50,
    costPrice: 14.00,
    stock: 3,
    reorderPoint: 20,
    supplier: "SoundWave Audio",
    location: "Aisle A, Shelf 1",
    description: "Waterproof portable Bluetooth speaker with deep bass and 12-hour playtime."
  },
  {
    name: "Office Chair — Mesh Back",
    sku: "SKU-5510",
    category: "Other",
    price: 145.00,
    costPrice: 85.00,
    stock: 5,
    reorderPoint: 15,
    supplier: "ErgoComfort Furniture",
    location: "Aisle D, Floor Zone 1",
    description: "Ergonomic mesh office chair with adjustable lumbar support and 3D armrests."
  },
  {
    name: "HDMI Cable 2m",
    sku: "SKU-1290",
    category: "Electronics",
    price: 8.99,
    costPrice: 2.50,
    stock: 6,
    reorderPoint: 30,
    supplier: "CableCraft Inc.",
    location: "Aisle A, Shelf 5",
    description: "High-speed HDMI 2.1 cable supporting 8K @ 60Hz with gold-plated connectors."
  },
  {
    name: "Standing Desk Frame",
    sku: "SKU-6003",
    category: "Other",
    price: 249.00,
    costPrice: 150.00,
    stock: 2,
    reorderPoint: 10,
    supplier: "FlexiStand Co.",
    location: "Aisle D, Floor Zone 2",
    description: "Dual-motor electric height adjustable standing desk frame with memory presets."
  },
  {
    name: "Cotton Crewneck T-Shirt",
    sku: "SKU-7720",
    category: "Apparel",
    price: 18.50,
    costPrice: 6.00,
    stock: 140,
    reorderPoint: 40,
    supplier: "Urban Wear Supplies",
    location: "Aisle E, Rack 2",
    description: "100% organic heavy-weight cotton crewneck t-shirt in unisex fit."
  },
  {
    name: "Stainless Steel Water Bottle",
    sku: "SKU-8811",
    category: "Sporting Goods",
    price: 22.00,
    costPrice: 9.00,
    stock: 88,
    reorderPoint: 25,
    supplier: "HydroPeak Gear",
    location: "Aisle C, Shelf 1",
    description: "Double-wall vacuum insulated water bottle (32oz) keeps cold for 24 hours."
  },
  {
    name: "Noise Cancelling Headphones",
    sku: "SKU-9012",
    category: "Electronics",
    price: 180.00,
    costPrice: 110.00,
    stock: 0,
    reorderPoint: 15,
    supplier: "SoundWave Audio",
    location: "Aisle A, Shelf 3",
    description: "Over-ear active noise-cancelling wireless headphones with high-res sound."
  },
  {
    name: "Ergonomic Desk Mat XL",
    sku: "SKU-3490",
    category: "Home & Kitchen",
    price: 24.99,
    costPrice: 9.80,
    stock: 95,
    reorderPoint: 20,
    supplier: "DeskMate Supplies",
    location: "Aisle C, Shelf 4",
    description: "Waterproof felt & eco-leather oversized desk pad for keyboard and mouse."
  }
];

async function main() {
  console.log("Starting DB seed cleanup...");
  
  // Cleanup in dependencies order
  await prisma.inventoryTransaction.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.purchaseItem.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();

  console.log("DB cleanup completed. Creating seed records...");

  // 1. Create a default seed user
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Sample User",
      role: "ADMIN"
    }
  });

  // 2. Create a default customer
  const customer = await prisma.customer.create({
    data: { name: "John Doe" }
  });

  // 3. Cache unique categories and suppliers to create
  const categoryNames = [...new Set(PRODUCTS_DATA.map(p => p.category))];
  const supplierNames = [...new Set(PRODUCTS_DATA.map(p => p.supplier))];

  console.log(`Seeding ${categoryNames.length} categories...`);
  const categoryMap = {};
  for (const name of categoryNames) {
    const cat = await prisma.category.create({ data: { name } });
    categoryMap[name] = cat.id;
  }

  console.log(`Seeding ${supplierNames.length} suppliers...`);
  const supplierMap = {};
  for (const name of supplierNames) {
    const sup = await prisma.supplier.create({ data: { name } });
    supplierMap[name] = sup.id;
  }

  // 4. Seed products and record inventory transactions
  console.log(`Seeding ${PRODUCTS_DATA.length} products...`);
  for (const p of PRODUCTS_DATA) {
    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        sku: p.sku,
        price: p.price,
        costPrice: p.costPrice,
        stock: p.stock,
        reorderPoint: p.reorderPoint,
        description: p.description,
        location: p.location,
        categoryId: categoryMap[p.category],
        supplierId: supplierMap[p.supplier]
      }
    });

    // Create initial IN inventory transaction for stock representation
    if (p.stock > 0) {
      await prisma.inventoryTransaction.create({
        data: {
          productId: createdProduct.id,
          quantity: p.stock,
          type: "IN",
          userId: user.id,
          createdAt: new Date()
        }
      });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
