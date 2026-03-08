"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Music2,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Produk Trending",
    href: "/products",
    icon: TrendingUp,
  },
  {
    label: "Laporan Harian",
    href: "#",
    icon: FileText,
    disabled: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#1e1e2e] border border-[#2a2a3e] text-zinc-300"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-[#0f0f1a] border-r border-[#1e1e2e] z-40",
          "flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Music2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">TikTok Fashion</h1>
              <p className="text-[11px] text-zinc-500">Trend Tracker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 text-white border border-[#667eea]/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#1e1e2e]",
                  item.disabled && "opacity-40 cursor-not-allowed"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.disabled && (
                  <span className="ml-auto text-[10px] bg-zinc-700/50 px-2 py-0.5 rounded-full">
                    Segera
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#1e1e2e]">
          <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20">
            <p className="text-[11px] text-zinc-400">Diperbarui</p>
            <p className="text-xs font-medium text-zinc-300">
              09 Mar 2026, 07:00 WIB
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
