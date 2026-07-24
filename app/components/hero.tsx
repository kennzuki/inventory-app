'use client';
import React from 'react'
import {  Bell, Search, ChevronDown, AlertTriangle, } from 'lucide-react'
import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Topkpi from './Topkpi';
import { TopBar } from './Topbar';
import { SalesTrendChart } from './SalesTrendChart';




const SALES_TREND = [
    { day: "Mon", sales: 1400 },
    { day: "Tue", sales: 1980 },
    { day: "Wed", sales: 1720 },
    { day: "Thu", sales: 2260 },
    { day: "Fri", sales: 1890 },
    { day: "Sat", sales: 2430 },
    { day: "Sun", sales: 2010 },
];

const STOCK_BY_CATEGORY = [
    { name: "Electronics", value: 86 },
    { name: "Apparel", value: 54 },
    { name: "Home & Kitchen", value: 41 },
    { name: "Sporting Goods", value: 33 },
    { name: "Other", value: 36 },
];

const PIE_COLORS = ["#0F3D3E", "#2E7D75", "#6FB6AE", "#F0A202", "#C9C4B8"];

const TOP_PRODUCTS = [
    { name: "Wireless Mouse M2", sku: "SKU-1042", units: 312, revenue: "$4,680" },
    { name: "USB-C Hub 7-in-1", sku: "SKU-2210", units: 275, revenue: "$8,250" },
    { name: "Mechanical Keyboard", sku: "SKU-3081", units: 198, revenue: "$11,880" },
    { name: "Desk Lamp LED", sku: "SKU-1177", units: 164, revenue: "$3,280" },
];

const RECENT_ACTIVITY = [
    { text: "Order #4821 marked as shipped", time: "12 min ago" },
    { text: "Supplier Acme Co. restocked SKU-1042", time: "48 min ago" },
    { text: "New customer Grace Wanjiru registered", time: "1 hr ago" },
    { text: "Order #4819 payment confirmed", time: "2 hr ago" },
];

const LOW_STOCK = [
    { name: "Bluetooth Speaker Mini", sku: "SKU-4402", remaining: 3, reorder: 20 },
    { name: "Office Chair — Mesh Back", sku: "SKU-5510", remaining: 5, reorder: 15 },
    { name: "HDMI Cable 2m", sku: "SKU-1290", remaining: 6, reorder: 30 },
    { name: "Standing Desk Frame", sku: "SKU-6003", remaining: 2, reorder: 10 },
];

const hero = () => {
    const maxStock = useMemo(
        () => Math.max(...LOW_STOCK.map((i) => i.reorder)),
        []
    );
    return (
        <>
            {/* Main column */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top bar */}
                <TopBar/>

                {/* Scrollable body */}
                <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-[#6B6B63]">Overview of stock, sales, and activity.</p>
                    </div>
                    {/* KPIS */}
                    <Topkpi />

                    {/* Sales trend */}
                   <SalesTrendChart data={SALES_TREND}/>

                    {/* Pie + Top products */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
                            <h2 className="text-sm font-semibold mb-2">Stock by Category</h2>
                            <div className="flex items-center gap-4">
                                <div className="h-44 w-44 shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={STOCK_BY_CATEGORY}
                                                dataKey="value"
                                                nameKey="name"
                                                innerRadius={40}
                                                outerRadius={70}
                                                paddingAngle={2}
                                            >
                                                {STOCK_BY_CATEGORY.map((_, i) => (
                                                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <ul className="text-xs space-y-1.5">
                                    {STOCK_BY_CATEGORY.map((c, i) => (
                                        <li key={c.name} className="flex items-center gap-2">
                                            <span
                                                className="h-2.5 w-2.5 rounded-sm shrink-0"
                                                style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                                            />
                                            <span className="text-[#4A4A44]">{c.name}</span>
                                            <span className="ml-auto font-mono text-[#6B6B63]">{c.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
                            <h2 className="text-sm font-semibold mb-3">Top Products</h2>
                            <div className="space-y-3">
                                {TOP_PRODUCTS.map((p, i) => (
                                    <div key={p.sku} className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-[#8FA3A1] w-4">
                                            {i + 1}
                                        </span>
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
                    </div>

                    {/* Activity + low stock */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
                            <h2 className="text-sm font-semibold mb-3">Recent Activity</h2>
                            <ul className="space-y-3">
                                {RECENT_ACTIVITY.map((a, i) => (
                                    <li key={i} className="flex gap-3 text-sm">
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2E7D75] shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-[#1A1D1D]">{a.text}</p>
                                            <p className="text-xs text-[#6B6B63]">{a.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold">Low Stock Products</h2>
                                <span className="text-xs font-medium text-[#B4790A] flex items-center gap-1">
                                    <AlertTriangle size={13} /> {LOW_STOCK.length} need reorder
                                </span>
                            </div>
                            <div className="space-y-3">
                                {LOW_STOCK.map((item) => (
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
                                                style={{
                                                    width: `${(item.remaining / maxStock) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default hero