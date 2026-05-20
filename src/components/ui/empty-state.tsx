import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  headline: string;
  body: string;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon: Icon, headline, body, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-border rounded-xl bg-card/25 w-full select-none",
          className
        )}
        {...props}
      >
        {Icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 border border-border text-muted-foreground mb-4">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1">{headline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">{body}</p>
        {action && <div className="flex items-center gap-4">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
