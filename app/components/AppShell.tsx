"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { TopBar } from "./Topbar";

const HIDDEN_SHELL_ROUTES = ["/sign-in", "/sign-up"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldShowShell = !HIDDEN_SHELL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!shouldShowShell) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F7F6F2] text-[#1A1D1D] font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
