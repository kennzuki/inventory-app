import { getSuppliers } from "../lib/supplier-actions";
import { Boxes, PackageCheck, AlertTriangle, DollarSign } from "lucide-react";

export default async function SuppliersCards() {
    const suppliers = await getSuppliers();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-black/10 bg-white p-4 flex items-center gap-4 shadow-xs">
                    <div className="h-11 w-11 rounded-lg bg-teal-50 text-[#0F3D3E] flex items-center justify-center">
                        <Boxes size={22} />
                    </div>
                    <div>
                        <span className="text-xs text-[#6B6B63] font-medium block">Total suppliers</span>
                        <span className="text-xl font-bold text-[#1A1D1D]">{suppliers.length}</span>
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
    )
}   