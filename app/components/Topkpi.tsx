import { ArrowUpRight, AlertTriangle, ArrowDownRight } from "lucide-react";


const KPIS = [
    { label: "Total Products", value: "250", delta: "+4.2%", up: true },
    { label: "Inventory Value", value: "$45,300", delta: "+1.8%", up: true },
    { label: "Low Stock", value: "8", delta: "+3", up: false, warn: true },
    { label: "Sales (30d)", value: "$12,000", delta: "-2.1%", up: false },
];

export default function Topkpi() {
    return (


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPIS.map((kpi) => (
                <div
                    key={kpi.label}
                    className="rounded-lg border border-black/10 bg-white px-5 py-4"
                >
                    <div className="text-xs text-[#6B6B63]">{kpi.label}</div>
                    <div className="mt-1.5 flex items-end justify-between">
                        <span className="font-mono text-2xl font-semibold tabular-nums">
                            {kpi.value}
                        </span>
                        <span
                            className={`flex items-center gap-0.5 text-xs font-medium ${kpi.warn
                                    ? "text-[#B4790A]"
                                    : kpi.up
                                        ? "text-[#2E7D75]"
                                        : "text-[#B4790A]"
                                }`}
                        >
                            {kpi.warn ? (
                                <AlertTriangle size={13} />
                            ) : kpi.up ? (
                                <ArrowUpRight size={13} />
                            ) : (
                                <ArrowDownRight size={13} />
                            )}
                            {kpi.delta}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}