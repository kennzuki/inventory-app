"use client";

import { useState, useEffect } from "react";
import {
  getProductById,
  updateProduct,
  SerializedProduct as Product
} from "../../../lib/product-actions";
import { ArrowLeft, Save, X, Package, DollarSign, Truck, Boxes } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductEditClientProps {
  id: string;
}

export function ProductEditClient({ id }: ProductEditClientProps) {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stock, setStock] = useState("");
  const [reorderPoint, setReorderPoint] = useState("");
  const [supplier, setSupplier] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getProductById(id);
        if (res) {
          const found = res.product;
          setProduct(found);
          setName(found.name);
          setSku(found.sku);
          setCategory(found.category);
          setPrice(found.price.toString());
          setCostPrice(found.costPrice ? found.costPrice.toString() : "");
          setStock(found.stock.toString());
          setReorderPoint(found.reorderPoint.toString());
          setSupplier(found.supplier);
          setLocation(found.location);
          setDescription(found.description || "");
        }
      } catch (e) {
        console.error("Failed to load product details for editing", e);
      }
      setIsLoaded(true);
    }
    loadData();
  }, [id]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F6F2] text-gray-500">
        Loading product data...
      </div>
    );
  }

  if (!product) {
    return (
      <main className="h-full overflow-y-auto px-6 py-12 text-center">
            <div className="max-w-md mx-auto rounded-xl bg-white p-8 border border-black/10 shadow-xs">
              <Boxes size={48} className="mx-auto text-gray-300 mb-3" />
              <h2 className="text-xl font-bold text-[#1A1D1D]">Product Not Found</h2>
              <p className="text-sm text-gray-500 mt-2">
                Unable to find product with ID <code className="bg-gray-100 px-1 py-0.5 rounded">{id}</code> to edit.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 bg-[#0F3D3E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2E7D75] transition-colors"
              >
                <ArrowLeft size={16} />
                Return to Products List
              </Link>
            </div>
      </main>
    );
  }

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

    try {
      await updateProduct(id, {
        name: name.trim(),
        sku: sku.trim().toUpperCase(),
        category: category.trim(),
        price: priceNum,
        costPrice: costPrice ? parseFloat(costPrice) : undefined,
        stock: parseInt(stock) || 0,
        reorderPoint: parseInt(reorderPoint) || 10,
        supplier: supplier.trim() || "Unspecified Supplier",
        location: location.trim() || "General Storage",
        description: description.trim(),
      });
      router.push(`/products/${id}`);
    } catch (err) {
      console.error("Failed to update product", err);
      setErrorMsg("Database save failed. Please verify input fields and try again.");
    }
  };

  return (
    <main className="h-full overflow-y-auto px-6 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/products/${id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B63] hover:text-[#0F3D3E] transition-colors mb-1"
              >
                <ArrowLeft size={16} />
                Cancel & Return to Details
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">
                Edit Product: <span className="text-[#0F3D3E]">{product.name}</span>
              </h1>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
            {/* Basic Info */}
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] pb-3 border-b border-gray-100">
                <Package size={18} className="text-[#0F3D3E]" />
                Product Identification & Category
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    SKU Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#1A1D1D] pb-3 border-b border-gray-100">
                <DollarSign size={18} className="text-[#0F3D3E]" />
                Pricing & Inventory Thresholds
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Current Stock <span className="text-rose-500">*</span>
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
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                    Warehouse Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D1D] mb-1">
                  Description & Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none bg-[#F7F6F2]/30"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                href={`/products/${id}`}
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
                Save Changes
              </button>
            </div>
          </form>
    </main>
  );
}
