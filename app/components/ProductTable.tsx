"use client";

import { useState } from "react";
import { Product, getProductStatus } from "../lib/products-data";
import { Eye, Edit3, Trash2, ArrowUpDown, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";

interface ProductTableProps {
  products: Product[];
  onDelete?: (id: string) => void;
}

type SortField = "name" | "sku" | "category" | "price" | "stock";
type SortOrder = "asc" | "desc";

export function ProductTable({ products, onDelete }: ProductTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-black/10 bg-white shadow-xs">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-[#F7F6F2] border-b border-black/10 text-xs font-semibold text-[#6B6B63]">
          <tr>
            <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("name")}>
              <div className="flex items-center gap-1.5">
                Product Name
                <ArrowUpDown size={13} className="text-slate-400" />
              </div>
            </th>
            <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("sku")}>
              <div className="flex items-center gap-1.5">
                SKU
                <ArrowUpDown size={13} className="text-slate-400" />
              </div>
            </th>
            <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("category")}>
              <div className="flex items-center gap-1.5">
                Category
                <ArrowUpDown size={13} className="text-slate-400" />
              </div>
            </th>
            <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("price")}>
              <div className="flex items-center gap-1.5">
                Price
                <ArrowUpDown size={13} className="text-slate-400" />
              </div>
            </th>
            <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("stock")}>
              <div className="flex items-center gap-1.5">
                Stock
                <ArrowUpDown size={13} className="text-slate-400" />
              </div>
            </th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Supplier</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 text-[#1A1D1D]">
          {sortedProducts.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-sm text-[#6B6B63]">
                No products found. Try adjusting filters or create a new product.
              </td>
            </tr>
          ) : (
            sortedProducts.map((product) => {
              const status = getProductStatus(product);
              return (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/products/${product.id}`}
                      className="font-medium text-[#1A1D1D] hover:text-[#0F3D3E] transition-colors block max-w-[220px] truncate"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs text-gray-500 block truncate max-w-[220px]">
                      {product.location}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {product.sku}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-[#6B6B63]">
                    {product.category}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#0F3D3E]">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-xs text-[#1A1D1D]">
                      {product.stock} units
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Min: {product.reorderPoint}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {status === "IN_STOCK" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 size={12} />
                        In Stock
                      </span>
                    )}
                    {status === "LOW_STOCK" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <AlertTriangle size={12} />
                        Low Stock
                      </span>
                    )}
                    {status === "OUT_OF_STOCK" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <XCircle size={12} />
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#6B6B63] max-w-[150px] truncate">
                    {product.supplier}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/products/${product.id}`}
                        className="p-1.5 rounded-md text-slate-500 hover:text-[#0F3D3E] hover:bg-slate-100 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/products/${product.id}/edit`}
                        className="p-1.5 rounded-md text-slate-500 hover:text-[#0F3D3E] hover:bg-slate-100 transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 size={16} />
                      </Link>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(product.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
