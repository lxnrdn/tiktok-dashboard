"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Users,
  ShoppingBag,
  Percent,
  MessageCircle,
  Clock,
  Video,
  Hash,
  ExternalLink,
  Sparkles,
  Tag,
} from "lucide-react";
import reportData from "@/data/sample-report.json";
import { ReportData } from "@/lib/types";
import {
  cn,
  formatRupiah,
  formatNumber,
  getTierColor,
  getTierLabel,
  getScoreColor,
  getCategoryLabel,
} from "@/lib/utils";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import ViralBadge from "@/components/ViralBadge";

const data = reportData as ReportData;

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = data.products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1e1e2e] flex items-center justify-center mb-4">
          <ShoppingBag size={28} className="text-zinc-600" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-300">
          Produk tidak ditemukan
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          ID produk &quot;{productId}&quot; tidak ada dalam data
        </p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#667eea]/20 text-[#667eea] text-sm hover:bg-[#667eea]/30 transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  const totalScore = Object.values(product.score_breakdown).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali ke Daftar Produk
      </Link>

      {/* Product Header */}
      <div className="rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Placeholder */}
          <div className="w-full md:w-48 h-48 rounded-xl bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border border-[#2a2a3e] flex items-center justify-center shrink-0">
            <div className="text-center">
              <ShoppingBag size={40} className="text-[#667eea]/40 mx-auto" />
              <p className="text-[10px] text-zinc-600 mt-2">Product Image</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {product.name}
              </h1>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold border",
                  getTierColor(product.tier)
                )}
              >
                {getTierLabel(product.tier)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs text-zinc-500 bg-[#2a2a3e] px-2.5 py-1 rounded-lg">
                {getCategoryLabel(product.category)}
              </span>
              {product.viral_flags.map((flag) => (
                <ViralBadge key={flag} flag={flag} size="md" />
              ))}
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-white">
                {formatRupiah(product.price)}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">Affiliate Score:</span>
                <span
                  className={cn(
                    "text-3xl font-black",
                    getScoreColor(product.affiliate_score)
                  )}
                >
                  {product.affiliate_score}
                </span>
                <span className="text-sm text-zinc-600">/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            icon: ShoppingBag,
            label: "Terjual (30 hari)",
            value: formatNumber(product.sold_30d),
            color: "text-blue-400",
          },
          {
            icon: Star,
            label: "Rating",
            value: product.rating.toString(),
            color: "text-yellow-400",
          },
          {
            icon: MessageCircle,
            label: "Review",
            value: formatNumber(product.review_count),
            color: "text-pink-400",
          },
          {
            icon: Percent,
            label: "Komisi",
            value: `${product.commission_rate}%`,
            color: "text-emerald-400",
          },
          {
            icon: Users,
            label: "Creator",
            value: product.creator_count.toString(),
            color: "text-purple-400",
          },
          {
            icon: Sparkles,
            label: "Total Skor",
            value: totalScore.toString(),
            color: "text-[#667eea]",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-[#1e1e2e] border border-[#2a2a3e] p-4 text-center"
          >
            <stat.icon size={18} className={cn("mx-auto mb-2", stat.color)} />
            <p className={cn("text-lg font-bold", stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-zinc-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Score Breakdown + Content Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <ScoreBreakdown breakdown={product.score_breakdown} />

        {/* Content Strategy */}
        <div className="rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-5">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
            <Video size={16} className="text-[#667eea]" />
            Strategi Konten
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                Format Video
              </p>
              <p className="text-sm text-zinc-300 font-medium">
                {product.content_strategy.format}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                Hook / Caption
              </p>
              <p className="text-sm text-zinc-300 italic bg-[#2a2a3e] rounded-lg p-3 border-l-2 border-[#667eea]">
                &quot;{product.content_strategy.hook}&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                  Durasi
                </p>
                <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                  <Clock size={13} className="text-zinc-500" />
                  {product.content_strategy.duration}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                  Waktu Terbaik
                </p>
                <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                  <Clock size={13} className="text-zinc-500" />
                  {product.content_strategy.best_time}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                Hashtag Rekomendasi
              </p>
              <div className="flex flex-wrap gap-2">
                {product.content_strategy.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#667eea]/10 border border-[#667eea]/20 text-xs text-[#667eea]"
                  >
                    <Hash size={10} />
                    {tag.replace("#", "")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <ExternalLink size={16} />
          Buka di TikTok Shop
        </a>
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1e1e2e] border border-[#2a2a3e] text-zinc-300 text-sm hover:bg-[#252538] transition-colors"
        >
          <Tag size={16} />
          Lihat Produk Lainnya
        </Link>
      </div>
    </div>
  );
}
