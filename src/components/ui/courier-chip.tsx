import * as React from "react";
import { cn } from "@/lib/utils";

interface CourierChipProps extends React.HTMLAttributes<HTMLDivElement> {
  courier: string;
}

const courierConfig: Record<string, { initials: string; bg: string; text: string }> = {
  delhivery: { initials: "DV", bg: "bg-[#1E1E1E]", text: "text-[#FFD700]" },
  xpressbees: { initials: "XB", bg: "bg-[#F37021]", text: "text-white" },
  dtdc: { initials: "DT", bg: "bg-[#0054A6]", text: "text-white" },
  ecom_express: { initials: "EE", bg: "bg-[#8C0A0D]", text: "text-white" },
  ecom: { initials: "EE", bg: "bg-[#8C0A0D]", text: "text-white" },
  shadowfax: { initials: "SF", bg: "bg-[#00B5B5]", text: "text-[#0E1116]" },
  bluedart: { initials: "BD", bg: "bg-[#FFD200]", text: "text-[#0054A6]" },
  india_post: { initials: "IP", bg: "bg-[#E31E24]", text: "text-[#FFD200]" },
  amazon_shipping: { initials: "AM", bg: "bg-[#FF9900]", text: "text-black" },
  amazon: { initials: "AM", bg: "bg-[#FF9900]", text: "text-black" },
};

export const CourierChip = React.forwardRef<HTMLDivElement, CourierChipProps>(
  ({ className, courier, ...props }, ref) => {
    const key = courier?.toLowerCase().replace(/\s+/g, "_") || "delhivery";
    const config = courierConfig[key] || {
      initials: courier ? courier.substring(0, 2).toUpperCase() : "CR",
      bg: "bg-secondary",
      text: "text-secondary-foreground",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-md text-xs font-medium select-none text-foreground",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "flex items-center justify-center shrink-0 w-4 h-4 rounded-full text-[9px] font-bold font-mono tracking-tighter",
            config.bg,
            config.text
          )}
        >
          {config.initials}
        </span>
        <span className="truncate max-w-[100px]">{courier}</span>
      </div>
    );
  }
);

CourierChip.displayName = "CourierChip";
