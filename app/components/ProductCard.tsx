"use client";

import { Product, getProductStatus } from "../lib/products-data";
import { Eye, Edit3, Trash2, AlertTriangle, CheckCircle2, XCircle, MapPin, Tag } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
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

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-black/10 bg-white p-5 shadow-xs transition-all hover:border-[#0F3D3E]/30 hover:shadow-md">
      <div>
        {/* Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B63] bg-[#F7F6F2] px-2.5 py-1 rounded-md border border-black/5">
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

        {/* Title & SKU */}
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-[#1A1D1D] text-base group-hover:text-[#0F3D3E] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center justify-between text-xs text-[#6B6B63]">
          <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
            {product.sku}
          </span>
          <span className="flex items-center gap-1 text-slate-500 truncate max-w-[140px]" title={product.location}>
            <MapPin size={12} />
            {product.location}
          </span>
        </div>

        <p className="mt-3 text-xs text-[#6B6B63] line-clamp-2 leading-relaxed h-8">
          {product.description || "No description provided."}
        </p>

        {/* Price & Stock Stats */}
        <div className="mt-4 pt-3 border-t border-black/5 grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-[#6B6B63] block">Price</span>
            <span className="text-lg font-bold text-[#0F3D3E]">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#6B6B63] block">In Stock</span>
            <span
              className={`text-lg font-bold ${
                status === "OUT_OF_STOCK"
                  ? "text-rose-600"
                  : status === "LOW_STOCK"
                  ? "text-amber-600"
                  : "text-[#1A1D1D]"
              }`}
            >
              {product.stock}{" "}
              <span className="text-xs font-normal text-gray-500">units</span>
            </span>
          </div>
        </div>

        {/* Progress Bar for Low Stock Alert */}
        <div className="mt-2">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                status === "OUT_OF_STOCK"
                  ? "bg-rose-500 w-0"
                  : status === "LOW_STOCK"
                  ? "bg-amber-500"
                  : "bg-[#0F3D3E]"
              }`}
              style={{
                width: status === "OUT_OF_STOCK" ? "0%" : `${Math.min(100, (product.stock / (product.reorderPoint * 3)) * 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
            <span>Reorder at: {product.reorderPoint}</span>
            <span>Supplier: {product.supplier}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between">
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F3D3E] hover:text-[#2E7D75] transition-colors"
        >
          <Eye size={14} />
          View Details
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href={`/products/${product.id}/edit`}
            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0F3D3E] hover:bg-slate-100 transition-colors"
            title="Edit Product"
          >
            <Edit3 size={15} />
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete Product"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
