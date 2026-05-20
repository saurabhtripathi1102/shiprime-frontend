"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUiStore } from "@/stores/uiStore";
import { getSeller } from "@/lib/api";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Truck, 
  AlertTriangle, 
  Wallet, 
  BarChart3, 
  ShieldAlert, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrustScoreBadge } from "@/components/ui/trust-score-badge";

const NAVIGATION_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Shipments", href: "/shipments", icon: Truck },
  { name: "Disputes", href: "/disputes", icon: AlertTriangle, badge: "12" }, // 12 disputes in mock data
  { name: "Wallet & Billing", href: "/wallet", icon: Wallet },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Couriers & NDR", href: "/couriers", icon: ShieldAlert },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  
  // TanStack Query to fetch high-fidelity seller data
  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: getSeller,
  });

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border bg-card text-foreground transition-all duration-300 ease-in-out select-none shrink-0 relative",
        sidebarCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Sidebar Header / Branding Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/80">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2.5 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,107,53,0.3)]">
            <span className="font-display font-bold text-lg text-primary-foreground">
              {siteConfig.name[0]}
            </span>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col select-none animate-in fade-in duration-300">
              <span className="font-display font-semibold text-base tracking-tight leading-none text-foreground">
                {siteConfig.name}
              </span>
              <span className="text-[10px] font-mono text-primary font-bold mt-0.5 tracking-wider uppercase flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5" /> India D2C
              </span>
            </div>
          )}
        </Link>
        
        {/* Toggle Collapse Button */}
        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="h-7 w-7 rounded-md border border-border bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Expand/Collapse Hover Trigger inside collapsed state */}
      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4.5 z-40 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer shadow-md transition-colors"
          title="Expand Sidebar"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-none">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          const linkContent = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group relative cursor-pointer",
                isActive
                  ? "bg-secondary text-primary font-semibold border-l-2 border-primary rounded-l-none"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-105", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              
              {!sidebarCollapsed && (
                <span className="flex-1 truncate font-sans text-sm animate-in fade-in duration-200">
                  {item.name}
                </span>
              )}
              
              {!sidebarCollapsed && item.badge && (
                <span className="ml-auto text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {item.badge}
                </span>
              )}
            </Link>
          );

          if (sidebarCollapsed) {
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger render={<div />}>
                  {linkContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-2 font-sans">
                  {item.name}
                  {item.badge && (
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-primary/15 text-primary border border-primary/25">
                      {item.badge}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.name}>{linkContent}</div>;
        })}
      </nav>

      {/* Seller Profile Summary Footer */}
      {seller && (
        <div className="p-3 border-t border-border bg-secondary/20 flex flex-col gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-9 w-9 shrink-0 border border-border">
              <AvatarImage src={seller.avatarUrl} alt={seller.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {seller.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate animate-in fade-in duration-200">
                <span className="text-xs font-semibold text-foreground leading-none">
                  {seller.name}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Building className="h-3 w-3 shrink-0" />
                  <span className="truncate">{seller.businessName}</span>
                </span>
              </div>
            )}
          </div>
          
          {/* Trust Score & Wallet balance displayed in expanded sidebar */}
          {!sidebarCollapsed && (
            <div className="flex flex-col gap-2 p-2 rounded-lg bg-card border border-border/80 text-[11px] animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-sans">Trust Score:</span>
                <TrustScoreBadge score={seller.trustScore} />
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border/40">
                <span className="text-muted-foreground font-sans">Wallet:</span>
                <span className="font-mono font-bold text-foreground">
                  {formatINR(seller.walletBalance)}
                </span>
              </div>
            </div>
          )}

          {/* Quick Stats in Collapsed Sidebar */}
          {sidebarCollapsed && (
            <Tooltip>
              <TooltipTrigger render={
                <div className="flex items-center justify-center p-1 rounded-lg bg-card border border-border cursor-pointer" />
              }>
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
              </TooltipTrigger>
              <TooltipContent side="right" className="space-y-1.5 font-sans">
                <div className="text-[10px] text-muted-foreground">Mitti Studios Status</div>
                <div className="flex items-center justify-between gap-4 text-xs font-semibold">
                  <span>Trust Score:</span>
                  <span className="text-emerald-500 font-mono">{seller.trustScore}%</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-xs font-semibold">
                  <span>Wallet:</span>
                  <span className="font-mono text-primary">{formatINR(seller.walletBalance)}</span>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
    </aside>
  );
}
