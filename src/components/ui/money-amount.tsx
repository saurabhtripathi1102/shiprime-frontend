import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface MoneyAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  delta?: number;
  showSign?: boolean;
}

export const MoneyAmount = React.forwardRef<HTMLSpanElement, MoneyAmountProps>(
  ({ className, value, delta, showSign = false, ...props }, ref) => {
    const formatted = formatINR(value);
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-foreground font-medium",
          className
        )}
        {...props}
      >
        <span className="font-mono">{formatted}</span>
        {delta !== undefined && delta !== 0 && (
          <span
            className={cn(
              "inline-flex items-center text-[10px] font-semibold font-sans px-1 rounded-sm shrink-0 select-none",
              delta > 0
                ? "text-success bg-success/10"
                : "text-destructive bg-destructive/10"
            )}
          >
            {delta > 0 ? (
              <>
                <ArrowUpRight className="w-3 h-3 shrink-0" />
                {showSign ? "+" : ""}{delta}%
              </>
            ) : (
              <>
                <ArrowDownRight className="w-3 h-3 shrink-0" />
                {delta}%
              </>
            )}
          </span>
        )}
      </span>
    );
  }
);

MoneyAmount.displayName = "MoneyAmount";
