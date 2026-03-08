export interface ScoreBreakdown {
  commission: number;
  demand: number;
  velocity: number;
  competition: number;
  quality: number;
}

export interface ContentStrategy {
  format: string;
  hook: string;
  duration: string;
  best_time: string;
  hashtags: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sold_30d: number;
  rating: number;
  review_count: number;
  commission_rate: number;
  creator_count: number;
  affiliate_score: number;
  tier: number;
  category: string;
  viral_flags: string[];
  score_breakdown: ScoreBreakdown;
  content_strategy: ContentStrategy;
  product_url: string;
}

export interface CategoryInfo {
  label: string;
  count: number;
  color: string;
}

export interface DailyTrend {
  date: string;
  avg_score: number;
}

export interface ReportData {
  report_date: string;
  report_time: string;
  total_analyzed: number;
  tier1_count: number;
  tier2_count: number;
  tier3_count: number;
  tier4_count: number;
  avg_commission: number;
  potential_earnings: string;
  categories: Record<string, CategoryInfo>;
  daily_trends: DailyTrend[];
  products: Product[];
}

export type SortField = "name" | "price" | "sold_30d" | "rating" | "commission_rate" | "affiliate_score" | "tier";
export type SortDirection = "asc" | "desc";
