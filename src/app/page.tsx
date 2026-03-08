"use client";

import { CalendarDays, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import reportData from "@/data/sample-report.json";
import { ReportData, Product } from "@/lib/types";
import {
  cn,
  formatRupiah,
  getScoreColor,
  getScoreBarColor,
  getTierColor,
  getTierLabel,
} from "@/lib/utils";
import StatsCards from "@/components/StatsCards";
import CategoryChart from "@/components/CategoryChart";
import TrendChart from "@/components/TrendChart";
import ViralBadge from "@/components/ViralBadge";

const data = reportData as ReportData;

export default function DashboardPage() {
  const top5 = [...data.products]
    .sort((a, b) => b.affiliate_score - a.affiliate_score)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="gradient-text">TikTok Fashion</span>{" "}
            <span className="text-zinc-300">Trend Tracker</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Analisis produk trending TikTok Shop Indonesia untuk affiliator
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1e2e] border border-[#2a2a3e] text-sm">
          <CalendarDays size={16} className="text-[#667eea]" />
          <span className="text-zinc-400">
            {data.report_date} | {data.report_time}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalProducts={data.total_analyzed}
        tier1Count={data.tier1_count}
        avgCommission={data.avg_commission}
        potentialEarnings={data.potential_earnings}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart categories={data.categories} />
        <TrendChart data={data.daily_trends} />
      </div>

      {/* Top 5 Trending Products */}
      <div className="rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-[#667eea]" />
            <h3 className="text-sm font-semibold text-zinc-300">
              Top 5 Produk Trending
            </h3>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs text-[#667eea] hover:text-[#764ba2] transition-colors"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {top5.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#252538] transition-colors group"
            >
              {/* Rank */}
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                  index === 0
                    ? "bg-gradient-to-br from-yellow-500 to-amber-600 text-white"
                    : index === 1
                    ? "bg-gradient-to-br from-zinc-300 to-zinc-400 text-zinc-800"
                    : index === 2
                    ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                    : "bg-[#2a2a3e] text-zinc-400"
                )}
              >
                {index + 1}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-500">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-xs text-zinc-600">|</span>
                  <span className="text-xs text-emerald-400">
                    {product.commission_rate}% komisi
                  </span>
                  {product.viral_flags.map((flag) => (
                    <ViralBadge key={flag} flag={flag} size="sm" />
                  ))}
                </div>
              </div>

              {/* Score Bar */}
              <div className="w-32 hidden sm:block">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-500">Skor</span>
                  <span
                    className={cn(
                      "font-bold",
                      getScoreColor(product.affiliate_score)
                    )}
                  >
                    {product.affiliate_score}
                  </span>
                </div>
                <div className="h-1.5 bg-[#2a2a3e] rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700",
                      getScoreBarColor(product.affiliate_score)
                    )}
                    style={{ width: `${product.affiliate_score}%` }}
                  />
                </div>
              </div>

              {/* Tier Badge */}
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0",
                  getTierColor(product.tier)
                )}
              >
                {getTierLabel(product.tier)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
