export type ProductStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export type Product = {
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

export type TransactionType = "STOCK_IN" | "STOCK_OUT" | "ADJUSTMENT";

export type InventoryTransaction = {
  id: string;
  productId: string;
  type: TransactionType;
  quantity: number;
  previousStock: number;
  newStock: number;
  user: string;
  reason: string;
  createdAt: string;
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Mouse M2",
    sku: "SKU-1042",
    category: "Electronics",
    price: 15.00,
    costPrice: 8.50,
    stock: 312,
    reorderPoint: 25,
    supplier: "LogiTech Direct",
    location: "Aisle A, Shelf 2",
    description: "Ergonomic wireless mouse with 2.4GHz USB receiver and long battery life.",
    createdAt: "2026-01-15T08:30:00Z",
    updatedAt: "2026-07-20T14:15:00Z",
  },
  {
    id: "prod-2",
    name: "USB-C Hub 7-in-1",
    sku: "SKU-2210",
    category: "Electronics",
    price: 30.00,
    costPrice: 16.00,
    stock: 275,
    reorderPoint: 30,
    supplier: "Anker Technologies",
    location: "Aisle A, Shelf 4",
    description: "7-in-1 USB-C hub with HDMI 4K, 3x USB 3.0, SD card reader, and 100W PD pass-through.",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-07-22T09:45:00Z",
  },
  {
    id: "prod-3",
    name: "Mechanical Keyboard",
    sku: "SKU-3081",
    category: "Electronics",
    price: 60.00,
    costPrice: 35.00,
    stock: 198,
    reorderPoint: 20,
    supplier: "Keychron Co.",
    location: "Aisle B, Shelf 1",
    description: "Compact tactile mechanical keyboard with RGB backlighting and Bluetooth support.",
    createdAt: "2026-02-10T11:20:00Z",
    updatedAt: "2026-07-21T16:30:00Z",
  },
  {
    id: "prod-4",
    name: "Desk Lamp LED",
    sku: "SKU-1177",
    category: "Home & Kitchen",
    price: 20.00,
    costPrice: 9.20,
    stock: 164,
    reorderPoint: 15,
    supplier: "BrightLife Goods",
    location: "Aisle C, Shelf 3",
    description: "Dimmable LED desk lamp with touch controls, 5 color modes, and USB charging port.",
    createdAt: "2026-03-05T09:15:00Z",
    updatedAt: "2026-07-18T11:00:00Z",
  },
  {
    id: "prod-5",
    name: "Bluetooth Speaker Mini",
    sku: "SKU-4402",
    category: "Electronics",
    price: 28.50,
    costPrice: 14.00,
    stock: 3,
    reorderPoint: 20,
    supplier: "SoundWave Audio",
    location: "Aisle A, Shelf 1",
    description: "Waterproof portable Bluetooth speaker with deep bass and 12-hour playtime.",
    createdAt: "2026-03-12T14:00:00Z",
    updatedAt: "2026-07-24T18:10:00Z",
  },
  {
    id: "prod-6",
    name: "Office Chair — Mesh Back",
    sku: "SKU-5510",
    category: "Other",
    price: 145.00,
    costPrice: 85.00,
    stock: 5,
    reorderPoint: 15,
    supplier: "ErgoComfort Furniture",
    location: "Aisle D, Floor Zone 1",
    description: "Ergonomic mesh office chair with adjustable lumbar support and 3D armrests.",
    createdAt: "2026-04-01T08:00:00Z",
    updatedAt: "2026-07-23T12:00:00Z",
  },
  {
    id: "prod-7",
    name: "HDMI Cable 2m",
    sku: "SKU-1290",
    category: "Electronics",
    price: 8.99,
    costPrice: 2.50,
    stock: 6,
    reorderPoint: 30,
    supplier: "CableCraft Inc.",
    location: "Aisle A, Shelf 5",
    description: "High-speed HDMI 2.1 cable supporting 8K @ 60Hz with gold-plated connectors.",
    createdAt: "2026-04-15T15:45:00Z",
    updatedAt: "2026-07-24T08:20:00Z",
  },
  {
    id: "prod-8",
    name: "Standing Desk Frame",
    sku: "SKU-6003",
    category: "Other",
    price: 249.00,
    costPrice: 150.00,
    stock: 2,
    reorderPoint: 10,
    supplier: "FlexiStand Co.",
    location: "Aisle D, Floor Zone 2",
    description: "Dual-motor electric height adjustable standing desk frame with memory presets.",
    createdAt: "2026-05-02T13:10:00Z",
    updatedAt: "2026-07-25T10:00:00Z",
  },
  {
    id: "prod-9",
    name: "Cotton Crewneck T-Shirt",
    sku: "SKU-7720",
    category: "Apparel",
    price: 18.50,
    costPrice: 6.00,
    stock: 140,
    reorderPoint: 40,
    supplier: "Urban Wear Supplies",
    location: "Aisle E, Rack 2",
    description: "100% organic heavy-weight cotton crewneck t-shirt in unisex fit.",
    createdAt: "2026-05-18T10:30:00Z",
    updatedAt: "2026-07-15T14:20:00Z",
  },
  {
    id: "prod-10",
    name: "Stainless Steel Water Bottle",
    sku: "SKU-8811",
    category: "Sporting Goods",
    price: 22.00,
    costPrice: 9.00,
    stock: 88,
    reorderPoint: 25,
    supplier: "HydroPeak Gear",
    location: "Aisle C, Shelf 1",
    description: "Double-wall vacuum insulated water bottle (32oz) keeps cold for 24 hours.",
    createdAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-07-19T17:40:00Z",
  },
  {
    id: "prod-11",
    name: "Noise Cancelling Headphones",
    sku: "SKU-9012",
    category: "Electronics",
    price: 180.00,
    costPrice: 110.00,
    stock: 0,
    reorderPoint: 15,
    supplier: "SoundWave Audio",
    location: "Aisle A, Shelf 3",
    description: "Over-ear active noise-cancelling wireless headphones with high-res sound.",
    createdAt: "2026-06-10T16:00:00Z",
    updatedAt: "2026-07-25T11:30:00Z",
  },
  {
    id: "prod-12",
    name: "Ergonomic Desk Mat XL",
    sku: "SKU-3490",
    category: "Home & Kitchen",
    price: 24.99,
    costPrice: 9.80,
    stock: 95,
    reorderPoint: 20,
    supplier: "DeskMate Supplies",
    location: "Aisle C, Shelf 4",
    description: "Waterproof felt & eco-leather oversized desk pad for keyboard and mouse.",
    createdAt: "2026-06-20T12:00:00Z",
    updatedAt: "2026-07-20T10:15:00Z",
  }
];

export const INITIAL_TRANSACTIONS: Record<string, InventoryTransaction[]> = {
  "prod-1": [
    {
      id: "tx-101",
      productId: "prod-1",
      type: "STOCK_IN",
      quantity: 150,
      previousStock: 162,
      newStock: 312,
      user: "Ken (Admin)",
      reason: "Supplier shipment received (PO-8821)",
      createdAt: "2026-07-20T14:15:00Z",
    },
    {
      id: "tx-102",
      productId: "prod-1",
      type: "STOCK_OUT",
      quantity: 18,
      previousStock: 180,
      newStock: 162,
      user: "Grace W.",
      reason: "Customer sale order #4819",
      createdAt: "2026-07-15T11:00:00Z",
    }
  ],
  "prod-5": [
    {
      id: "tx-103",
      productId: "prod-5",
      type: "STOCK_OUT",
      quantity: 15,
      previousStock: 18,
      newStock: 3,
      user: "Ken (Admin)",
      reason: "Customer sale order #4820",
      createdAt: "2026-07-24T18:10:00Z",
    }
  ],
  "prod-11": [
    {
      id: "tx-104",
      productId: "prod-11",
      type: "ADJUSTMENT",
      quantity: -5,
      previousStock: 5,
      newStock: 0,
      user: "Store Manager",
      reason: "Damaged inventory write-off",
      createdAt: "2026-07-25T11:30:00Z",
    }
  ]
};

export function getProductStatus(product: Product): ProductStatus {
  if (product.stock <= 0) return "OUT_OF_STOCK";
  if (product.stock <= product.reorderPoint) return "LOW_STOCK";
  return "IN_STOCK";
}

// Client Storage helper functions using localStorage fallback
const STORAGE_KEY_PRODUCTS = "kenki_products_db";
const STORAGE_KEY_TRANSACTIONS = "kenki_transactions_db";

export function loadProductsFromStorage(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  } catch (e) {
    console.error("Failed to read products from localStorage", e);
  }
  return INITIAL_PRODUCTS;
}

export function saveProductsToStorage(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error("Failed to save products to localStorage", e);
  }
}

export function loadTransactionsFromStorage(): Record<string, InventoryTransaction[]> {
  if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
  } catch (e) {
    console.error("Failed to read transactions from localStorage", e);
  }
  return INITIAL_TRANSACTIONS;
}

export function saveTransactionsToStorage(transactions: Record<string, InventoryTransaction[]>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
  } catch (e) {
    console.error("Failed to save transactions to localStorage", e);
  }
}
