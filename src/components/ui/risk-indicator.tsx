import * as React from "react";
import { ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  level: "low" | "medium" | "high" | string;
}

export const RiskIndicator = React.forwardRef<HTMLDivElement, RiskIndicatorProps>(
  ({ className, level, ...props }, ref) => {
    const normLevel = level?.toLowerCase() || "low";

    let label = "Low Risk";
    let badgeStyle = "bg-success/10 text-success border-success/20";
    let Icon = ShieldCheck;

    if (normLevel === "high") {
      label = "High Risk";
      badgeStyle = "bg-destructive/10 text-destructive border-destructive/20 animate-pulse font-bold";
      Icon = AlertCircle;
    } else if (normLevel === "medium") {
      label = "Medium Risk";
      badgeStyle = "bg-warning/10 text-warning border-warning/20 font-semibold";
      Icon = AlertTriangle;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-0.5 border rounded text-xs select-none",
          badgeStyle,
          className
        )}
        {...props}
      >
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="font-sans font-medium tracking-tight">{label}</span>
      </div>
    );
  }
);

RiskIndicator.displayName = "RiskIndicator";
