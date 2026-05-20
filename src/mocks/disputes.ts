import { Dispute } from "@/types";

const now = new Date();

export const mockDisputes: Dispute[] = [
  {
    id: "DIS-70291",
    awb: "AWB1000259",
    courierId: "delhivery",
    raisedDate: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    slaDeadline: new Date(now.getTime() + 28 * 60 * 60 * 1000).toISOString(), // 28 hours left
    status: "open",
    declaredWeightKg: 0.35,
    scannedWeightKg: 1.85,
    disputedAmount: 245.00,
    reason: "Weight Discrepancy",
    claimDetails: "Courier claims scanned weight is 1.85 kg compared to declared weight of 0.35 kg, charging for 2.0 kg bracket. Seller disputes indicating the box is a small 12x12x10cm cardboard containing a single ceramic mug.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop",
        timestamp: "18 May 2026, 02:15 PM",
        scaleId: "SCALE-BLR-A04",
        weightKg: 1.85,
        dimensionsCm: "25 × 25 × 18 cm",
      },
      {
        url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=400&auto=format&fit=crop",
        timestamp: "18 May 2026, 02:16 PM",
        scaleId: "SCALE-BLR-A04",
        weightKg: 1.84,
      }
    ],
    conversation: [
      {
        id: "m1",
        sender: "system",
        senderName: "System Audit",
        message: "Dispute raised automatically: Weight discrepancy detected. Courier billed for 2.0 kg (scanned 1.85 kg). Seller declared 0.5 kg bracket (declared 0.35 kg). Charge adjustment: -₹245.00. 48-hour SLA countdown initiated.",
        timestamp: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "seller",
        senderName: "Vikram Malhotra (Seller)",
        message: "Hi, this shipment is for a single clay tea mug inside a small 12x12x10cm box. There is absolutely no way it weighs 1.85 kg. The photo shows another seller's large biryani pot on the conveyor scale under my AWB barcode scanner. Please review and reverse this charge.",
        timestamp: new Date(now.getTime() - 19 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m3",
        sender: "ops",
        senderName: "Rohit K. (Ops Representative)",
        message: "Hello Vikram, thanks for raising this. I am checking the scanner video logs for AWB1000259. It appears there was indeed a back-to-back sorting overlap at our hub. The photo shows another box right behind yours on the scale. I am verifying with the warehouse supervisor.",
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "DIS-70292",
    awb: "AWB1000342",
    courierId: "bluedart",
    raisedDate: new Date(now.getTime() - 40 * 60 * 60 * 1000).toISOString(), // 40 hours ago
    slaDeadline: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours left
    status: "awaiting_evidence",
    declaredWeightKg: 0.75,
    scannedWeightKg: 2.30,
    disputedAmount: 480.00,
    reason: "Volumetric Weight Discrepancy",
    claimDetails: "Courier billed based on volumetric calculations: 35x25x20cm, charging for 3.0 kg bracket. Seller disputes indicating the package is a flat envelope containing a clay water bottle, shipped in a smaller box.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1566576912321-d58ded7a214f?q=80&w=400&auto=format&fit=crop",
        timestamp: "17 May 2026, 11:22 AM",
        scaleId: "SCALE-MUM-B09",
        weightKg: 2.30,
        dimensionsCm: "35 × 25 × 20 cm",
      }
    ],
    conversation: [
      {
        id: "m1",
        sender: "system",
        senderName: "System Audit",
        message: "Dispute raised: Courier billed based on volumetric weight 3.0 kg. Seller declared 1.0 kg bracket. Charge adjustment: -₹480.00.",
        timestamp: new Date(now.getTime() - 40 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "ops",
        senderName: "Swati M. (Ops Representative)",
        message: "Hi Vikram, the scanned dimensions from the automated conveyor belt at our Mumbai Hub read 35x25x20cm. Could you please upload your warehouse packing/dimensions video or photo for our verification? We need this to push back on the courier claim.",
        timestamp: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m3",
        sender: "seller",
        senderName: "Vikram Malhotra (Seller)",
        message: "I am searching for the CCTV video of the packing desk. I will upload a screenshot showing the dimensions measured before packing shortly.",
        timestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "DIS-70293",
    awb: "AWB1000481",
    courierId: "xpressbees",
    raisedDate: new Date(now.getTime() - 46 * 60 * 60 * 1000).toISOString(), // 46 hours ago
    slaDeadline: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours left (Critical Pulse!)
    status: "open",
    declaredWeightKg: 0.90,
    scannedWeightKg: 3.40,
    disputedAmount: 310.00,
    reason: "Weight Discrepancy",
    claimDetails: "XpressBees claims scanned weight is 3.40 kg compared to declared weight of 0.90 kg.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop",
        timestamp: "17 May 2026, 09:12 AM",
        scaleId: "SCALE-DEL-E12",
        weightKg: 3.40,
        dimensionsCm: "30 × 30 × 20 cm",
      }
    ],
    conversation: [
      {
        id: "m1",
        sender: "system",
        senderName: "System Audit",
        message: "Dispute raised. XpressBees billed for 3.40 kg. Charge adjustment: -₹310.00. Urgent attention requested: 2 hours left before SLA auto-reversal.",
        timestamp: new Date(now.getTime() - 46 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "seller",
        senderName: "Vikram Malhotra (Seller)",
        message: "This is a clay water bottle that is under 1 kg. Please reverse immediately. The SLA deadline is approaching. The image clearly shows a completely different wooden package on the scale.",
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "DIS-70294",
    awb: "AWB1000104",
    courierId: "dtdc",
    raisedDate: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(),
    slaDeadline: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // breached / resolved
    status: "resolved_won",
    declaredWeightKg: 1.10,
    scannedWeightKg: 4.10,
    disputedAmount: 512.00,
    reason: "Scale Calibration Error",
    claimDetails: "DTDC claims weight is 4.10 kg. Resolved in seller's favor due to scale calibration overlap at Bengaluru Premium Hub.",
    evidenceImages: [],
    conversation: [
      {
        id: "m1",
        sender: "system",
        senderName: "System Audit",
        message: "Dispute resolved successfully. Charge of ₹512.00 reversed to seller wallet balance. Reason: Verified Scale Calibration Glitch at Hub.",
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: "DIS-70295",
    awb: "AWB1000125",
    courierId: "ecom_express",
    raisedDate: new Date(now.getTime() - 96 * 60 * 60 * 1000).toISOString(),
    slaDeadline: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
    status: "resolved_lost",
    declaredWeightKg: 0.75,
    scannedWeightKg: 1.50,
    disputedAmount: 110.00,
    reason: "Weight Discrepancy",
    claimDetails: "Dispute rejected. Scanned photo and video logs confirm actual package weight was 1.50 kg due to double wrapping and heavy ceramic padding.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=400&auto=format&fit=crop",
        timestamp: "15 May 2026, 04:30 PM",
        scaleId: "SCALE-HYD-C03",
        weightKg: 1.50,
      }
    ],
    conversation: [
      {
        id: "m1",
        sender: "ops",
        senderName: "Neha S. (Ops Representative)",
        message: "We have reviewed the scale photo. The packaging is clearly double-wrapped with bubble wrap and cardboard inserts. The scale is calibrated. The dispute is rejected.",
        timestamp: new Date(now.getTime() - 50 * 60 * 60 * 1000).toISOString(),
      }
    ]
  }
];

// Dynamically generate the remaining 7 disputes to round out the 12 required
for (let i = 6; i <= 12; i++) {
  const isWon = i % 2 === 0;
  const status = isWon ? "resolved_won" : "resolved_lost";
  
  mockDisputes.push({
    id: `DIS-7029${i}`,
    awb: `AWB1000${600 + i}`,
    courierId: i % 3 === 0 ? "bluedart" : i % 3 === 1 ? "delhivery" : "xpressbees",
    raisedDate: new Date(now.getTime() - (i * 24 + 10) * 60 * 60 * 1000).toISOString(),
    slaDeadline: new Date(now.getTime() - (i * 24 - 38) * 60 * 60 * 1000).toISOString(),
    status,
    declaredWeightKg: 0.50,
    scannedWeightKg: 1.20,
    disputedAmount: 120.00 + i * 15,
    reason: "Weight Discrepancy",
    claimDetails: `Auto-generated dispute case #${i}. Disputed charge of ${120.00 + i * 15} Rupees for weight discrepancy.`,
    evidenceImages: [],
    conversation: [
      {
        id: "sys",
        sender: "system",
        senderName: "System Audit",
        message: `Dispute case closed. Status: ${status === "resolved_won" ? "Resolved Won (Reversed)" : "Resolved Lost (Charged)"}.`,
        timestamp: new Date(now.getTime() - (i * 24 - 38) * 60 * 60 * 1000).toISOString(),
      }
    ]
  });
}
