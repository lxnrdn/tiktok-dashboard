"use client";

import { TrendingUp, BarChart3 } from "lucide-react";
import reportData from "@/data/sample-report.json";
import { ReportData } from "@/lib/types";
import ProductTable from "@/components/ProductTable";

const data = reportData as ReportData;

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-zinc-200">
              Produk Trending
            </h1>
            <p className="text-xs text-zinc-500">
              {data.total_analyzed} produk dianalisis |{" "}
              {data.report_date}
            </p>
          </div>
        </div>
      </div>

      {/* Tier Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            tier: 1,
            count: data.tier1_count,
            label: "TIER 1",
            desc: "Sangat Direkomendasikan",
            color: "from-green-500/20 to-emerald-500/20",
            border: "border-green-500/30",
            text: "text-green-400",
          },
          {
            tier: 2,
            count: data.tier2_count,
            label: "TIER 2",
            desc: "Direkomendasikan",
            color: "from-blue-500/20 to-cyan-500/20",
            border: "border-blue-500/30",
            text: "text-blue-400",
          },
          {
            tier: 3,
            count: data.tier3_count,
            label: "TIER 3",
            desc: "Pertimbangkan",
            color: "from-yellow-500/20 to-amber-500/20",
            border: "border-yellow-500/30",
            text: "text-yellow-400",
          },
          {
            tier: 4,
            count: data.tier4_count,
            label: "TIER 4",
            desc: "Perlu Evaluasi",
            color: "from-gray-500/20 to-zinc-500/20",
            border: "border-gray-500/30",
            text: "text-gray-400",
          },
        ].map((t) => (
          <div
            key={t.tier}
            className={`rounded-xl bg-gradient-to-br ${t.color} border ${t.border} p-4`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold ${t.text} px-2 py-0.5 rounded-full bg-black/20`}
              >
                {t.label}
              </span>
              <BarChart3 size={14} className={t.text} />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{t.count}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <ProductTable products={data.products} />
    </div>
  );
}
