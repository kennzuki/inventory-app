"use client";

import { useMemo, useState } from "react";
import { Plus, PackageCheck, AlertTriangle, Boxes, DollarSign, ArrowUpDown } from "lucide-react";
import Link from "next/link";

type CategoryRow = {
  id: number;
  name: string;
  products: number;
  stock: number;
  revenue: number;
  status: "Healthy" | "Low";
};

const initialCategories: CategoryRow[] = [
  { id: 1, name: "Electronics", products: 48, stock: 128, revenue: 18250, status: "Healthy" },
  { id: 2, name: "Home Goods", products: 31, stock: 74, revenue: 9830, status: "Healthy" },
  { id: 3, name: "Office Supplies", products: 19, stock: 42, revenue: 6210, status: "Low" },
  { id: 4, name: "Apparel", products: 27, stock: 56, revenue: 11490, status: "Healthy" },
  { id: 5, name: "Accessories", products: 12, stock: 18, revenue: 4320, status: "Low" },
];

export default function CategoriesPage() {
  const [sortKey, setSortKey] = useState<keyof CategoryRow>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedCategories = useMemo(() => {
    const sorted = [...initialCategories].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB);
      }

      return (valueA as number) - (valueB as number);
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [sortKey, sortDirection]);

  const handleSort = (key: keyof CategoryRow) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const totalCategories = initialCategories.length;
  const totalProducts = initialCategories.reduce((sum, category) => sum + category.products, 0);
  const largestCategory = [...initialCategories].sort((a, b) => b.products - a.products)[0]?.name ?? "—";
  const lowStockCategories = initialCategories.filter((category) => category.status === "Low").length;

  return (
    <main className="h-full overflow-y-auto px-6 py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">Categories</h1>
              <p className="text-sm text-[#6B6B63] mt-0.5">
                Manage, filter, and monitor stock levels across your entire catalog.
              </p>
            </div>
            <Link
              href="/categories/new"
              className="inline-flex items-center justify-center gap-2 bg-[#0F3D3E] hover:bg-[#2E7D75] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition-colors"
            >
              <Plus size={18} />
              Add Category
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-teal-50 text-[#0F3D3E] flex items-center justify-center">
                <Boxes size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Total categories</span>
                <span className="text-xl font-bold text-[#1A1D1D]">{totalCategories}</span>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <PackageCheck size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Products</span>
                <span className="text-xl font-bold text-[#1A1D1D]">{totalProducts}</span>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Largest category</span>
                <span className="text-xl font-bold text-amber-700">{largestCategory}</span>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
              <div className="h-11 w-11 rounded-lg bg-amber-50 text-[#F0A202] flex items-center justify-center">
                <DollarSign size={22} />
              </div>
              <div>
                <span className="text-xs text-[#6B6B63] font-medium block">Low stock categories</span>
                <span className="text-xl font-bold text-[#0F3D3E]">{lowStockCategories}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-xs">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[#F7F6F2] border-b border-black/10 text-xs font-semibold text-[#6B6B63]">
                <tr>
                  <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1.5">
                      Category
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("products")}>
                    <div className="flex items-center gap-1.5">
                      Products
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("stock")}>
                    <div className="flex items-center gap-1.5">
                      Stock
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("revenue")}>
                    <div className="flex items-center gap-1.5">
                      Revenue
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1.5">
                      Status
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-[#1A1D1D]">
                {sortedCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#F7F6F2]/70">
                    <td className="py-3.5 px-4 font-semibold">{category.name}</td>
                    <td className="py-3.5 px-4">{category.products}</td>
                    <td className="py-3.5 px-4">{category.stock}</td>
                    <td className="py-3.5 px-4">${category.revenue.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          category.status === "Healthy"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </main>
  );
}
