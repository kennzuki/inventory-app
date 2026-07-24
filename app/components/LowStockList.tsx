import { AlertTriangle } from "lucide-react";
import type { LowStockItem } from "../lib/dashboard-data";

type LowStockListProps = {
    items: LowStockItem[];
};

export function LowStockList({ items }: LowStockListProps) {
    const maxStock = Math.max(...items.map((i) => i.reorder));

    return (
        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">Low Stock Products</h2>
                <span className="text-xs font-medium text-[#B4790A] flex items-center gap-1">
                    <AlertTriangle size={13} /> {items.length} need reorder
                </span>
            </div>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.sku}>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="font-mono text-xs text-[#6B6B63]">
                                {item.remaining}/{item.reorder}
                            </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-black/5 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[#F0A202]"
                                style={{ width: `${(item.remaining / maxStock) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}