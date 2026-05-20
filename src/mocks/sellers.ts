import { Seller } from "@/types";

export const mockSeller: Seller = {
  id: "SEL-49821",
  name: "Vikram Malhotra",
  email: "vikram@mittistudios.com",
  phone: "+91 98450 12345",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  businessName: "Mitti Studios",
  category: "Home & Ceramics",
  gstin: "29AABCM1234Z1Z5",
  pan: "ABCPM1234K",
  address: {
    street: "12, 4th Cross Road, Koramangala 3rd Block",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560034",
  },
  trustScore: 98,
  walletBalance: 124980.50,
  autoTopUp: true,
  autoTopUpThreshold: 5000,
  autoTopUpAmount: 10000,
};
