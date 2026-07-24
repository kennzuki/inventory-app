"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-3">
      <div className="flex items-center gap-2 text-sm text-[#6B6B63]">
        <Search size={16} />
        <span className="hidden sm:inline">Search products, orders, customers…</span>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative text-[#1A1D1D]">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#F0A202]" />
        </button>
        <button className="flex items-center gap-1.5 text-sm font-medium">
          <div className="h-7 w-7 rounded-full bg-[#0F3D3E] text-white flex items-center justify-center text-xs font-mono">
            KJ
          </div>
          <span className="hidden sm:inline">Ken</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}