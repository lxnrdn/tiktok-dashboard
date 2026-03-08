"use client";

import { Package, Award, Percent, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  totalProducts: number;
  tier1Count: number;
  avgCommission: number;
  potentialEarnings: string;
}

const cards = [
  {
    key: "total",
    label: "Total Produk Dianalisis",
    icon: Package,
    gradient: "from-[#667eea] to-[#764ba2]",
    valueKey: "totalProducts" as const,
    suffix: " produk",
  },
  {
    key: "tier1",
    label: "Produk TIER 1",
    icon: Award,
    gradient: "from-[#43e97b] to-[#38f9d7]",
    valueKey: "tier1Count" as const,
    suffix: " produk",
  },
  {
    key: "commission",
    label: "Rata-rata Komisi",
    icon: Percent,
    gradient: "from-[#4facfe] to-[#00f2fe]",
    valueKey: "avgCommission" as const,
    suffix: "%",
  },
  {
    key: "earnings",
    label: "Potensi Earnings",
    icon: DollarSign,
    gradient: "from-[#fa709a] to-[#fee140]",
    valueKey: "potentialEarnings" as const,
    suffix: "",
  },
];

export default function StatsCards({
  totalProducts,
  tier1Count,
  avgCommission,
  potentialEarnings,
}: StatsCardsProps) {
  const values = { totalProducts, tier1Count, avgCommission, potentialEarnings };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const val = values[card.valueKey];
        const displayValue =
          card.valueKey === "potentialEarnings"
            ? val
            : `${val}${card.suffix}`;

        return (
          <div
            key={card.key}
            className="relative overflow-hidden rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-5 transition-all duration-300 hover:border-[#3a3a5e] group"
          >
            {/* Gradient accent */}
            <div
              className={cn(
                "absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity",
                `bg-gradient-to-br ${card.gradient}`
              )}
            />

            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                  `bg-gradient-to-br ${card.gradient}`
                )}
              >
                <card.icon size={18} className="text-white" />
              </div>
              <p className="text-xs text-zinc-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-white">{displayValue}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
