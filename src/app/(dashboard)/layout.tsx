"use client";

import * as React from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CommandPalette } from "@/components/command-palette";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
      {/* 1. Collapsible Sidebar (Left Panel) */}
      <Sidebar />

      {/* 2. Content Container (Right Panel) */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        {/* Sticky blurred top header */}
        <Header />

        {/* Dynamic page main content view */}
        <main className="flex-1 overflow-y-auto min-w-0 bg-background/30 p-4 sm:p-6 md:p-8 scrollbar-none">
          <div className="mx-auto max-w-7xl h-full flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>

      {/* 3. Global Floating Command Palette modal (triggered by Ctrl+K) */}
      <CommandPalette />
    </div>
  );
}
