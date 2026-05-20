"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { useUiStore } from "@/stores/uiStore";
import { getOrders } from "@/lib/api";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Truck, 
  AlertTriangle, 
  Wallet, 
  BarChart3, 
  ShieldAlert, 
  Settings,
  Sun,
  Moon,
  Laptop,
  Coins,
  Phone,
  ArrowRight,
  Package
} from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUiStore();
  
  // Fetch mock orders so users can search through live AWBs/Buyers in the command palette!
  const { data: orders } = useQuery({
    queryKey: ["orders-command"],
    queryFn: getOrders,
  });

  // Toggle open/close with keyboard listener
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = React.useCallback(
    (action: () => void) => {
      setCommandPaletteOpen(false);
      action();
    },
    [setCommandPaletteOpen]
  );

  return (
    <CommandDialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      title="Search Shiprime Commands"
      description="Quickly navigate or search live shipping AWBs"
      className="bg-card text-foreground border border-border"
    >
      <CommandInput placeholder="Search orders, AWBs, buyers, or settings..." />
      <CommandList className="max-h-[350px]">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Navigation Group */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Go to Dashboard</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/orders"))}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>View Orders & Manifests</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/shipments"))}>
            <Truck className="mr-2 h-4 w-4" />
            <span>Track Live Shipments</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/disputes"))}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>Disputes & Weight Audits</span>
            <CommandShortcut>⌘X</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/wallet"))}>
            <Wallet className="mr-2 h-4 w-4" />
            <span>Wallet, Ledger & Remittances</span>
            <CommandShortcut>⌘W</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Advanced Shipping Analytics</span>
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/couriers"))}>
            <ShieldAlert className="mr-2 h-4 w-4" />
            <span>Couriers Channels & NDR</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Account & Shopify Integrations</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Dynamic AWB/Buyer Search Group (displays top matching orders) */}
        {orders && orders.length > 0 && (
          <>
            <CommandGroup heading="Live Shipments / Orders">
              {orders.slice(0, 5).map((order) => (
                <CommandItem
                  key={order.id}
                  value={`${order.id} ${order.awb} ${order.buyerName}`}
                  onSelect={() => runCommand(() => {
                    if (order.awb) {
                      router.push(`/orders?search=${order.awb}`);
                      toast.success(`Locating shipment details for AWB ${order.awb}`);
                    } else {
                      router.push(`/orders?search=${order.id}`);
                      toast.success(`Locating order draft ${order.id}`);
                    }
                  })}
                >
                  <Package className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs leading-none">
                      {order.buyerName} ({order.deliveryCity})
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground mt-1">
                      {order.id} {order.awb ? `• AWB ${order.awb}` : "• Draft Label"} • {order.packageName}
                    </span>
                  </div>
                  <ArrowRight className="ml-auto h-3 w-3 opacity-30 group-data-selected:opacity-100 transition-opacity" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Quick System Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => {
            toast.info("Opening Razorpay Secure UPI Topup portal...");
            router.push("/wallet?topup=true");
          })}>
            <Coins className="mr-2 h-4 w-4 text-amber-500" />
            <span>Recharge Wallet (UPI / Netbanking)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {
            window.location.href = `mailto:${siteConfig.supportEmail}`;
            toast.success(`Opening mail client to ${siteConfig.supportEmail}`);
          })}>
            <Phone className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Contact Shiprime Enterprise Ops</span>
            <CommandShortcut className="font-sans font-medium text-[10px]">
              {siteConfig.supportPhone}
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Theme Preferences */}
        <CommandGroup heading="Appearance Settings">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Switch to Light Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Switch to Sleek Dark Theme (Recommended)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>Sync with System Preferences</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
