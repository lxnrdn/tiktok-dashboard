"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ScoreBreakdown as ScoreBreakdownType } from "@/lib/types";

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
}

const dimensionLabels: Record<string, { label: string; max: number }> = {
  commission: { label: "Komisi", max: 30 },
  demand: { label: "Permintaan", max: 25 },
  velocity: { label: "Kecepatan", max: 20 },
  competition: { label: "Kompetisi", max: 15 },
  quality: { label: "Kualitas", max: 10 },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { dimension: string; score: number; max: number; pct: number };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-sm font-medium text-white">{d.dimension}</p>
      <p className="text-xs text-zinc-400 mt-1">
        Skor: {d.score}/{d.max} ({d.pct}%)
      </p>
    </div>
  );
}

export default function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  const data = Object.entries(breakdown).map(([key, value]) => {
    const dim = dimensionLabels[key];
    return {
      dimension: dim?.label || key,
      score: value,
      max: dim?.max || 30,
      pct: Math.round((value / (dim?.max || 30)) * 100),
      fullMark: dim?.max || 30,
    };
  });

  return (
    <div className="rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-5">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">
        Skor Breakdown
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#2a2a3e" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, "auto"]}
              tick={{ fill: "#52525b", fontSize: 9 }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Skor"
              dataKey="score"
              stroke="#667eea"
              fill="#667eea"
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{
                fill: "#667eea",
                strokeWidth: 2,
                stroke: "#1e1e2e",
                r: 4,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score bars */}
      <div className="space-y-3 mt-4">
        {data.map((d) => (
          <div key={d.dimension}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{d.dimension}</span>
              <span className="text-zinc-300 font-medium">
                {d.score}/{d.max}
              </span>
            </div>
            <div className="h-1.5 bg-[#2a2a3e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full transition-all duration-500"
                style={{ width: `${d.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
