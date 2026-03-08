import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "jt";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "rb";
  }
  return num.toString();
}

export function getTierColor(tier: number): string {
  switch (tier) {
    case 1:
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case 2:
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case 3:
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case 4:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

export function getTierLabel(tier: number): string {
  return `TIER ${tier}`;
}

export function getViralFlagStyle(flag: string): string {
  switch (flag) {
    case "VIRAL_VIDEO":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "TRENDING_HASHTAG":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "LOW_COMPETITION":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

export function getViralFlagLabel(flag: string): string {
  switch (flag) {
    case "VIRAL_VIDEO":
      return "Video Viral";
    case "TRENDING_HASHTAG":
      return "Hashtag Trending";
    case "LOW_COMPETITION":
      return "Kompetisi Rendah";
    default:
      return flag;
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

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-blue-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

export function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-400";
  if (score >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-400";
  if (score >= 40) return "bg-gradient-to-r from-yellow-500 to-amber-400";
  return "bg-gradient-to-r from-red-500 to-pink-400";
}
