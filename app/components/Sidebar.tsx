"use client";

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
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Categories", href: "/categories", icon: FolderTree },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Inventory", href: "/inventory", icon: Warehouse },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-[#0F3D3E] text-[#EDEBE3]">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="h-7 w-7 rounded bg-[#F0A202] flex items-center justify-center text-[#0F3D3E] font-bold text-sm">
          IM
        </div>
        <span className="font-semibold tracking-tight">KENKI Inventory</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {NAV_ITEMS.map(({ name, href, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-white border-l-2 border-[#F0A202]"
                  : "text-[#B9C4C3] border-l-2 border-transparent hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} strokeWidth={1.8} />
              {name}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 text-xs text-[#8FA3A1]">
        v1.0 · Warehouse build
      </div>
    </aside>
  );
}