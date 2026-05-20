"use client";

import * as React from "react";
import { Package, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusPill, ShipmentStatus } from "@/components/ui/status-pill";
import { CourierChip } from "@/components/ui/courier-chip";
import { AwbCode } from "@/components/ui/awb-code";
import { MoneyAmount } from "@/components/ui/money-amount";
import { SlaCountdown } from "@/components/ui/sla-countdown";
import { KpiCard } from "@/components/ui/kpi-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PincodeBadge } from "@/components/ui/pincode-badge";
import { TrustScoreBadge } from "@/components/ui/trust-score-badge";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { EvidenceCard } from "@/components/ui/evidence-card";

export default function DesignSystemPage() {
  const [themeMode, setThemeMode] = React.useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Deadlines for SLA Countdowns
  const now = React.useMemo(() => new Date(), []);
  const deadlineGreen = React.useMemo(() => new Date(now.getTime() + 36 * 60 * 60 * 1000), [now]); // 36 hours from now
  const deadlineAmber = React.useMemo(() => new Date(now.getTime() + 18 * 60 * 60 * 1000), [now]); // 18 hours from now
  const deadlineRed = React.useMemo(() => new Date(now.getTime() + 4 * 60 * 60 * 1000), [now]);   // 4 hours from now
  const deadlineBreached = React.useMemo(() => new Date(now.getTime() - 2 * 60 * 60 * 1000), [now]); // breached

  return (
    <div className={themeMode}>
      <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 font-sans transition-colors duration-300">
        <header className="max-w-7xl mx-auto flex items-center justify-between border-b border-border pb-6 mb-8 select-none">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">
              {siteConfig.name} Design System
            </span>
            <h1 className="text-3xl font-display font-medium text-foreground tracking-tight mt-1">
              Component Primitives Showcase
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Visual verification catalog for Shiprime UI primitives in all states.
            </p>
          </div>
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="border-border hover:bg-secondary cursor-pointer rounded-md font-sans text-xs"
          >
            Toggle {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </header>

        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Status Pills */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                1. StatusPill Primitives
              </CardTitle>
              <CardDescription className="text-xs">
                Semantic chip badges for standard shipment lifecycle states, with live pulse effects for active transit milestones.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2.5 pt-2">
              <StatusPill status="new" />
              <StatusPill status="label_generated" />
              <StatusPill status="picked" />
              <StatusPill status="in_transit" />
              <StatusPill status="out_for_delivery" />
              <StatusPill status="delivered" />
              <StatusPill status="rto_initiated" />
              <StatusPill status="rto_delivered" />
              <StatusPill status="lost" />
              <StatusPill status="damaged" />
              <StatusPill status="cancelled" />
            </CardContent>
          </Card>

          {/* 2. Risk Indicators */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                2. RiskIndicator Primitives
              </CardTitle>
              <CardDescription className="text-xs">
                Visual trust score risk assessment indicators (Low, Medium, or High).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16">Low Level:</span>
                <RiskIndicator level="low" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16">Med Level:</span>
                <RiskIndicator level="medium" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16">High Level:</span>
                <RiskIndicator level="high" />
              </div>
            </CardContent>
          </Card>

          {/* 3. Courier Chips */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                3. CourierChip Primitives
              </CardTitle>
              <CardDescription className="text-xs">
                Inline tags representing logistics channel couriers with their specific branding colors.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2.5 pt-2">
              <CourierChip courier="Delhivery" />
              <CourierChip courier="XpressBees" />
              <CourierChip courier="DTDC" />
              <CourierChip courier="Ecom Express" />
              <CourierChip courier="Shadowfax" />
              <CourierChip courier="BlueDart" />
              <CourierChip courier="India Post" />
              <CourierChip courier="Amazon Shipping" />
            </CardContent>
          </Card>

          {/* 4. AWB Codes */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                4. AwbCode Click-To-Copy
              </CardTitle>
              <CardDescription className="text-xs">
                Tracking numbers in monospace font, displaying check marks and triggering toasts on click-to-copy.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-2">
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <span className="text-xs text-muted-foreground">Standard AWB:</span>
                <AwbCode value="AWB-8921-1029-99" />
              </div>
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <span className="text-xs text-muted-foreground">Shadowfax AWB:</span>
                <AwbCode value="SFX-902-1827-01" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Delhivery AWB:</span>
                <AwbCode value="DV-129-8723-019" />
              </div>
            </CardContent>
          </Card>

          {/* 5. Trust Score Radial Gauges */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                5. TrustScore Radial Gauges
              </CardTitle>
              <CardDescription className="text-xs">
                Inline circular SVGs scaling with the quality of the seller profile (green, yellow, red thresholds).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 pt-2">
              <TrustScoreBadge score={98} />
              <TrustScoreBadge score={84} />
              <TrustScoreBadge score={62} />
            </CardContent>
          </Card>

          {/* 6. SLA Countdowns */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                6. SlaCountdown Live Timers
              </CardTitle>
              <CardDescription className="text-xs">
                Dynamic countdown widgets updating every second. Shifts colors from green (safe) to orange (moderate), to pulsing red (critical & breached).
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">&gt; 24h Safe:</span>
                <SlaCountdown deadline={deadlineGreen} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">12-24h Warning:</span>
                <SlaCountdown deadline={deadlineAmber} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">&lt; 12h Critical Pulse:</span>
                <SlaCountdown deadline={deadlineRed} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">Breached Alert:</span>
                <SlaCountdown deadline={deadlineBreached} />
              </div>
            </CardContent>
          </Card>

          {/* 7. Money Amounts */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                7. MoneyAmount Formatting
              </CardTitle>
              <CardDescription className="text-xs">
                Strict monospace formatting of Indian currency, containing up/down direction tags representing ledger changes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs">Standard Expense:</span>
                <MoneyAmount value={428.50} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs">With Positive Shift:</span>
                <MoneyAmount value={12400.00} delta={12} showSign />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs">With Negative Shift:</span>
                <MoneyAmount value={48200.25} delta={-3} />
              </div>
            </CardContent>
          </Card>

          {/* 8. Pincode Badges */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                8. PincodeBadge Tooltips
              </CardTitle>
              <CardDescription className="text-xs">
                Postal code chips highlighting location names and states within tooltip popups on hover.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3 pt-2">
              <PincodeBadge pincode="110001" city="Connaught Place, New Delhi" state="Delhi" />
              <PincodeBadge pincode="400001" city="Fort, Mumbai" state="Maharashtra" />
              <PincodeBadge pincode="560001" city="Majestic, Bengaluru" state="Karnataka" />
              <PincodeBadge pincode="700001" city="Esplanade, Kolkata" state="West Bengal" />
              <PincodeBadge pincode="600001" city="Parrys, Chennai" state="Tamil Nadu" />
            </CardContent>
          </Card>

          {/* 9. KPI Cards */}
          <Card className="bg-card border-border lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                9. KPI Cards with Custom Sparklines
              </CardTitle>
              <CardDescription className="text-xs">
                Compact widget blocks displaying critical highlights alongside high-performance visual SVG sparkline indicators.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <KpiCard
                title="Today's Bookings"
                value="48"
                delta={12.4}
                sparkline={[12, 18, 22, 19, 32, 40, 48]}
              />
              <KpiCard
                title="Wallet Balance"
                value="₹1,24,980"
                delta={-4.2}
                sparkline={[145000, 140000, 138000, 131000, 129000, 126000, 124980]}
                isCurrency
              />
              <KpiCard
                title="Open Disputes"
                value="3"
                delta={-50}
                sparkline={[6, 6, 5, 4, 4, 3, 3]}
              />
              <KpiCard
                title="RTO Risk Count"
                value="1"
                delta={20}
                sparkline={[0, 0, 1, 1, 0, 1, 1]}
              />
            </CardContent>
          </Card>

          {/* 10. Evidence Photo Overlay Cards */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                10. Warehouse Evidence Photo Overlay
              </CardTitle>
              <CardDescription className="text-xs">
                Card components housing package scan photography with hover panels showing timestamps, scales, and dimensions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">Scan Station A:</span>
                <EvidenceCard
                  imageUrl="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop"
                  meta={{
                    timestamp: "20 May 2026, 09:45 AM",
                    scaleId: "SCALE-A04",
                    weightKg: 0.85,
                    dimensionsCm: "15 × 12 × 5 cm",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">Scan Station B:</span>
                <EvidenceCard
                  imageUrl="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=400&auto=format&fit=crop"
                  meta={{
                    timestamp: "20 May 2026, 10:12 AM",
                    scaleId: "SCALE-B09",
                    weightKg: 2.45,
                    dimensionsCm: "30 × 20 × 15 cm",
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* 11. Empty State Blocks */}
          <Card className="bg-card border-border lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase font-mono tracking-wider">
                11. Reusable EmptyState
              </CardTitle>
              <CardDescription className="text-xs">
                Center-aligned empty layout panels designed to display when lists returned zero matches.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <EmptyState
                icon={Package}
                headline="No Disputed Shipments Found"
                body="Excellent! All weight calculations match the courier assessments perfectly. You have no active disputes requiring your attention."
                action={
                  <Button size="sm" className="bg-primary text-primary-foreground font-sans text-xs cursor-pointer rounded-md px-4 py-1.5">
                    View Verified Ledger
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
