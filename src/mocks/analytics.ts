import { PincodePerformance } from "@/types";
import { mockOrders } from "./orders";

// 1. Daily Volumes for the last 30 days
export interface DailyVolume {
  date: string;
  orders: number;
  delivered: number;
  rto: number;
  codValue: number;
  shippingCost: number;
}

function generateDailyVolumes(): DailyVolume[] {
  const data: DailyVolume[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const targetDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = targetDate.toISOString().split("T")[0];
    
    // Simulate daily cycles: lower volumes on Sundays (i % 7 === 0)
    const isSunday = targetDate.getDay() === 0;
    const baseOrders = isSunday ? 15 : 45 + Math.floor(Math.sin(i) * 15);
    
    const orders = Math.max(10, baseOrders + Math.floor(Math.random() * 10));
    const delivered = Math.round(orders * (0.84 + Math.random() * 0.06));
    const rto = Math.round(orders * (0.08 + Math.random() * 0.04));
    
    const codValue = delivered * 780; // Average value
    const shippingCost = orders * 62; // Average cost
    
    data.push({
      date: dateStr,
      orders,
      delivered,
      rto,
      codValue,
      shippingCost,
    });
  }
  return data;
}

export const mockDailyVolumes = generateDailyVolumes();

// 2. Top Pincodes Performance Profiles (PincodePerformance from src/types)
export const mockPincodePerformance: PincodePerformance[] = [
  {
    pincode: "560001",
    city: "Bengaluru",
    state: "Karnataka",
    totalShipments: 450,
    successRate: 97.8,
    rtoRate: 1.2,
    avgTatDays: 1.8,
    avgCost: 56,
    rtoRiskLevel: "low",
    recommendation: "Highly stable. Default to Delhivery Air / BlueDart.",
  },
  {
    pincode: "400001",
    city: "Mumbai",
    state: "Maharashtra",
    totalShipments: 380,
    successRate: 96.5,
    rtoRate: 2.1,
    avgTatDays: 2.1,
    avgCost: 58,
    rtoRiskLevel: "low",
    recommendation: "Highly stable. Prefer Air modes.",
  },
  {
    pincode: "110001",
    city: "Delhi",
    state: "Delhi",
    totalShipments: 410,
    successRate: 95.8,
    rtoRate: 2.8,
    avgTatDays: 2.0,
    avgCost: 55,
    rtoRiskLevel: "low",
    recommendation: "Highly stable. Surface routes acceptable.",
  },
  {
    pincode: "812001",
    city: "Bhagalpur",
    state: "Bihar",
    totalShipments: 120,
    successRate: 74.2,
    rtoRate: 23.5,
    avgTatDays: 5.4,
    avgCost: 68,
    rtoRiskLevel: "high",
    recommendation: "Strict COD verification. Enable IVR confirmation.",
  },
  {
    pincode: "273001",
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    totalShipments: 180,
    successRate: 79.5,
    rtoRate: 18.2,
    avgTatDays: 4.8,
    avgCost: 64,
    rtoRiskLevel: "medium",
    recommendation: "Flag high-value COD orders. Re-route via BlueDart.",
  },
  {
    pincode: "600001",
    city: "Chennai",
    state: "Tamil Nadu",
    totalShipments: 290,
    successRate: 94.8,
    rtoRate: 3.5,
    avgTatDays: 2.4,
    avgCost: 59,
    rtoRiskLevel: "low",
    recommendation: "Good performance. Standard routing.",
  },
  {
    pincode: "226001",
    city: "Lucknow",
    state: "Uttar Pradesh",
    totalShipments: 210,
    successRate: 88.0,
    rtoRate: 10.5,
    avgTatDays: 3.2,
    avgCost: 61,
    rtoRiskLevel: "medium",
    recommendation: "Verify addresses. XpressBees works best here.",
  },
];

// 3. Courier Radars (Courier performance stats for radar charts)
export interface CourierPerformanceRadar {
  name: string;
  tatScore: number;       // out of 100 (higher = faster)
  costScore: number;      // out of 100 (higher = cheaper)
  successScore: number;   // out of 100 (higher = more delivered)
  safetyScore: number;    // out of 100 (higher = fewer damages/losses)
  coverageScore: number;  // out of 100 (higher = more pin codes)
}

export const mockCourierRadars: CourierPerformanceRadar[] = [
  {
    name: "BlueDart Express",
    tatScore: 95,
    costScore: 40,
    successScore: 97,
    safetyScore: 96,
    coverageScore: 85,
  },
  {
    name: "Delhivery Air",
    tatScore: 88,
    costScore: 70,
    successScore: 94,
    safetyScore: 91,
    coverageScore: 95,
  },
  {
    name: "XpressBees Surface",
    tatScore: 65,
    costScore: 90,
    successScore: 89,
    safetyScore: 82,
    coverageScore: 90,
  },
  {
    name: "DTDC Premium",
    tatScore: 80,
    costScore: 60,
    successScore: 92,
    safetyScore: 89,
    coverageScore: 88,
  },
];

// 4. Volumetric Weight Correlation points for scatter plots
export interface WeightCorrelationPoint {
  id: string;
  declaredWeight: number;
  scannedWeight: number;
  discrepancy: number;
  costDiff: number;
  courier: string;
}

function generateWeightCorrelation(): WeightCorrelationPoint[] {
  const points: WeightCorrelationPoint[] = [];
  
  // Extract discrepant weights from mockOrders to match visual reports
  const discrepantOrders = mockOrders.filter(
    o => o.awb && o.scannedWeightKg && o.declaredWeightKg && o.scannedWeightKg > o.declaredWeightKg
  );
  
  discrepantOrders.forEach((o, idx) => {
    const declared = o.declaredWeightKg;
    const scanned = o.scannedWeightKg || declared;
    const discrepancy = Number((scanned - declared).toFixed(2));
    const costDiff = Math.round(discrepancy * 80);
    
    points.push({
      id: o.id,
      declaredWeight: declared,
      scannedWeight: scanned,
      discrepancy,
      costDiff,
      courier: o.courierId || "delhivery",
    });
  });
  
  // Add some perfect-weight points to balance the scatter plot nicely
  const normalOrders = mockOrders.filter(
    o => o.awb && o.scannedWeightKg && o.declaredWeightKg && o.scannedWeightKg === o.declaredWeightKg
  ).slice(0, 30);

  normalOrders.forEach((o, idx) => {
    points.push({
      id: o.id,
      declaredWeight: o.declaredWeightKg,
      scannedWeight: o.declaredWeightKg,
      discrepancy: 0,
      costDiff: 0,
      courier: o.courierId || "delhivery",
    });
  });

  return points;
}

export const mockWeightCorrelation = generateWeightCorrelation();
