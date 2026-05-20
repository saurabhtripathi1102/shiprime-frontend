import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TrustScoreBadgeProps extends React.ComponentPropsWithoutRef<typeof TooltipTrigger> {
  score: number;
}

export const TrustScoreBadge = React.forwardRef<HTMLButtonElement, TrustScoreBadgeProps>(
  ({ className, score, ...props }, ref) => {
    // Math for SVG radial gauge
    const radius = 16;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let strokeColor = "stroke-success";
    let textColor = "text-success";

    if (score < 75) {
      strokeColor = "stroke-destructive";
      textColor = "text-destructive";
    } else if (score < 90) {
      strokeColor = "stroke-warning";
      textColor = "text-warning";
    }

    return (
      <Tooltip>
        <TooltipTrigger
          ref={ref}
          className={cn(
            "inline-flex items-center gap-2 border border-border bg-secondary/20 hover:bg-secondary/40 px-2.5 py-1 rounded-full text-xs font-semibold cursor-help select-none transition-all",
            className
          )}
          {...props}
        >
          <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              {/* Track */}
              <circle
                className="stroke-secondary"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx="16"
                cy="16"
              />
              {/* Progress */}
              <circle
                className={cn("transition-all duration-500 ease-in-out", strokeColor)}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx="16"
                cy="16"
              />
            </svg>
            <span className="absolute font-mono text-[9px] font-bold tracking-tighter text-foreground">
              {score}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-muted-foreground uppercase leading-none font-sans font-semibold">Trust Score</span>
            <span className={cn("text-xs font-bold leading-normal font-mono", textColor)}>{score}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-card text-foreground border border-border text-xs px-3 py-1.5 rounded shadow-lg max-w-[200px]">
          <p className="font-sans font-semibold mb-0.5">Trust Score is {score}/100</p>
          <p className="text-muted-foreground font-sans font-normal text-[11px] leading-tight">
            Based on RTO %, weight dispute record, on-time manifest rates, and payment history.
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

TrustScoreBadge.displayName = "TrustScoreBadge";
