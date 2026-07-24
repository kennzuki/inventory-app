"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { SalesPoint } from "../lib/dashboard-data";

type SalesTrendChartProps = {
    data: SalesPoint[];
};

export function SalesTrendChart({ data }: SalesTrendChartProps) {
    return (
        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">Sales Trend</h2>
                <span className="text-xs text-[#6B6B63]">Last 7 days</span>
            </div>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0F3D3E" stopOpacity={0.25} />
                                <stop offset="100%" stopColor="#0F3D3E" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12, fill: "#6B6B63" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#6B6B63" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(v: number) => [`$${v.toLocaleString()}`, "Sales"]}
                            contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#e5e5e0" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#0F3D3E"
                            strokeWidth={2}
                            fill="url(#salesFill)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}