import { 
  Seller, 
  Courier, 
  Order, 
  Shipment, 
  Dispute, 
  WalletTransaction, 
  CodRemittance, 
  NdrCase, 
  PincodePerformance 
} from "@/types";

// Import all mocks
import { mockSeller } from "@/mocks/sellers";
import { mockCouriers } from "@/mocks/couriers";
import { mockOrders, mockShipments } from "@/mocks/orders";
import { mockDisputes } from "@/mocks/disputes";
import { mockWalletTransactions } from "@/mocks/walletTransactions";
import { mockCodRemittances } from "@/mocks/codRemittances";
import { mockNdrCases } from "@/mocks/ndrs";
import { 
  mockDailyVolumes, 
  mockPincodePerformance, 
  mockCourierRadars, 
  mockWeightCorrelation,
  DailyVolume,
  CourierPerformanceRadar,
  WeightCorrelationPoint
} from "@/mocks/analytics";

// Helper to simulate a network delay
const delay = (ms?: number) => {
  const time = ms || Math.floor(Math.random() * 400) + 200; // 200ms - 600ms delay
  return new Promise(resolve => setTimeout(resolve, time));
};

// --- READ APIs ---

export async function getSeller(): Promise<Seller> {
  await delay();
  return { ...mockSeller };
}

export async function getCouriers(): Promise<Courier[]> {
  await delay();
  return [...mockCouriers];
}

export async function getOrders(): Promise<Order[]> {
  await delay();
  return [...mockOrders];
}

export async function getShipments(): Promise<Shipment[]> {
  await delay();
  return [...mockShipments];
}

export async function getDisputes(): Promise<Dispute[]> {
  await delay();
  return [...mockDisputes];
}

export async function getDisputeById(id: string): Promise<Dispute | undefined> {
  await delay();
  const dispute = mockDisputes.find(d => d.id === id);
  return dispute ? { ...dispute } : undefined;
}

export async function getWalletTransactions(): Promise<WalletTransaction[]> {
  await delay();
  return [...mockWalletTransactions];
}

export async function getCodRemittances(): Promise<CodRemittance[]> {
  await delay();
  return [...mockCodRemittances];
}

export async function getNdrCases(): Promise<NdrCase[]> {
  await delay();
  return [...mockNdrCases];
}

// --- ANALYTICS APIs ---

export async function getAnalyticsDailyVolumes(): Promise<DailyVolume[]> {
  await delay();
  return [...mockDailyVolumes];
}

export async function getAnalyticsPincodePerformance(): Promise<PincodePerformance[]> {
  await delay();
  return [...mockPincodePerformance];
}

export async function getAnalyticsCourierRadars(): Promise<CourierPerformanceRadar[]> {
  await delay();
  return [...mockCourierRadars];
}

export async function getAnalyticsWeightCorrelation(): Promise<WeightCorrelationPoint[]> {
  await delay();
  return [...mockWeightCorrelation];
}

// --- MUTATION/WRITE APIs (Simulating persistent state modifications) ---

// Toggle courier status (enabled/disabled)
export async function toggleCourierEnabled(id: string): Promise<Courier> {
  await delay(300);
  const courier = mockCouriers.find(c => c.id === id);
  if (!courier) throw new Error("Courier not found");
  courier.enabled = !courier.enabled;
  return { ...courier };
}

// Resolve an NDR failed-delivery case
export async function resolveNdrCase(
  id: string, 
  action: "retry" | "rto" | "cancel", 
  remarks: string
): Promise<NdrCase> {
  await delay(400);
  const ndrCase = mockNdrCases.find(n => n.id === id);
  if (!ndrCase) throw new Error("NDR Case not found");
  
  const statusMap: Record<string, NdrCase["status"]> = {
    retry: "resolved_retry",
    rto: "resolved_rto",
    cancel: "resolved_cancel"
  };
  
  ndrCase.status = statusMap[action];
  ndrCase.history.push({
    timestamp: new Date().toISOString(),
    event: `Resolved as: ${action.toUpperCase()}`,
    remarks: remarks || "Resolution selected by seller via dashboard."
  });
  
  // Find associated order and update status if necessary
  const order = mockOrders.find(o => o.id === ndrCase.orderId);
  if (order) {
    if (action === "retry") {
      order.status = "in_transit";
    } else if (action === "rto") {
      order.status = "rto_initiated";
    }
  }

  return { ...ndrCase };
}

// Post a message in a dispute conversation
export async function addDisputeMessage(
  disputeId: string, 
  message: string, 
  sender: "seller" | "ops" | "system",
  senderName = "Seller Agent"
): Promise<Dispute> {
  await delay(300);
  const dispute = mockDisputes.find(d => d.id === disputeId);
  if (!dispute) throw new Error("Dispute case not found");

  const newMessage = {
    id: `MSG-${Date.now()}`,
    sender,
    senderName,
    senderAvatar: sender === "seller" ? mockSeller.avatarUrl : undefined,
    message,
    timestamp: new Date().toISOString()
  };

  dispute.conversation.push(newMessage);
  return { ...dispute };
}

// Submit seller evidence for a weight dispute
export async function submitDisputeEvidence(
  disputeId: string,
  weightKg: number,
  imageUrl: string,
  dimensions?: string
): Promise<Dispute> {
  await delay(500);
  const dispute = mockDisputes.find(d => d.id === disputeId);
  if (!dispute) throw new Error("Dispute case not found");

  // Add the image to the evidence list
  dispute.evidenceImages.push({
    url: imageUrl,
    timestamp: new Date().toISOString(),
    scaleId: `SCALE-${Math.floor(100 + Math.random() * 900)}`,
    weightKg,
    dimensionsCm: dimensions
  });

  // Shift status to show action
  dispute.status = "open";
  
  // Add a system event in the thread
  dispute.conversation.push({
    id: `MSG-SYS-${Date.now()}`,
    sender: "system",
    senderName: "System Audit",
    message: `Seller uploaded a new package scan/weight validation photo (${weightKg} kg). Case status returned to Active review.`,
    timestamp: new Date().toISOString()
  });

  return { ...dispute };
}

// Auto wallet topup configuration update
export async function updateWalletSettings(
  autoTopUp: boolean, 
  threshold: number, 
  amount: number
): Promise<Seller> {
  await delay(300);
  mockSeller.autoTopUp = autoTopUp;
  mockSeller.autoTopUpThreshold = threshold;
  mockSeller.autoTopUpAmount = amount;
  return { ...mockSeller };
}
