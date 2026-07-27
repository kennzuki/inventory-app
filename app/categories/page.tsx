


import { Plus, PackageCheck, AlertTriangle, Boxes, DollarSign, ArrowUpDown,Trophy } from "lucide-react";
import Link from "next/link";
import { getAllCategories,getLargestCategory,getLowStockProductsByCategory } from "../lib/categories-actions";

type CategoryRow = {
  id: number;
  name: string;
  products: number;
  stock: number;
  revenue: number;
  status: "Healthy" | "Low";
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const totalCategories = categories.length
  const totalProducts = categories.reduce((sum, c) => sum + c._count.products, 0);
  const largest = await getLargestCategory();
  const lowStock = await getLowStockProductsByCategory();


  return (
    <main className="h-full overflow-y-auto px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">Categories</h1>
          <p className="text-sm text-[#6B6B63] mt-0.5">
            Manage, filter, and monitor stock levels across your entire catalog.
          </p>
        </div>
        {/* add category */}
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
            <Trophy size={22} />
          </div>
          <div>
            <span className="text-xs text-[#6B6B63] font-medium block">Largest category</span>
            <span className="text-xl font-bold text-amber-700">{largest?.name || "N/A"}</span>
          </div>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
          <div className="h-11 w-11 rounded-lg bg-amber-50 text-[#F0A202] flex items-center justify-center">
            <AlertTriangle size={22} />
          </div>
          <div>
            <span className="text-xs text-[#6B6B63] font-medium block">Low stock categories</span>
            <span className="text-xl font-bold text-[#0F3D3E]">{lowStock.length}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-xs">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-[#F7F6F2] border-b border-black/10 text-xs font-semibold text-[#6B6B63]">
            <tr>
              <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" >
                <div className="flex items-center gap-1.5">
                  Category
                  <ArrowUpDown size={13} className="text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" >
                <div className="flex items-center gap-1.5">
                  Products
                  <ArrowUpDown size={13} className="text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" >
                <div className="flex items-center gap-1.5">
                  Stock
                  <ArrowUpDown size={13} className="text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" >
                <div className="flex items-center gap-1.5">
                  Revenue
                  <ArrowUpDown size={13} className="text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer select-none hover:text-[#0F3D3E]" >
                <div className="flex items-center gap-1.5">
                  Status
                  <ArrowUpDown size={13} className="text-slate-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 text-[#1A1D1D]">
            {/* {newCatgories.map((category) => (
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
                ))} */}
          </tbody>
        </table>
      </div>
    </main>
  );
}
