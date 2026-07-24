"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Truck,
  Users,
  ShoppingCart,
  Warehouse,
  BarChart3,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Categories", icon: FolderTree },
  { label: "Suppliers", icon: Truck },
  { label: "Customers", icon: Users },
  { label: "Orders", icon: ShoppingCart },
  { label: "Inventory", icon: Warehouse },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-[#0F3D3E] text-[#EDEBE3]">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="h-7 w-7 rounded bg-[#F0A202] flex items-center justify-center text-[#0F3D3E] font-bold text-sm">
            IM
          </div>
          <span className="font-semibold tracking-tight">KENKI Inventory</span>
        </div>
 
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-[#F0A202]"
                    : "text-[#B9C4C3] border-l-2 border-transparent hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </button>
            );
          })}
        </nav>
 
        <div className="px-5 py-4 border-t border-white/10 text-xs text-[#8FA3A1]">
          v1.0 · Warehouse build
        </div>
      </aside>
      
      
    
  );
}