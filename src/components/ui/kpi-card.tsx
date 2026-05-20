import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  delta?: number;
  sparkline?: number[];
  isCurrency?: boolean;
}

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ className, title, value, delta, sparkline, isCurrency = false, ...props }, ref) => {
    // Generate inline SVG path for the sparkline
    const svgPath = React.useMemo(() => {
      if (!sparkline || sparkline.length < 2) return "";
      const min = Math.min(...sparkline);
      const max = Math.max(...sparkline);
      const range = max - min === 0 ? 1 : max - min;
      const height = 32;
      const width = 100;
      const padding = 2;
      
      const points = sparkline.map((val, idx) => {
        const x = (idx / (sparkline.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((val - min) / range) * (height - padding * 2) - padding;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      
      return `M ${points.join(" L ")}`;
    }, [sparkline]);

    return (
      <Card ref={ref} className={cn("overflow-hidden bg-card border-border", className)} {...props}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
            {delta !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full select-none",
                  delta > 0
                    ? "text-success bg-success/10"
                    : "text-destructive bg-destructive/10"
                )}
              >
                {delta > 0 ? (
                  <>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    +{delta}%
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                    {delta}%
                  </>
                )}
              </span>
            )}
          </div>
          
          <div className="flex items-end justify-between mt-3">
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl sm:text-3xl font-semibold tracking-tight text-foreground",
                typeof value === "number" || isCurrency ? "font-mono" : "font-sans"
              )}>
                {value}
              </span>
            </div>
            
            {sparkline && sparkline.length >= 2 && (
              <div className="h-8 w-24 shrink-0 select-none opacity-85 hover:opacity-100 transition-opacity">
                <svg className="w-full h-full" viewBox="0 0 100 32">
                  <path
                    d={svgPath}
                    fill="none"
                    stroke={delta && delta > 0 ? "#4ADE80" : "#FF5C5C"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

KpiCard.displayName = "KpiCard";
