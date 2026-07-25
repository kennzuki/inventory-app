"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { TopBar } from "../../components/Topbar";
import {
  getProductStatus,
  TransactionType,
} from "../../lib/products-data";
import {
  getProductById,
  adjustProductStock,
  deleteProduct,
  SerializedProduct as Product,
  SerializedTransaction as InventoryTransaction,
} from "../../lib/product-actions";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PlusCircle,
  MinusCircle,
  Tag,
  MapPin,
  Truck,
  DollarSign,
  Boxes,
  History,
  Layers,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductDetailsClientProps {
  id: string;
}

export function ProductDetailsClient({ id }: ProductDetailsClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Stock Adjustment Modal state
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustType, setAdjustType] = useState<TransactionType>("STOCK_IN");
  const [adjustQty, setAdjustQty] = useState<number>(10);
  const [adjustReason, setAdjustReason] = useState("");
  const [adjustUser, setAdjustUser] = useState("Ken (Admin)");

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getProductById(id);
        if (res) {
          setProduct(res.product);
          setTransactions(res.transactions);
        }
      } catch (e) {
        console.error("Failed to load product details", e);
      }
      setIsLoaded(true);
    }
    loadData();
  }, [id]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F6F2] text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen w-full bg-[#F7F6F2] text-[#1A1D1D] font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto px-6 py-12 text-center">
            <div className="max-w-md mx-auto rounded-xl bg-white p-8 border border-black/10 shadow-xs">
              <Boxes size={48} className="mx-auto text-gray-300 mb-3" />
              <h2 className="text-xl font-bold text-[#1A1D1D]">Product Not Found</h2>
              <p className="text-sm text-gray-500 mt-2">
                The product with ID <code className="bg-gray-100 px-1 py-0.5 rounded">{id}</code> could not be found or has been deleted.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 bg-[#0F3D3E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2E7D75] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Products List
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const status = getProductStatus(product);
  const statusConfig = {
    IN_STOCK: {
      label: "In Stock",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
    },
    LOW_STOCK: {
      label: "Low Stock",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      icon: AlertTriangle,
    },
    OUT_OF_STOCK: {
      label: "Out of Stock",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      icon: XCircle,
    },
  }[status];

  const StatusIcon = statusConfig.icon;

  const margin = product.costPrice
    ? (((product.price - product.costPrice) / product.price) * 100).toFixed(1)
    : null;

  const handleStockAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || adjustQty <= 0) return;

    try {
      const res = await adjustProductStock(product.id, {
        type: adjustType,
        quantity: adjustQty,
        user: adjustUser,
        reason: adjustReason,
      });

      // Update local states
      setProduct({ ...product, stock: res.newStock, updatedAt: new Date().toISOString() });

      // Reload product data to get updated transaction log from DB
      const details = await getProductById(product.id);
      if (details) {
        setTransactions(details.transactions);
      }
    } catch (err) {
      console.error("Failed to adjust stock", err);
    }

    setIsAdjustModalOpen(false);
    setAdjustReason("");
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product.id);
      router.push("/products");
    } catch (e) {
      console.error("Failed to delete product", e);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F7F6F2] text-[#1A1D1D] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B63] hover:text-[#0F3D3E] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAdjustModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <PlusCircle size={15} />
                Adjust Stock
              </button>
              <Link
                href={`/products/${product.id}/edit`}
                className="inline-flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-slate-50 text-[#1A1D1D] px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Edit3 size={15} />
                Edit Details
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-1.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>

          {/* Product Header Banner */}
          <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {product.sku}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B63] bg-[#F7F6F2] px-2.5 py-0.5 rounded border border-gray-200">
                    <Tag size={12} className="text-[#0F3D3E]" />
                    {product.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.badgeClass}`}
                  >
                    <StatusIcon size={12} />
                    {statusConfig.label}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#1A1D1D]">{product.name}</h1>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {product.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck size={13} /> Supplier: {product.supplier}
                  </span>
                </p>
              </div>

              {/* Price & Stock Highlight Card */}
              <div className="flex items-center gap-6 bg-[#F7F6F2] p-4 rounded-xl border border-gray-200">
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Selling Price</span>
                  <span className="text-2xl font-extrabold text-[#0F3D3E]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-300" />
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Current Stock</span>
                  <span className="text-2xl font-extrabold text-[#1A1D1D]">
                    {product.stock}{" "}
                    <span className="text-xs font-normal text-gray-500">units</span>
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-300" />
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Stock Value</span>
                  <span className="text-xl font-bold text-amber-700">
                    ${(product.stock * product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 columns: Overview Specifications & Notes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Specifications Card */}
              <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] mb-4 pb-3 border-b border-gray-100">
                  <Layers size={18} className="text-[#0F3D3E]" />
                  Product Specifications & Metrics
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-[#F7F6F2]/60 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 block font-medium">SKU Code</span>
                    <span className="font-mono font-semibold text-[#1A1D1D]">{product.sku}</span>
                  </div>
                  <div className="bg-[#F7F6F2]/60 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 block font-medium">Category</span>
                    <span className="font-semibold text-[#1A1D1D]">{product.category}</span>
                  </div>
                  <div className="bg-[#F7F6F2]/60 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 block font-medium">Cost Price</span>
                    <span className="font-semibold text-[#1A1D1D]">
                      {product.costPrice ? `$${product.costPrice.toFixed(2)}` : "N/A"}
                    </span>
                  </div>
                  <div className="bg-[#F7F6F2]/60 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 block font-medium">Est. Profit Margin</span>
                    <span className="font-semibold text-emerald-700">
                      {margin ? `${margin}%` : "N/A"}
                    </span>
                  </div>
                  <div className="bg-[#F7F6F2]/60 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 block font-medium">Reorder Threshold</span>
                    <span className="font-semibold text-amber-700">{product.reorderPoint} units</span>
                  </div>
                  <div className="bg-[#F7F6F2]/60 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 block font-medium">Warehouse Location</span>
                    <span className="font-semibold text-[#1A1D1D]">{product.location}</span>
                  </div>
                </div>
              </div>

              {/* Description & Notes Card */}
              <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] mb-3 pb-3 border-b border-gray-100">
                  <FileText size={18} className="text-[#0F3D3E]" />
                  Product Description & Notes
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description || "No specific description has been entered for this product item."}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
                  <span>Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Supplier Info & Quick Actions */}
            <div className="space-y-6">
              {/* Supplier Box */}
              <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] mb-4 pb-3 border-b border-gray-100">
                  <Truck size={18} className="text-[#0F3D3E]" />
                  Supplier Details
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs text-gray-500 block font-medium">Supplier Name</span>
                    <span className="font-semibold text-[#1A1D1D]">{product.supplier}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-medium">Fulfillment Location</span>
                    <span className="text-xs text-gray-700">{product.location}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-medium">Stock Status</span>
                    <span className="text-xs font-semibold text-emerald-700">Verified Vendor Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="rounded-xl border border-black/10 bg-[#0F3D3E] text-white p-6 shadow-xs">
                <h3 className="font-bold text-base mb-2">Inventory Management</h3>
                <p className="text-xs text-[#B9C4C3] mb-4">
                  Quickly record receiving shipments, order dispatches, or inventory audits.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAdjustType("STOCK_IN");
                      setIsAdjustModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#F0A202] hover:bg-[#d99200] text-[#0F3D3E] font-bold px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    <PlusCircle size={16} />
                    Record Stock In (Receiving)
                  </button>
                  <button
                    onClick={() => {
                      setAdjustType("STOCK_OUT");
                      setIsAdjustModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    <MinusCircle size={16} />
                    Record Stock Out (Dispatch)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Audit History Log */}
          <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D]">
                <History size={18} className="text-[#0F3D3E]" />
                Inventory Transaction Audit Log
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {transactions.length} recorded events
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500">
                No inventory transactions recorded yet for this product. Use "Adjust Stock" to add transactions.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F6F2] border-b border-gray-200 text-gray-500 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Date & Time</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Quantity Delta</th>
                      <th className="py-2.5 px-3">Stock Level</th>
                      <th className="py-2.5 px-3">Recorded By</th>
                      <th className="py-2.5 px-3">Reason / Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-gray-600">
                          {new Date(tx.createdAt).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3">
                          {tx.type === "STOCK_IN" && (
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              + Stock In
                            </span>
                          )}
                          {tx.type === "STOCK_OUT" && (
                            <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                              - Stock Out
                            </span>
                          )}
                          {tx.type === "ADJUSTMENT" && (
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                              ~ Adjustment
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-bold">
                          {tx.quantity > 0 ? `+${tx.quantity}` : tx.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-gray-700">
                          {tx.previousStock} &rarr;{" "}
                          <span className="font-bold text-[#0F3D3E]">{tx.newStock}</span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-gray-800">{tx.user}</td>
                        <td className="py-2.5 px-3 text-gray-600 max-w-xs truncate">{tx.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Adjust Stock Modal */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200">
            <h3 className="text-lg font-bold text-[#1A1D1D] mb-1">Record Stock Adjustment</h3>
            <p className="text-xs text-gray-500 mb-4">
              Updating stock for <strong className="text-[#0F3D3E]">{product.name}</strong>
            </p>

            <form onSubmit={handleStockAdjustSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                  Transaction Type
                </label>
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value as TransactionType)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none"
                >
                  <option value="STOCK_IN">Stock In (+ Receiving / Restock)</option>
                  <option value="STOCK_OUT">Stock Out (- Sale / Dispatch)</option>
                  <option value="ADJUSTMENT">Manual Stock Audit / Correction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                  Recorded By
                </label>
                <input
                  type="text"
                  value={adjustUser}
                  onChange={(e) => setAdjustUser(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                  Reason / Reference Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Restock PO-9912 or Damaged item write-off"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0F3D3E] hover:bg-[#2E7D75] rounded-lg transition-colors shadow-xs"
                >
                  Save Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#1A1D1D]">Delete Product</h3>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">{product.name}</strong>? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
