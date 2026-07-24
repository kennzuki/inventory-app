import type { Product } from "../lib/dashboard-data";

type TopProductsListProps = {
  products: Product[];
};

export function TopProductsList({ products }: TopProductsListProps) {
  return (
    <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
      <h2 className="text-sm font-semibold mb-3">Top Products</h2>
      <div className="space-y-3">
        {products.map((p, i) => (
          <div key={p.sku} className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#8FA3A1] w-4">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{p.name}</div>
              <div className="text-xs text-[#6B6B63] font-mono">{p.sku}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono font-semibold">{p.revenue}</div>
              <div className="text-xs text-[#6B6B63]">{p.units} units</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}