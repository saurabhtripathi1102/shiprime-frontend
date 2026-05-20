import { CodRemittance } from "@/types";

// Let's generate 30 high-fidelity COD remittance entries spanning the last 30 days
function generateCodRemittances(): CodRemittance[] {
  const remittances: CodRemittance[] = [];
  const baseDate = new Date();
  
  // A helper to generate realistic numbers based on date index
  const seedMultiplier = (i: number) => {
    return 1 + (Math.sin(i) * 0.15); // subtle oscillation
  };

  for (let i = 1; i <= 30; i++) {
    const targetDate = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = targetDate.toISOString().split("T")[0]; // YYYY-MM-DD
    
    const countMult = seedMultiplier(i);
    const awbCount = Math.floor(5 + countMult * 6); // 5 to 11 AWBs per batch
    
    // Values averaging ~850 INR per order
    const grossAmount = Math.round(awbCount * 850 * seedMultiplier(i + 2)); 
    
    // Deductions: Shipping charges and COD fees (approx 8-12% of gross)
    const deductions = Math.round(grossAmount * (0.09 + (i % 4) * 0.01));
    const netAmount = grossAmount - deductions;
    
    let status: "pending" | "processed" | "failed" = "processed";
    let bankReference: string | undefined = `UTR${Math.floor(100000000000 + i * 9283720491)}`;
    
    if (i === 1) {
      status = "pending";
      bankReference = undefined;
    } else if (i === 2) {
      status = "pending";
      bankReference = undefined;
    } else if (i === 12) {
      // Create one failed remittance due to a bank server error, which adds flavor to the billing history
      status = "failed";
      bankReference = undefined;
    }

    remittances.push({
      id: `REM-${202600 + i}`,
      remittanceDate: dateStr,
      awbCount,
      grossAmount,
      deductions,
      netAmount,
      status,
      bankReference
    });
  }
  
  return remittances;
}

export const mockCodRemittances: CodRemittance[] = generateCodRemittances();
