"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { TopBar } from "../../components/Topbar";
import { createProduct } from "../../lib/product-actions";
import { ArrowLeft, Sparkles, Save, X, Package, DollarSign, Layers, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sku, setSku] = useState(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
  const [category, setCategory] = useState("Electronics");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState<string>("29.99");
  const [costPrice, setCostPrice] = useState<string>("15.00");
  const [stock, setStock] = useState<string>("50");
  const [reorderPoint, setReorderPoint] = useState<string>("15");
  const [supplier, setSupplier] = useState("Main Supplier");
  const [location, setLocation] = useState("Aisle A, Shelf 1");
  const [description, setDescription] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleAutoGenerateSku = () => {
    setSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter a valid product name.");
      return;
    }
    if (!sku.trim()) {
      setErrorMsg("Please provide a SKU code.");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setErrorMsg("Please enter a valid selling price.");
      return;
    }

    const stockNum = parseInt(stock) || 0;
    const reorderNum = parseInt(reorderPoint) || 10;
    const finalCategory = category === "CUSTOM" ? customCategory.trim() || "Other" : category;

    try {
      await createProduct({
        name: name.trim(),
        sku: sku.trim().toUpperCase(),
        category: finalCategory,
        price: priceNum,
        costPrice: costPrice ? parseFloat(costPrice) : undefined,
        stock: stockNum,
        reorderPoint: reorderNum,
        supplier: supplier.trim() || "Unspecified Supplier",
        location: location.trim() || "General Storage",
        description: description.trim(),
      });
      router.push("/products");
    } catch (err) {
      console.error("Failed to create product", err);
      setErrorMsg("Database save failed. Please check inputs and try again.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F7F6F2] text-[#1A1D1D] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Header & Back Action */}
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B63] hover:text-[#0F3D3E] transition-colors mb-1"
              >
                <ArrowLeft size={16} />
                Back to Products List
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">
                Add New Product
              </h1>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Product Creation Form */}
          <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
            {/* Basic Information Card */}
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] pb-3 border-b border-gray-100">
                <Package size={18} className="text-[#0F3D3E]" />
                Basic Product Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wireless Ergonomic Keyboard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                {/* SKU Code */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    SKU / Item Code <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                    />
                    <button
                      type="button"
                      onClick={handleAutoGenerateSku}
                      className="shrink-0 flex items-center gap-1 text-xs font-medium text-[#0F3D3E] bg-[#F7F6F2] hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg transition-colors"
                      title="Auto generate SKU"
                    >
                      <Sparkles size={14} />
                      Generate
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Sporting Goods">Sporting Goods</option>
                    <option value="Other">Other</option>
                    <option value="CUSTOM">+ Custom Category</option>
                  </select>
                </div>

                {category === "CUSTOM" && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                      Custom Category Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter custom category..."
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pricing & Stock Card */}
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] pb-3 border-b border-gray-100">
                <DollarSign size={18} className="text-[#0F3D3E]" />
                Pricing & Inventory Rules
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Selling Price */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Selling Price ($) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30 text-[#0F3D3E]"
                  />
                </div>

                {/* Cost Price */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Cost Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                {/* Initial Stock */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Initial Stock Units <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                {/* Reorder Point */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Reorder Threshold <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={reorderPoint}
                    onChange={(e) => setReorderPoint(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>
              </div>
            </div>

            {/* Warehouse & Supplier */}
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] pb-3 border-b border-gray-100">
                <Truck size={18} className="text-[#0F3D3E]" />
                Warehouse & Supplier Information
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Supplies"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Warehouse Location / Bin Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aisle B, Shelf 3"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                  Product Description & Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed description, dimensions, material, or internal notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
              >
                <X size={15} />
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#0F3D3E] hover:bg-[#2E7D75] rounded-lg shadow-xs transition-colors"
              >
                <Save size={16} />
                Save Product
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}