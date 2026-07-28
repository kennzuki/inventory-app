import Link from "next/link";
import { deleteSupplier, getSuppliers } from "../lib/supplier-actions";
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";

export default async function SuppliersTable() {
     const suppliers = await getSuppliers();
    return(
        <>
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
                                    Phone No.
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Email
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Contact
                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    IsActive                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Address                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    City                                    <ArrowUpDown size={13} className="text-slate-400" />
                                </div>
                            </th>
                            <th className="py-3.5 px-4 select-none">
                                <div className="flex items-center gap-1.5">
                                    Country                                    <ArrowUpDown size={13} className="text-slate-400" />
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
                                <tr key={supplier.id} className="hover:bg-[#F7F6F2]/70 text-center w-full p-4">
                                    <td className="py-3.5 px-4 font-semibold">{supplier.name}</td>
                                    <td className="py-2.5 px-3 font-mono">{supplier.products.length}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.phone}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.email}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.contact}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.isActive}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.address}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.city}</td>
                                    <td className="py-3.5 px-4 font-mono">{supplier.country}</td>
                                   
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
                                            <form action={deleteSupplier} className="inline">
                                                <input type="hidden" name="id" value={supplier.id} />
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-[#4A4A44] hover:border-red-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={13} />
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
        </>
    )
}