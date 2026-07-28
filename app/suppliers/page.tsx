import Link from "next/link";
import { Plus } from "lucide-react";
import { getSuppliers } from "../lib/supplier-actions";
import SuppliersTable from "../components/SuppliersTable";
import SuppliersCards from "../components/SuppliersCards";

export default async function suppliersPage() {
    const suppliers = await getSuppliers();

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
            <SuppliersCards />



            {/* suppliers table */}
            <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-xs">
                <SuppliersTable />

            </div>

        </main>
    );
}