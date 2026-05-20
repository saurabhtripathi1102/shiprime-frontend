"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSeller, getOrders } from "@/lib/api";
import { siteConfig } from "@/config/site";
import { KpiCard } from "@/components/ui/kpi-card";
import { MoneyAmount } from "@/components/ui/money-amount";
import { formatDate, formatINR } from "@/lib/format";
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Coins, 
  CheckCircle,
  Truck,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardStubPage() {
  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: getSeller,
  });

  const { data: orders } = useQuery({
    queryKey: ["orders-stub"],
    queryFn: getOrders,
  });

  const activeShipmentsCount = React.useMemo(() => {
    if (!orders) return 0;
    return orders.filter(o => ["label_generated", "picked", "in_transit", "out_for_delivery"].includes(o.status)).length;
  }, [orders]);

  const deliveredCount = React.useMemo(() => {
    if (!orders) return 0;
    return orders.filter(o => o.status === "delivered").length;
  }, [orders]);

  const activeDisputesCount = 12; // Static showcase count

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/20 to-transparent p-6 sm:p-8 overflow-hidden select-none">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 md:opacity-20 pointer-events-none translate-x-12 select-none">
          <Sparkles className="h-64 w-64 text-primary animate-pulse" />
        </div>
        <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
          <span className="text-[10px] uppercase font-bold font-mono tracking-widest text-primary flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Step 4 App Shell Active
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground mt-1">
            Welcome to {siteConfig.name}, {seller?.name || "Seller"}!
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
            Your e-commerce delivery operation for <strong className="text-foreground">{seller?.businessName || "Mitti Studios"}</strong> is fully synchronized.
            Use <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-border/80 text-xs font-mono font-bold text-foreground">Ctrl + K</kbd> to search orders, switch themes, or execute billing recharges.
          </p>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>GSTIN: <strong className="text-foreground">{seller?.gstin}</strong></span>
            <span>•</span>
            <span>Date: <strong className="text-foreground">{formatDate(new Date(), "dd MMMM yyyy")}</strong></span>
          </div>
        </div>
      </div>

      {/* Verification KPI Grid using custom UI primitives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KpiCard
          title="Escrow Wallet Balance"
          value={formatINR(seller?.walletBalance || 0)}
          delta={12.4}
          isCurrency={true}
          sparkline={[145000, 140000, 138000, 131000, 129000, 126000, seller?.walletBalance || 124980]}
        />
        <KpiCard
          title="Active Transit Packages"
          value={activeShipmentsCount}
          delta={-4.2}
          sparkline={[20, 24, 22, 19, 18, 17, activeShipmentsCount]}
        />
        <KpiCard
          title="Delivered This Month"
          value={deliveredCount}
          delta={18.8}
          sparkline={[80, 85, 92, 98, 104, 110, deliveredCount]}
        />
        <KpiCard
          title="Open Weight Disputes"
          value={activeDisputesCount}
          delta={0}
          sparkline={[14, 13, 13, 12, 12, 12, activeDisputesCount]}
        />
      </div>

      {/* Quick Layout Verification Stubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Coins className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-semibold text-sm text-foreground">Secure Billing</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Escrow ledger transactions list all shipping charges with 100% itemized explanation. No silent debits.
          </p>
          <button 
            onClick={() => toast.success("Razorpay secure billing link generated.")}
            className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-auto text-left cursor-pointer"
          >
            Config Auto-Topup <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <CheckCircle className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-semibold text-sm text-foreground">48h Disputes SLA</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Upload dimensions/weight scans to resolve auto-surcharge discrepancies. Guaranteed review in 48 hours.
          </p>
          <button 
            onClick={() => toast.info("Opening active audits portal...")}
            className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-auto text-left cursor-pointer"
          >
            Review Active Audits <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="font-sans font-semibold text-sm text-foreground">D+2 COD Remittance</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            COD cash is paid out directly within 2 days of delivery. Keep your cash flows flowing cleanly.
          </p>
          <button 
            onClick={() => toast.info("Retrieving bank transfer calendar...")}
            className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-auto text-left cursor-pointer"
          >
            View Remittances <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
