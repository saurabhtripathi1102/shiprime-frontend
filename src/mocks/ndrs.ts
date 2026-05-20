import { NdrCase } from "@/types";
import { mockOrders } from "./orders";

// Helper to find specific orders to associate with NDR cases for data consistency
function generateNdrCases(): NdrCase[] {
  const ndrCases: NdrCase[] = [];
  
  // We'll filter for orders that are RTO or still in transit to generate high-fidelity connections
  const targetOrders = mockOrders.filter(
    o => o.awb && ["rto_initiated", "rto_delivered", "in_transit", "out_for_delivery"].includes(o.status)
  ).slice(0, 18);
  
  // Static pool of comments and action histories for failed attempts
  const NDR_REASONS = [
    "customer_unavailable",
    "wrong_address",
    "refused_delivery",
    "phone_unreachable",
    "delivery_rescheduled"
  ] as const;

  const REMARKS = {
    customer_unavailable: "Door locked / customer out of town. Tried calling but no response.",
    wrong_address: "Pincode mismatch or street address incomplete. Couldn't locate premises.",
    refused_delivery: "Customer rejected packet. Stated 'Did not order this' or 'Price too high'.",
    phone_unreachable: "Buyer's phone was switched off / out of coverage during delivery attempt.",
    delivery_rescheduled: "Customer requested delivery on a weekend / holiday instead."
  };

  targetOrders.forEach((order, idx) => {
    const reason = NDR_REASONS[idx % NDR_REASONS.length];
    const attemptsCount = (idx % 3) + 1; // 1 to 3 attempts
    
    let status: NdrCase["status"] = "pending";
    if (idx % 4 === 1) status = "resolved_retry";
    else if (idx % 4 === 2) status = "resolved_rto";
    else if (idx % 4 === 3) status = "resolved_cancel";

    const ndrDate = order.shippedDate 
      ? new Date(new Date(order.shippedDate).getTime() + 24 * 60 * 60 * 1000).toISOString()
      : new Date(new Date(order.createdDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

    const history: NdrCase["history"] = [
      {
        timestamp: ndrDate,
        event: "First Delivery Attempt Failed",
        remarks: REMARKS[reason]
      }
    ];

    if (attemptsCount >= 2) {
      const secondAttemptDate = new Date(new Date(ndrDate).getTime() + 24 * 60 * 60 * 1000).toISOString();
      history.push({
        timestamp: secondAttemptDate,
        event: "Second Delivery Attempt Failed",
        remarks: "Call made to customer: 'Will receive tomorrow' - but found door still locked."
      });
    }

    if (status === "resolved_retry") {
      history.push({
        timestamp: new Date(new Date(ndrDate).getTime() + 6 * 60 * 60 * 1000).toISOString(),
        event: "Seller Requested Re-attempt",
        remarks: "Seller uploaded proof of buyer confirmation via WhatsApp. Requested re-delivery."
      });
    } else if (status === "resolved_rto") {
      history.push({
        timestamp: new Date(new Date(ndrDate).getTime() + 12 * 60 * 60 * 1000).toISOString(),
        event: "RTO Initiated",
        remarks: "Return to Origin approved since client explicitly refused order twice."
      });
    } else if (status === "resolved_cancel") {
      history.push({
        timestamp: new Date(new Date(ndrDate).getTime() + 4 * 60 * 60 * 1000).toISOString(),
        event: "Order Cancelled by Seller",
        remarks: "Seller opted to cancel dispatch due to fraudulent customer profile check."
      });
    }

    ndrCases.push({
      id: `NDR-${99000 + idx}`,
      awb: order.awb || `AWB8290${1029 + idx}`,
      orderId: order.id,
      buyerName: order.buyerName,
      buyerPhone: order.buyerPhone,
      deliveryCity: order.deliveryCity,
      courierId: order.courierId || "delhivery",
      ndrDate,
      reason,
      attemptsCount,
      status,
      history: history.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    });
  });

  return ndrCases;
}

export const mockNdrCases: NdrCase[] = generateNdrCases();
