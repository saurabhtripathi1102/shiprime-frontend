"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { useUiStore } from "@/stores/uiStore";
import { getSeller } from "@/lib/api";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  Settings, 
  CreditCard,
  Building,
  HelpCircle,
  ShieldAlert,
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
  Truck,
  AlertTriangle,
  Wallet,
  BarChart3
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { setCommandPaletteOpen } = useUiStore();
  const [mounted, setMounted] = React.useState(false);

  // Sync mounted state to avoid hydration issues with theme icons
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: getSeller,
  });

  const handleLogout = () => {
    toast.info("Simulating secure logout from session...");
    setTimeout(() => {
      router.push("/login");
    }, 800);
  };

  const handleSearchClick = () => {
    setCommandPaletteOpen(true);
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Hamburger Navigation Menu */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger render={
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground cursor-pointer"
              title="Open Navigation"
            />
          }>
            <Menu className="h-5.5 w-5.5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-card border-r border-border text-foreground">
            <SheetHeader className="h-16 px-6 border-b border-border flex items-center justify-start text-left">
              <SheetTitle className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {siteConfig.name[0]}
                </div>
                <span className="font-display font-bold text-lg">{siteConfig.name}</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="p-4 space-y-1">
              {[
                { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { name: "Orders", href: "/orders", icon: ShoppingCart },
                { name: "Shipments", href: "/shipments", icon: Truck },
                { name: "Disputes", href: "/disputes", icon: AlertTriangle },
                { name: "Wallet & Billing", href: "/wallet", icon: Wallet },
                { name: "Analytics", href: "/analytics", icon: BarChart3 },
                { name: "Couriers & NDR", href: "/couriers", icon: ShieldAlert },
                { name: "Settings", href: "/settings", icon: Settings },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all cursor-pointer"
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            {seller && (
              <div className="absolute bottom-0 w-full p-4 border-t border-border bg-secondary/15 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                  <AvatarFallback>{seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold">{seller.name}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{seller.businessName}</span>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Dynamic Brand Logo for Tablet/Mobile */}
        <Link href="/dashboard" className="md:hidden flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-primary flex items-center justify-center font-bold text-sm text-primary-foreground">
            {siteConfig.name[0]}
          </div>
          <span className="font-display font-semibold text-sm leading-none">{siteConfig.name}</span>
        </Link>

        {/* Premium Command Palette Trigger Button (Ctrl+K search simulation) */}
        <button
          onClick={handleSearchClick}
          className="hidden sm:flex items-center gap-2.5 h-9 w-[220px] lg:w-[280px] border border-border/80 bg-secondary/30 hover:bg-secondary/60 hover:border-border px-3 rounded-md text-xs font-medium text-muted-foreground cursor-pointer transition-all"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-left flex-1 font-sans">Search or press ⌘K</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 border border-border/60 bg-muted px-1.5 font-mono text-[9px] font-bold rounded text-muted-foreground">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls Actions */}
      <div className="flex items-center gap-3">
        {/* Search Icon Trigger on Mobile Screens */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearchClick}
          className="sm:hidden text-muted-foreground hover:text-foreground cursor-pointer"
          title="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Next-Themes Switcher */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 animate-in spin-in duration-300" />
            ) : (
              <Moon className="h-5 w-5 animate-in spin-in duration-300" />
            )}
          </Button>
        )}

        {/* Notifications Alert Center */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground cursor-pointer relative transition-colors"
              title="Notifications"
            />
          }>
            <Bell className="h-5 w-5" />
            {/* Counter Indicator badge */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px] p-2 bg-card text-foreground border border-border">
            <DropdownMenuLabel className="text-xs font-semibold px-2 py-1 flex items-center justify-between">
              <span>Operational Updates</span>
              <span className="text-[10px] text-primary">Mark all as read</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <div className="py-1.5 space-y-2">
              <div className="flex gap-2.5 p-2 hover:bg-secondary/40 rounded transition-colors text-xs cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold leading-tight text-foreground">SLA countdown Alert: AWB892019304</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Dispute Ops audit has 4 hours remaining to resolve.</p>
                </div>
              </div>
              <div className="flex gap-2.5 p-2 hover:bg-secondary/40 rounded transition-colors text-xs cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold leading-tight text-foreground">Remittance processed: REM-202611</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">₹12,480.00 credited to registered HDFC bank account.</p>
                </div>
              </div>
              <div className="flex gap-2.5 p-2 hover:bg-secondary/40 rounded transition-colors text-xs cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-muted shrink-0 mt-1" />
                <div>
                  <p className="font-medium leading-tight text-muted-foreground">Auto Weight Discrepancy logged</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Delhivery scanned +0.65kg for AWB892019325.</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Account Controls */}
        {seller && (
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <button className="flex items-center gap-1.5 p-1 rounded-full md:rounded-lg hover:bg-secondary/50 cursor-pointer focus:outline-none transition-colors" />
            }>
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {seller.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
                <span className="max-w-[80px] truncate">{seller.businessName}</span>
                <ChevronDown className="h-3 w-3 shrink-0 opacity-55" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px] p-1.5 bg-card text-foreground border border-border">
              <div className="px-2.5 py-1.5 flex flex-col">
                <span className="text-xs font-semibold text-foreground leading-none">{seller.name}</span>
                <span className="text-[10px] text-muted-foreground mt-1 truncate">{seller.email}</span>
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                onSelect={() => router.push("/settings")} 
                className="flex items-center gap-2 text-xs py-2 hover:bg-secondary cursor-pointer"
              >
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => router.push("/settings?tab=business")} 
                className="flex items-center gap-2 text-xs py-2 hover:bg-secondary cursor-pointer"
              >
                <Building className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Business Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => router.push("/wallet")} 
                className="flex items-center gap-2 text-xs py-2 hover:bg-secondary cursor-pointer"
              >
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Ledger & Wallet</span>
                <span className="ml-auto font-mono text-[9px] px-1.5 bg-primary/10 text-primary rounded-full">
                  {formatINR(seller.walletBalance).split(".")[0]}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                onSelect={() => router.push("/settings?tab=help")} 
                className="flex items-center gap-2 text-xs py-2 hover:bg-secondary cursor-pointer"
              >
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Help & SLAs Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                onSelect={handleLogout} 
                className="flex items-center gap-2 text-xs py-2 text-red-500 hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
