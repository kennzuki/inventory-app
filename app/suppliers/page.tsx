import Link from "next/link";
import { Plus, Boxes, PackageCheck, AlertTriangle, DollarSign, ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";

const suppliers = [
    {
        id: "1",
        name: "Supplier 1",
        productsSupplied: "2",
        purchaseOrders: "3",
        totalPurchased: "4",
        lastPurchase: "5",
    },
    {
        id: "2",
        name: "Supplier 2",
        productsSupplied: "2",
        purchaseOrders: "3",
        totalPurchased: "4",
        lastPurchase: "5",
    },
    {
        id: "3",
        name: "Supplier 3",
        productsSupplied: "2",
        purchaseOrders: "3",
        totalPurchased: "4",
        lastPurchase: "5",
    },
    {
        id: "4",
        name: "Supplier 4",
        productsSupplied: "2",
        purchaseOrders: "3",
        totalPurchased: "4",
        lastPurchase: "5",
    },
    {
        id: "5",
        name: "Supplier 5",
        productsSupplied: "2",
        purchaseOrders: "3",
        totalPurchased: "4",
        lastPurchase: "5",
    },
];

export default function suppliersPage() {
    return (
        <main className="h-full overflow-y-auto px-6 py-6 space-y-6">
            {/* Header & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">
                        Suppliers Management
                    </h1>
                    <p className="text-sm text-[#6B6B63] mt-0.5">
                        Manage, filter, and monitor suppliers information.
                    </p>
                </div>
                <Link
                    href="/suppliers/new"
                    className="inline-flex items-center justify-center gap-2 bg-[#0F3D3E] hover:bg-[#2E7D75] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition-colors"
                >
                    <Plus size={18} />
                    Add Supplier

                </Link>
            </div>

            {/* suppliers cards */}


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
                    <div className="h-11 w-11 rounded-lg bg-teal-50 text-[#0F3D3E] flex items-center justify-center">
                        <Boxes size={22} />
                    </div>
                    <div>
                        <span className="text-xs text-[#6B6B63] font-medium block">Total suppliers</span>
                        <span className="text-xl font-bold text-[#1A1D1D]">9</span>
                    </div>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
                    <div className="h-11 w-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <PackageCheck size={22} />
                    </div>
                    <div>
                        <span className="text-xs text-[#6B6B63] font-medium block">active suppliers</span>
                        <span className="text-xl font-bold text-[#1A1D1D]">5</span>
                    </div>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
                    <div className="h-11 w-11 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                        <AlertTriangle size={22} />
                    </div>
                    <div>
                        <span className="text-xs text-[#6B6B63] font-medium block">inactive suppliers</span>
                        <span className="text-xl font-bold text-amber-700">4</span>
                    </div>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
                    <div className="h-11 w-11 rounded-lg bg-amber-50 text-[#F0A202] flex items-center justify-center">
                        <DollarSign size={22} />
                    </div>
                    <div>
                        <span className="text-xs text-[#6B6B63] font-medium block">total purchases</span>
                        <span className="text-xl font-bold text-[#0F3D3E]">
                            $56789
                        </span>
                    </div>
                </div>
            </div>

            {/* suppliers table */}
            <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-xs">
                <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-[#F7F6F2] border-b border-black/10 text-xs font-semibold text-[#6B6B63]">
                        <tr>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Supplier Name
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Products Supplied
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Purchase Orders
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Total Purchased
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Last Purchase
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 text-[#1A1D1D]">
                        {suppliers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-8 px-4 text-center text-[#6B6B63]">
                                    No suppliers yet.
                                </td>
                            </tr>
                        ) : (
                            suppliers.map((supplier) => (
                                <tr key={supplier.id} className="hover:bg-[#F7F6F2]/70">
                                    <td className="py-3.5 px-4 font-semibold">{supplier.name}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.productsSupplied}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.purchaseOrders}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.totalPurchased}</td>
                                    <td className="py-3.5 px-4 text-[#6B6B63]">{supplier.lastPurchase}</td>
                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/suppliers/${supplier.id}`}
                                                className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-[#4A4A44] hover:border-[#0F3D3E] hover:text-[#0F3D3E] transition-colors"
                                            >
                                                <Eye size={13} />
                                                View
                                            </Link>
                                            <Link
                                                href={`/suppliers/${supplier.id}/edit`}
                                                className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-[#4A4A44] hover:border-[#0F3D3E] hover:text-[#0F3D3E] transition-colors"
                                            >
                                                <Pencil size={13} />
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-[#4A4A44] hover:border-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={13} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

</div>

        </main>
    );
}