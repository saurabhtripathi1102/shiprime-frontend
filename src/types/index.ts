import { ShipmentStatus } from "@/components/ui/status-pill";

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  businessName: string;
  category: string;
  gstin: string;
  pan: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  trustScore: number;
  walletBalance: number;
  autoTopUp: boolean;
  autoTopUpThreshold: number;
  autoTopUpAmount: number;
}

export interface Courier {
  id: string;
  name: string;
  initials: string;
  successRate: number; // e.g. 94%
  rtoRate: number;      // e.g. 8%
  avgTatHours: number;  // e.g. 48 hours
  damageRate: number;   // e.g. 0.1%
  baseCost: number;     // flat base shipping fee
  codFee: number;       // flat COD fee or percentage
  rating: number;       // rating out of 5
  enabled: boolean;
}

export interface Order {
  id: string;
  awb?: string;
  channel: "shopify" | "woocommerce" | "magento" | "amazon" | "flipkart" | "manual";
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  deliveryAddress: string;
  deliveryPincode: string;
  deliveryCity: string;
  deliveryState: string;
  sku: string;
  packageName: string;
  declaredWeightKg: number;
  scannedWeightKg?: number;
  dimensionsCm: {
    length: number;
    width: number;
    height: number;
  };
  value: number;
  paymentMode: "cod" | "prepaid";
  status: ShipmentStatus;
  createdDate: string;
  etaDate?: string;
  shippedDate?: string;
  deliveredDate?: string;
  courierId?: string;
  shippingCost?: number;
  rtoRisk?: "low" | "medium" | "high";
}

export interface Shipment extends Order {
  awb: string;
  courierId: string;
  lastUpdate: string;
  lastLocation: string;
  milestones: {
    title: string;
    description: string;
    timestamp: string;
    location: string;
    status: ShipmentStatus;
  }[];
  pickupPhotoUrl?: string;
  weightScanPhotoUrl?: string;
}

export interface Dispute {
  id: string;
  awb: string;
  courierId: string;
  raisedDate: string;
  slaDeadline: string; // ISO string for live countdown
  status: "open" | "awaiting_evidence" | "resolved_won" | "resolved_lost";
  declaredWeightKg: number;
  scannedWeightKg: number;
  disputedAmount: number;
  reason: string;
  claimDetails: string;
  opsScorecardUrl?: string;
  evidenceImages: {
    url: string;
    timestamp: string;
    scaleId: string;
    weightKg: number;
    dimensionsCm?: string;
  }[];
  conversation: {
    id: string;
    sender: "seller" | "ops" | "system";
    senderName: string;
    senderAvatar?: string;
    message: string;
    timestamp: string;
    attachments?: { name: string; url: string; size: string }[];
  }[];
}

export interface WalletTransaction {
  id: string;
  timestamp: string;
  amount: number; // positive for top-up/COD, negative for charges
  type: "shipping" | "adjustment" | "refund" | "topup" | "cod" | "dispute_reversal" | "gst";
  awb?: string;
  reason: string;
  evidenceLink?: boolean;
  disputable?: boolean;
}

export interface CodRemittance {
  id: string;
  remittanceDate: string; // YYYY-MM-DD
  awbCount: number;
  grossAmount: number;
  deductions: number;
  netAmount: number;
  status: "pending" | "processed" | "failed";
  bankReference?: string;
}

export interface NdrCase {
  id: string;
  awb: string;
  orderId: string;
  buyerName: string;
  buyerPhone: string;
  deliveryCity: string;
  courierId: string;
  ndrDate: string;
  reason: "customer_unavailable" | "wrong_address" | "refused_delivery" | "phone_unreachable" | "delivery_rescheduled";
  attemptsCount: number;
  status: "pending" | "resolved_retry" | "resolved_rto" | "resolved_cancel";
  history: {
    timestamp: string;
    event: string;
    remarks?: string;
  }[];
}

export interface PincodePerformance {
  pincode: string;
  city: string;
  state: string;
  totalShipments: number;
  successRate: number; // percentage
  rtoRate: number;     // percentage
  avgTatDays: number;
  avgCost: number;
  rtoRiskLevel: "low" | "medium" | "high";
  recommendation: string;
}
