export type Kpi = {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  warn?: boolean;
};

export type SalesPoint = {
  day: string;
  sales: number;
};

export type CategoryStock = {
  name: string;
  value: number;
};

export type Product = {
  name: string;
  sku: string;
  units: number;
  revenue: string;
};

export type Activity = {
  text: string;
  time: string;
};

export type LowStockItem = {
  name: string;
  sku: string;
  remaining: number;
  reorder: number;
};

export const KPIS: Kpi[] = [
  { label: "Total Products", value: "250", delta: "+4.2%", up: true },
  { label: "Inventory Value", value: "$45,300", delta: "+1.8%", up: true },
  { label: "Low Stock", value: "8", delta: "+3", up: false, warn: true },
  { label: "Sales (30d)", value: "$12,000", delta: "-2.1%", up: false },
];

export const SALES_TREND: SalesPoint[] = [
  { day: "Mon", sales: 1400 },
  { day: "Tue", sales: 1980 },
  { day: "Wed", sales: 1720 },
  { day: "Thu", sales: 2260 },
  { day: "Fri", sales: 1890 },
  { day: "Sat", sales: 2430 },
  { day: "Sun", sales: 2010 },
];

export const STOCK_BY_CATEGORY: CategoryStock[] = [
  { name: "Electronics", value: 86 },
  { name: "Apparel", value: 54 },
  { name: "Home & Kitchen", value: 41 },
  { name: "Sporting Goods", value: 33 },
  { name: "Other", value: 36 },
];

export const PIE_COLORS = ["#0F3D3E", "#2E7D75", "#6FB6AE", "#F0A202", "#C9C4B8"];

export const TOP_PRODUCTS: Product[] = [
  { name: "Wireless Mouse M2", sku: "SKU-1042", units: 312, revenue: "$4,680" },
  { name: "USB-C Hub 7-in-1", sku: "SKU-2210", units: 275, revenue: "$8,250" },
  { name: "Mechanical Keyboard", sku: "SKU-3081", units: 198, revenue: "$11,880" },
  { name: "Desk Lamp LED", sku: "SKU-1177", units: 164, revenue: "$3,280" },
];

export const RECENT_ACTIVITY: Activity[] = [
  { text: "Order #4821 marked as shipped", time: "12 min ago" },
  { text: "Supplier Acme Co. restocked SKU-1042", time: "48 min ago" },
  { text: "New customer Grace Wanjiru registered", time: "1 hr ago" },
  { text: "Order #4819 payment confirmed", time: "2 hr ago" },
];

export const LOW_STOCK: LowStockItem[] = [
  { name: "Bluetooth Speaker Mini", sku: "SKU-4402", remaining: 3, reorder: 20 },
  { name: "Office Chair — Mesh Back", sku: "SKU-5510", remaining: 5, reorder: 15 },
  { name: "HDMI Cable 2m", sku: "SKU-1290", remaining: 6, reorder: 30 },
  { name: "Standing Desk Frame", sku: "SKU-6003", remaining: 2, reorder: 10 },
];

export const NAV_ITEMS = [
  "Dashboard",
  "Products",
  "Categories",
  "Suppliers",
  "Customers",
  "Orders",
  "Inventory",
  "Reports",
  "Settings",
] as const;

