export const siteConfig = {
  name: "Shiprime",
  slogan: "The shipping platform that never silently deducts from your wallet.",
  description: "A complete, production-quality React frontend for a next-generation Indian e-commerce shipping aggregator. Win on fair billing, 48-hour dispute SLAs, and fast D+2 remittances.",
  company: "Shiprime Technologies Pvt Ltd",
  supportEmail: "support@shiprime.com",
  supportPhone: "+91 80 6900 6900",
  urls: {
    dashboard: "/dashboard",
    pricing: "/pricing",
    login: "/login",
    signup: "/signup",
    tracking: (awb: string) => `/track/${awb}`,
  },
  features: {
    disputeSlaHours: 48,
    codRemittanceDays: "D+2",
  }
};

export type SiteConfig = typeof siteConfig;
