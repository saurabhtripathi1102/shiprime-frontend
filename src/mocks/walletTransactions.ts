import { WalletTransaction } from "@/types";
import { mockOrders } from "./orders";
import { mockDisputes } from "./disputes";

// Let's create a solid list of wallet transactions deterministically
function generateWalletTransactions(): WalletTransaction[] {
  const transactions: WalletTransaction[] = [];
  
  // 1. Add some initial balance via top-ups
  const topups = [
    { id: "TXN-10001", timestamp: "2026-04-20T10:00:00Z", amount: 10000, type: "topup" as const, reason: "Wallet top-up via UPI (HDFC Bank)" },
    { id: "TXN-10015", timestamp: "2026-04-25T14:30:00Z", amount: 15000, type: "topup" as const, reason: "Wallet top-up via Netbanking (ICICI)" },
    { id: "TXN-10030", timestamp: "2026-05-02T11:15:00Z", amount: 20000, type: "topup" as const, reason: "Wallet top-up via Razorpay Auto-Topup" },
    { id: "TXN-10052", timestamp: "2026-05-10T18:45:00Z", amount: 25000, type: "topup" as const, reason: "Wallet top-up via Razorpay Auto-Topup" },
    { id: "TXN-10071", timestamp: "2026-05-15T09:00:00Z", amount: 30000, type: "topup" as const, reason: "Wallet top-up via UPI (GPay)" },
  ];
  
  transactions.push(...topups);

  // 2. Generate shipping charges and GST for the first 50 orders that have AWBs
  const shippedOrders = mockOrders.filter(o => o.awb && o.shippingCost).slice(0, 55);
  
  shippedOrders.forEach((order, idx) => {
    const shippingTxnId = `TXN-SHP-${20000 + idx}`;
    const gstTxnId = `TXN-GST-${20000 + idx}`;
    
    // Shipping charge (negative)
    const shipCost = order.shippingCost || 65;
    const shipTimestamp = order.shippedDate 
      ? new Date(new Date(order.shippedDate).getTime() + 2 * 60 * 60 * 1000).toISOString()
      : new Date(new Date(order.createdDate).getTime() + 12 * 60 * 60 * 1000).toISOString();
      
    transactions.push({
      id: shippingTxnId,
      timestamp: shipTimestamp,
      amount: -shipCost,
      type: "shipping",
      awb: order.awb,
      reason: `Shipping charges for AWB ${order.awb} (${order.deliveryCity} - ${order.packageName})`,
      disputable: false
    });
    
    // GST 18% on shipping charges (negative)
    const gstCost = Number((shipCost * 0.18).toFixed(2));
    transactions.push({
      id: gstTxnId,
      timestamp: new Date(new Date(shipTimestamp).getTime() + 60 * 1000).toISOString(),
      amount: -gstCost,
      type: "gst",
      awb: order.awb,
      reason: `18% CGST + SGST on shipping charges for AWB ${order.awb}`,
      disputable: false
    });

    // 3. If there is a weight discrepancy, let's create a weight adjustment charge (negative)
    if (order.scannedWeightKg && order.declaredWeightKg && order.scannedWeightKg > order.declaredWeightKg && idx % 3 === 0) {
      const adjTxnId = `TXN-ADJ-${30000 + idx}`;
      const excessWeight = Number((order.scannedWeightKg - order.declaredWeightKg).toFixed(2));
      const adjAmount = Math.round(excessWeight * 80); // e.g. 80 INR per kg diff
      const adjTimestamp = new Date(new Date(shipTimestamp).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(); // 3 days later
      
      transactions.push({
        id: adjTxnId,
        timestamp: adjTimestamp,
        amount: -adjAmount,
        type: "adjustment",
        awb: order.awb,
        reason: `Auto Weight discrepancy charge: Declared ${order.declaredWeightKg}kg vs Scanned ${order.scannedWeightKg}kg (+${excessWeight}kg)`,
        evidenceLink: true,
        disputable: true
      });
    }

    // 4. If COD, add a COD remittance payout (positive)
    if (order.status === "delivered" && order.paymentMode === "cod" && idx % 4 === 0) {
      const codTxnId = `TXN-COD-${40000 + idx}`;
      const codTimestamp = order.deliveredDate 
        ? new Date(new Date(order.deliveredDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString() // D+2 Payout
        : new Date(new Date(order.createdDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString();
        
      transactions.push({
        id: codTxnId,
        timestamp: codTimestamp,
        amount: order.value,
        type: "cod",
        awb: order.awb,
        reason: `COD Remittance payout for AWB ${order.awb}`,
        disputable: false
      });
    }
  });

  // 5. Tie in resolved disputes from disputes.ts to dispute reversals (positive)
  const resolvedDisputes = mockDisputes.filter(d => d.status === "resolved_won");
  resolvedDisputes.forEach((dispute, idx) => {
    const revTxnId = `TXN-REV-${50000 + idx}`;
    const revTimestamp = new Date(new Date(dispute.raisedDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();
    
    transactions.push({
      id: revTxnId,
      timestamp: revTimestamp,
      amount: dispute.disputedAmount,
      type: "dispute_reversal",
      awb: dispute.awb,
      reason: `Dispute Won Reversal: Excess weight surcharge credited back for AWB ${dispute.awb}`,
      disputable: false
    });
  });

  // 6. Add a few isolated refunds
  transactions.push({
    id: "TXN-REF-90001",
    timestamp: "2026-05-12T16:20:00Z",
    amount: 154,
    type: "refund",
    awb: "AWB892099304",
    reason: "Courier Delay SLA Breach Penalty refund for AWB AWB892099304",
    disputable: false
  });
  transactions.push({
    id: "TXN-REF-90002",
    timestamp: "2026-05-18T10:10:00Z",
    amount: 45,
    type: "refund",
    awb: "AWB892110291",
    reason: "Lost-in-Transit cargo compensation refund for AWB AWB892110291",
    disputable: false
  });

  // Sort chronologically by timestamp (most recent first for standard ledgers)
  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const mockWalletTransactions: WalletTransaction[] = generateWalletTransactions();
