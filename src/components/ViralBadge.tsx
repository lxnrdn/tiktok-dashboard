"use client";

import { Flame, Hash, Target } from "lucide-react";
import { cn, getViralFlagStyle, getViralFlagLabel } from "@/lib/utils";

interface ViralBadgeProps {
  flag: string;
  size?: "sm" | "md";
}

const flagIcons: Record<string, typeof Flame> = {
  VIRAL_VIDEO: Flame,
  TRENDING_HASHTAG: Hash,
  LOW_COMPETITION: Target,
};

export default function ViralBadge({ flag, size = "sm" }: ViralBadgeProps) {
  const Icon = flagIcons[flag] || Flame;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        getViralFlagStyle(flag),
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        flag === "VIRAL_VIDEO" && "viral-pulse"
      )}
    >
      <Icon size={size === "sm" ? 10 : 12} />
      {getViralFlagLabel(flag)}
    </span>
  );
}
