"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CategoryInfo } from "@/lib/types";

interface CategoryChartProps {
  categories: Record<string, CategoryInfo>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { label: string; count: number; color: string };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-sm font-medium text-white">{data.label}</p>
      <p className="text-xs text-zinc-400 mt-1">{data.count} produk</p>
    </div>
  );
}

export default function CategoryChart({ categories }: CategoryChartProps) {
  const data = Object.entries(categories).map(([key, val]) => ({
    name: key,
    label: val.label,
    count: val.count,
    color: val.color,
  }));

  return (
    <div className="rounded-2xl bg-[#1e1e2e] border border-[#2a2a3e] p-5">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">
        Distribusi Kategori
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
              dataKey="count"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => {
                const item = data.find((d) => d.name === value);
                return (
                  <span className="text-xs text-zinc-400">
                    {item?.label || value}
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
