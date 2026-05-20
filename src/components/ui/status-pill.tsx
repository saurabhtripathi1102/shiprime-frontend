import * as React from "react";
import { cn } from "@/lib/utils";

export type ShipmentStatus =
  | "new"
  | "label_generated"
  | "picked"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "rto_initiated"
  | "rto_delivered"
  | "lost"
  | "damaged"
  | "cancelled";

interface StatusPillProps extends React.HTMLAttributes<HTMLDivElement> {
  status: ShipmentStatus | string;
}

const statusConfig: Record<
  ShipmentStatus,
  { label: string; bg: string; text: string; border: string; dot: string; pulse?: boolean }
> = {
  new: {
    label: "New",
    bg: "bg-secondary/40",
    text: "text-muted-foreground",
    border: "border-border",
    dot: "bg-muted-foreground/60",
  },
  label_generated: {
    label: "Label Generated",
    bg: "bg-secondary",
    text: "text-secondary-foreground",
    border: "border-border",
    dot: "bg-secondary-foreground/60",
  },
  picked: {
    label: "Picked Up",
    bg: "bg-info/10",
    text: "text-info",
    border: "border-info/20",
    dot: "bg-info",
  },
  in_transit: {
    label: "In Transit",
    bg: "bg-info/10",
    text: "text-info",
    border: "border-info/20",
    dot: "bg-info",
    pulse: true,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    bg: "bg-info/15",
    text: "text-info",
    border: "border-info/30",
    dot: "bg-info",
    pulse: true,
  },
  delivered: {
    label: "Delivered",
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
    dot: "bg-success",
  },
  rto_initiated: {
    label: "RTO Initiated",
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/20",
    dot: "bg-warning",
    pulse: true,
  },
  rto_delivered: {
    label: "RTO Delivered",
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
    dot: "bg-success",
  },
  lost: {
    label: "Lost",
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    dot: "bg-destructive",
  },
  damaged: {
    label: "Damaged",
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    dot: "bg-destructive",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-secondary/40",
    text: "text-muted-foreground",
    border: "border-border",
    dot: "bg-muted-foreground/40",
  },
};

export const StatusPill = React.forwardRef<HTMLDivElement, StatusPillProps>(
  ({ className, status, ...props }, ref) => {
    // Normalize status strings
    const normalizedStatus = (status?.toLowerCase().replace(/\s+/g, "_") as ShipmentStatus) || "new";
    const config = statusConfig[normalizedStatus] || {
      label: status,
      bg: "bg-secondary/40",
      text: "text-muted-foreground",
      border: "border-border",
      dot: "bg-muted-foreground/60",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold select-none",
          config.bg,
          config.text,
          config.border,
          className
        )}
        {...props}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          {config.pulse && (
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.dot)} />
          )}
          <span className={cn("relative inline-flex rounded-full h-2 w-2", config.dot)} />
        </span>
        {config.label}
      </div>
    );
  }
);

StatusPill.displayName = "StatusPill";
