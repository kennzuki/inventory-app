"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductTable } from "../components/ProductTable";
import {
  getProductStatus,
} from "../lib/products-data";
import {
  getProducts,
  deleteProduct,
  SerializedProduct as Product
} from "../lib/product-actions";
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  PackageCheck,
  AlertTriangle,
  Boxes,
  DollarSign,
  X,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products", e);
      }
      setIsLoaded(true);
    }
    loadData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTargetId));
    } catch (e) {
      console.error("Failed to delete product", e);
    }
    setDeleteTargetId(null);
  };

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;

    const status = getProductStatus(product);
    const matchesStatus =
      selectedStatus === "ALL" || status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate Metrics
  const totalProducts = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(
    (p) => getProductStatus(p) === "LOW_STOCK" || getProductStatus(p) === "OUT_OF_STOCK"
  ).length;
  const totalInventoryValue = products.reduce(
    (acc, p) => acc + p.stock * p.price,
    0
  );

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
    <main className="h-full overflow-y-auto px-6 py-6 space-y-6">
          {/* Header & CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">
                Product Inventory
              </h1>
              <p className="text-sm text-[#6B6B63] mt-0.5">
                Manage, filter, and monitor stock levels across your entire catalog.
              </p>
            </div>
            <Link
              href="/products/new"
              className="inline-flex items-center justify-center gap-2 bg-[#0F3D3E] hover:bg-[#2E7D75] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition-colors"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>

          {/* Stats KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-teal-50 text-[#0F3D3E] flex items-center justify-center">
                <Boxes size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Total Products</span>
                <span className="text-xl font-bold text-[#1A1D1D]">{totalProducts}</span>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <PackageCheck size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Total Units in Stock</span>
                <span className="text-xl font-bold text-[#1A1D1D]">{totalStockUnits.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Low / Out of Stock</span>
                <span className="text-xl font-bold text-amber-700">{lowStockCount}</span>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-amber-50 text-[#F0A202] flex items-center justify-center">
                <DollarSign size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Inventory Value</span>
                <span className="text-xl font-bold text-[#0F3D3E]">
                  ${totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Search, Filters & View Mode Bar */}
          <div className="rounded-xl border border-black/10 bg-white p-4 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product name, SKU, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D3E] focus:border-transparent bg-[#F7F6F2]/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Filter Selects */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-medium text-[#6B6B63] px-2 py-1 bg-[#F7F6F2] rounded-md border border-gray-200">
                  <Filter size={13} /> Filters:
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-[#1A1D1D] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Stock Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-[#1A1D1D] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]"
                >
                  <option value="ALL">All Stock Statuses</option>
                  <option value="IN_STOCK">In Stock</option>
                  <option value="LOW_STOCK">Low Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-[#F7F6F2]">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                      viewMode === "table"
                        ? "bg-white text-[#0F3D3E] shadow-xs"
                        : "text-gray-500 hover:text-[#1A1D1D]"
                    }`}
                    title="Table View"
                  >
                    <List size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-[#0F3D3E] shadow-xs"
                        : "text-gray-500 hover:text-[#1A1D1D]"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Summary indicator */}
            {(searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL") && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-[#6B6B63]">
                <span>
                  Showing {filteredProducts.length} of {products.length} products
                </span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("ALL");
                    setSelectedStatus("ALL");
                  }}
                  className="text-[#0F3D3E] hover:underline font-medium"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Product Listing Display */}
          {!isLoaded ? (
            <div className="p-12 text-center text-sm text-gray-500">Loading products database...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-black/10 bg-white p-12 text-center">
              <Boxes size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-base font-semibold text-[#1A1D1D]">No products found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                No inventory items match your current search or filter criteria. Try clearing filters or adding a new product.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                  setSelectedStatus("ALL");
                }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0F3D3E] border border-[#0F3D3E]/30 px-3 py-1.5 rounded-lg hover:bg-slate-50"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === "table" ? (
            <ProductTable products={filteredProducts} onDelete={(id) => setDeleteTargetId(id)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={(id) => setDeleteTargetId(id)}
                />
              ))}
            </div>
          )}
        </main>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#1A1D1D]">Delete Product</h3>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this product? This will remove the item from your inventory database.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    
   
    </>
  );
}