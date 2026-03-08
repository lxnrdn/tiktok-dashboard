"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronUp,
  ChevronDown,
  Search,
  ExternalLink,
  ArrowUpDown,
} from "lucide-react";
import { Product, SortField, SortDirection } from "@/lib/types";
import {
  cn,
  formatRupiah,
  formatNumber,
  getTierColor,
  getTierLabel,
  getCategoryLabel,
  getScoreColor,
} from "@/lib/utils";
import ViralBadge from "./ViralBadge";

interface ProductTableProps {
  products: Product[];
}

const columns: { key: SortField; label: string; align?: string }[] = [
  { key: "affiliate_score", label: "Rank" },
  { key: "name", label: "Nama Produk" },
  { key: "price", label: "Harga (IDR)" },
  { key: "sold_30d", label: "Terjual (30h)", align: "right" },
  { key: "rating", label: "Rating" },
  { key: "commission_rate", label: "Komisi (%)" },
  { key: "affiliate_score", label: "Skor" },
  { key: "tier", label: "Tier" },
];

export default function ProductTable({ products }: ProductTableProps) {
  const [sortField, setSortField] = useState<SortField>("affiliate_score");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir(field === "name" ? "asc" : "desc");
    }
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [products, search, categoryFilter, sortField, sortDir]);

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "fashion_wanita", label: "Fashion Wanita" },
    { value: "aksesoris", label: "Aksesoris" },
    { value: "hijab", label: "Hijab & Muslim" },
    { value: "tas_sepatu", label: "Tas & Sepatu" },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1e1e2e] border border-[#2a2a3e] rounded-xl text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-[#667eea]/50 transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-[#1e1e2e] border border-[#2a2a3e] rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-[#667eea]/50 transition-colors appearance-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#2a2a3e]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#141420] border-b border-[#2a2a3e]">
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider w-12">
                #
              </th>
              <th
                onClick={() => handleSort("name")}
                className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
              >
                <span className="flex items-center gap-1">
                  Nama Produk
                  <ArrowUpDown size={12} />
                </span>
              </th>
              <th
                onClick={() => handleSort("price")}
                className="px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
              >
                <span className="flex items-center justify-end gap-1">
                  Harga
                  <ArrowUpDown size={12} />
                </span>
              </th>
              <th
                onClick={() => handleSort("sold_30d")}
                className="px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
              >
                <span className="flex items-center justify-end gap-1">
                  Terjual
                  <ArrowUpDown size={12} />
                </span>
              </th>
              <th
                onClick={() => handleSort("rating")}
                className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
              >
                <span className="flex items-center justify-center gap-1">
                  Rating
                  <ArrowUpDown size={12} />
                </span>
              </th>
              <th
                onClick={() => handleSort("commission_rate")}
                className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
              >
                <span className="flex items-center justify-center gap-1">
                  Komisi
                  <ArrowUpDown size={12} />
                </span>
              </th>
              <th
                onClick={() => handleSort("affiliate_score")}
                className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
              >
                <span className="flex items-center justify-center gap-1">
                  Skor
                  <ArrowUpDown size={12} />
                </span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Flags
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider w-16">
                Detail
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a3e]">
            {filtered.map((product, index) => (
              <tr
                key={product.id}
                className="bg-[#1e1e2e] hover:bg-[#252538] transition-colors"
              >
                <td className="px-4 py-3 text-zinc-500 font-mono text-xs">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-zinc-200 text-sm">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {getCategoryLabel(product.category)}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-zinc-300 font-mono text-xs">
                  {formatRupiah(product.price)}
                </td>
                <td className="px-4 py-3 text-right text-zinc-300 font-mono text-xs">
                  {formatNumber(product.sold_30d)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-yellow-400 text-xs">
                    {"\u2605"} {product.rating}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-emerald-400 font-semibold text-xs">
                  {product.commission_rate}%
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "font-bold text-sm",
                      getScoreColor(product.affiliate_score)
                    )}
                  >
                    {product.affiliate_score}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border",
                      getTierColor(product.tier)
                    )}
                  >
                    {getTierLabel(product.tier)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {product.viral_flags.map((flag) => (
                      <ViralBadge key={flag} flag={flag} size="sm" />
                    ))}
                    {product.viral_flags.length === 0 && (
                      <span className="text-zinc-600 text-[10px]">-</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#667eea]/10 text-[#667eea] hover:bg-[#667eea]/20 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 text-xs text-zinc-500 text-right">
        Menampilkan {filtered.length} dari {products.length} produk
      </div>
    </div>
  );
}