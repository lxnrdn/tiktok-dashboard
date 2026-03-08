"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { DailyTrend } from "@/lib/types";

interface TrendChartProps {
  data: DailyTrend[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-lg font-bold text-white mt-1">
        Skor: {payload[0].value}
      </p>
    </div>
  );
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-5">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">
        Tren Skor Harian (7 Hari)
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2a2a3e"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[40, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="avg_score"
              stroke="#667eea"
              strokeWidth={2.5}
              fill="url(#scoreGradient)"
              dot={{
                fill: "#667eea",
                strokeWidth: 2,
                stroke: "#1e1e2e",
                r: 4,
              }}
              activeDot={{
                fill: "#667eea",
                strokeWidth: 3,
                stroke: "#fff",
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
