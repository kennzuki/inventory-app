import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, ArrowLeft, AlertTriangle } from "lucide-react";
import { getCategory } from "@/app/lib/categories-actions";

type CategoryPageProps = {
    params: Promise<{ id: string }>;
};

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
    const { id } = await params;
    const category = await getCategory(id);

    if (!category) {
        notFound();
    }

    const totalStock = category.products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockProducts = category.products.filter(
        (p) => p.stock <= p.reorderPoint
    );

    return (
        <div className="space-y-6 px-8">
            <div>
                <Link
                    href="/categories"
                    className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-[#0F3D3E] mb-8 text-xl"
                >
                    <ArrowLeft size={13} />
                    Back to categories
                </Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1D]">
                            {category.name}
                        </h1>
                        <p className="text-sm text-[#6B6B63] mt-0.5">
                            {category._count.products} product
                            {category._count.products === 1 ? "" : "s"} in this category
                        </p>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-black/10 bg-white p-4">
                    <span className="text-xs text-[#6B6B63] font-medium block">Total products</span>
                    <span className="text-xl font-bold text-[#1A1D1D] font-mono">
                        {category._count.products}
                    </span>
                </div>
                <div className="rounded-xl border border-black/10 bg-white p-4">
                    <span className="text-xs text-[#6B6B63] font-medium block">Total stock</span>
                    <span className="text-xl font-bold text-[#1A1D1D] font-mono">{totalStock}</span>
                </div>
                <div className="rounded-xl border border-black/10 bg-white p-4">
                    <span className="text-xs text-[#6B6B63] font-medium block">Low stock items</span>
                    <span
                        className={`text-xl font-bold font-mono ${lowStockProducts.length > 0 ? "text-[#B4790A]" : "text-[#1A1D1D]"
                            }`}
                    >
                        {lowStockProducts.length}
                    </span>
                </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white overflow-hidden">
                <div className="px-5 py-4 border-b border-black/10">
                    <h2 className="text-sm font-semibold">Products</h2>
                </div>

                {category.products.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-[#6B6B63]">
                        No products in this category yet.
                    </p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F7F6F2] border-b border-black/10 text-xs font-semibold text-[#6B6B63]">
                            <tr>
                                <th className="py-3 px-5 font-medium">Product</th>
                                <th className="py-3 px-5 font-medium">SKU</th>
                                <th className="py-3 px-5 font-medium text-right">Stock</th>
                                <th className="py-3 px-5 font-medium text-right">Reorder point</th>
                                <th className="py-3 px-5 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {category.products.map((p) => {
                                const isLow = p.stock <= p.reorderPoint;
                                return (
                                    <tr key={p.id} className="hover:bg-[#F7F6F2]/70">
                                        <td className="py-3 px-5">
                                            <Link
                                                href={`/products/${p.id}`}
                                                className="font-medium hover:text-[#0F3D3E] hover:underline"
                                            >
                                                {p.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-5 font-mono text-xs text-[#6B6B63]">{p.sku}</td>
                                        <td className="py-3 px-5 text-right font-mono">{p.stock}</td>
                                        <td className="py-3 px-5 text-right font-mono text-[#6B6B63]">
                                            {p.reorderPoint}
                                        </td>
                                        <td className="py-3 px-5 text-right">
                                            {isLow && (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#B4790A]">
                                                    <AlertTriangle size={12} />
                                                    Low
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}