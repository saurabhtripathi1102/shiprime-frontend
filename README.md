# Shiprime Frontend

> The shipping platform that never silently deducts from your wallet.

Shiprime (formerly ShipTrust) is a next-generation Indian e-commerce shipping aggregator frontend built to compete on transparency, fair billing, rapid dispute resolution, and seller-first economics.

This application is built as a complete, production-quality, dark-first React frontend with Next.js App Router, Tailwind CSS v4, shadcn/ui, TanStack Table, Recharts, and TanStack Query.

---

## ⚡ Key Features

- **Branding-Driven Architecture:** Dynamically updates name, logos, and support info throughout the application via a single configuration file (`src/config/site.ts`).
- **Dark-First Seller Dashboard:** Harmonious high-contrast dark layout styled specifically for professional D2C sellers.
- **48-Hour Dispute SLA Management:** Prominent live SLA countdowns, warehouse photo evidence carousels, and Slack-style ops messaging.
- **Transparent Wallet Ledger:** Every single transaction fully documented with plain-English reasons (no "miscellaneous" charges).
- **COD Remittance Calendar:** A calendar grid showing upcoming D+2 bank transfers and D+0 options.
- **Deep Analytics:** Cost-per-delivered-order scatter plots, RTO heatmap tables, and courier rating matrices.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router, strict TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base-Nova style with custom CSS variables)
- **Icons:** lucide-react
- **Charts:** Recharts
- **State Management:** Zustand (client state) + TanStack Query (server state cache)
- **Forms:** react-hook-form + zod
- **Tables:** TanStack Table v8
- **Date Utilities:** date-fns

---

## 📁 Directory Structure

```
/src
  /app                    Next.js App Router pages
  /components
    /ui                   shadcn primitive UI components
    /layout               Shell, collapsible sidebar, topbar
    /dashboard            KPIs, charts, action items
    /shipments            Shipment tracking lists, progress maps
    /disputes             Dispute cards, evidence carousel, ops feed
    /billing              Wallet ledger, COD calendar
    /analytics            RTO heatmaps, scatter plots
  /mocks                  Authentic Indian static data layer
  /lib                    Core formatters, simulated API (TanStack Query)
  /hooks                  Custom hooks
  /types                  Strict TypeScript interfaces
  /stores                 Zustand global stores
  /config                 Global site & branding settings (site.ts)
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run production build

```bash
npm run build
npm run start
```

---

## 🎨 Global Customization

To rename this application or change the support links globally, simply modify `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: "Shiprime",
  slogan: "The shipping platform that never silently deducts from your wallet.",
  // ...
};
```
Changing these properties will dynamically update page headers, footers, public buyer tracking pages, page title metadata, and support cards throughout the entire application.
