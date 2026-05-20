import * as React from "react";
import { MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PincodeBadgeProps extends React.ComponentPropsWithoutRef<typeof TooltipTrigger> {
  pincode: string;
  city: string;
  state?: string;
}

export const PincodeBadge = React.forwardRef<HTMLButtonElement, PincodeBadgeProps>(
  ({ className, pincode, city, state, ...props }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1 bg-secondary/40 border border-border/40 hover:border-border hover:bg-secondary/60 px-2 py-0.5 rounded text-xs select-none font-mono text-foreground cursor-help transition-all",
            className
          )}
          {...props}
        >
          <MapPin className="w-3 h-3 text-primary shrink-0" />
          <span className="font-mono tracking-wider font-medium">{pincode}</span>
        </TooltipTrigger>
        <TooltipContent className="bg-card text-foreground border border-border text-xs px-2.5 py-1 rounded shadow-md">
          <p className="font-sans font-semibold">
            {city}
            {state ? `, ${state}` : ""}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

PincodeBadge.displayName = "PincodeBadge";
