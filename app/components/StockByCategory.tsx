"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CategoryStock } from "../lib/dashboard-data";
import { PIE_COLORS } from "../lib/dashboard-data";

type StockByCategoryChartProps = {
  data: CategoryStock[];
  colors?: string[];
};

export function StockByCategoryChart({ data, colors }: StockByCategoryChartProps) {
  const palette = colors || PIE_COLORS;
  return (
    <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
      <h2 className="text-sm font-semibold mb-2">Stock by Category</h2>
      <div className="flex items-center gap-4">
        <div className="h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="text-xs space-y-1.5">
          {data.map((c, i) => (
            <li key={c.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: palette[i % palette.length] }}
              />
              <span className="text-[#4A4A44]">{c.name}</span>
              <span className="ml-auto font-mono text-[#6B6B63]">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}