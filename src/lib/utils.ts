import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 65) return "text-blue-400";
  if (score >= 50) return "text-yellow-400";
  return "text-gray-400";
}

export function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-400";
  if (score >= 65) return "bg-gradient-to-r from-blue-500 to-cyan-400";
  if (score >= 50) return "bg-gradient-to-r from-yellow-500 to-amber-400";
  return "bg-gradient-to-r from-gray-500 to-zinc-400";
}

export function getTierColor(tier: number): string {
  switch (tier) {
    case 1: return "bg-green-500/10 text-green-400 border-green-500/30";
    case 2: return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case 3: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
  }
}

export function getTierLabel(tier: number): string {
  switch (tier) {
    case 1: return "TIER 1";
    case 2: return "TIER 2";
    case 3: return "TIER 3";
    default: return "TIER 4";
  }
}

export function getViralFlagStyle(flag: string): string {
  switch (flag) {
    case "VIRAL_VIDEO": return "bg-red-500/10 text-red-400 border-red-500/30";
    case "TRENDING_HASHTAG": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    case "LOW_COMPETITION": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
  }
}

export function getViralFlagLabel(flag: string): string {
  switch (flag) {
    case "VIRAL_VIDEO": return "Viral";
    case "TRENDING_HASHTAG": return "Trending";
    case "LOW_COMPETITION": return "Low Comp";
    default: return flag;
  }
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    fashion_wanita: "Fashion Wanita",
    aksesoris: "Aksesoris",
    hijab: "Hijab & Muslim",
    tas_sepatu: "Tas & Sepatu",
  };
  return labels[category] || category;
}
