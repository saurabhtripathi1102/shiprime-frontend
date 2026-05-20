import { Order, Shipment } from "@/types";
import { ShipmentStatus } from "@/components/ui/status-pill";

// Static pools for generating 150 realistic Indian e-commerce orders
const PRODUCTS = [
  { sku: "CER-MUG-01", name: "Ceramic Coffee Mug (Mitti Glaze)", value: 499, weight: 0.35, length: 12, width: 12, height: 10 },
  { sku: "CLY-POT-03", name: "Traditional Clay Biryani Pot", value: 1299, weight: 1.80, length: 25, width: 25, height: 18 },
  { sku: "CER-BWL-02", name: "Hand-painted Ceramic Salad Bowl", value: 899, weight: 0.75, length: 20, width: 20, height: 8 },
  { sku: "CLY-BTL-01", name: "Clay Water Bottle (Natural Terracotta)", value: 599, weight: 0.90, length: 10, width: 10, height: 28 },
  { sku: "STN-PST-04", name: "Stone Mortar & Pestle Set", value: 1499, weight: 3.20, length: 18, width: 18, height: 12 },
  { sku: "CER-VAS-09", name: "Minimalist Terracotta Flower Vase", value: 1199, weight: 1.10, length: 15, width: 15, height: 24 },
];

const BUYERS = [
  { name: "Rohan Gupta", phone: "+91 98765 43210", email: "rohan@gmail.com" },
  { name: "Priya Sharma", phone: "+91 91234 56789", email: "priya.sharma@yahoo.co.in" },
  { name: "Aravind Nair", phone: "+91 98450 98765", email: "aravindn@outlook.com" },
  { name: "Sunita Rao", phone: "+91 97865 12345", email: "sunita.rao@hotmail.com" },
  { name: "Karan Johar", phone: "+91 99000 88888", email: "karan.j@karanjohar.com" },
  { name: "Sneha Kulkarni", phone: "+91 96112 34567", email: "sneha.k@rediffmail.com" },
  { name: "Aditya Sen", phone: "+91 98300 12345", email: "aditya.sen@gmail.com" },
  { name: "Meera Iyer", phone: "+91 94440 56789", email: "meera.iyer@gmail.com" },
  { name: "Kabir Bedi", phone: "+91 98200 45678", email: "kabir.bedi@outlook.com" },
  { name: "Ananya Hegde", phone: "+91 94800 11223", email: "ananya.h@gmail.com" },
  { name: "Rajesh Patel", phone: "+91 98250 55667", email: "rajesh.patel@gmail.com" },
  { name: "Vivek Joshi", phone: "+91 98100 22334", email: "vivek.joshi@gmail.com" },
  { name: "Pooja Hegde", phone: "+91 90080 99000", email: "pooja@mittistudios.com" },
  { name: "Siddharth Malhotra", phone: "+91 98311 44556", email: "sidm@gmail.com" },
  { name: "Tanvi Shah", phone: "+91 98922 66778", email: "tanvi.shah@gmail.com" },
];

const LOCATIONS = [
  { city: "Mumbai", state: "Maharashtra", pincode: "400001", address: "Apt 402, Sea Green Apartments, Worli" },
  { city: "Pune", state: "Maharashtra", pincode: "411001", address: "14/2, Shivajinagar, Near Shimla Office" },
  { city: "Delhi", state: "Delhi", pincode: "110001", address: "Flat 12B, Connaught Place, Inner Circle" },
  { city: "Gorakhpur", state: "Uttar Pradesh", pincode: "273001", address: "Mohalla Betiahata, Near Golghar" },
  { city: "Lucknow", state: "Uttar Pradesh", pincode: "226001", address: "24, Hazratganj Main Market Road" },
  { city: "Jaipur", state: "Rajasthan", pincode: "302001", address: "B-89, C-Scheme, Subhash Marg" },
  { city: "Bengaluru", state: "Karnataka", pincode: "560001", address: "18, MG Road, Landmark Residency" },
  { city: "Coimbatore", state: "Tamil Nadu", pincode: "641001", address: "402, Avinashi Road, Peelamedu" },
  { city: "Chennai", state: "Tamil Nadu", pincode: "600001", address: "12, George Town, Near Harbour Gate" },
  { city: "Hyderabad", state: "Telangana", pincode: "500001", address: "3-4-12, Koti, Landmark Square" },
  { city: "Bhagalpur", state: "Bihar", pincode: "812001", address: "Station Road, Near Sujangunj Market" },
  { city: "Patna", state: "Bihar", pincode: "800001", address: "10, Fraser Road, Exhibition Square" },
  { city: "Bhopal", state: "Madhya Pradesh", pincode: "462001", address: "Flat 12, Arera Colony, Link Road 1" },
  { city: "Ahmedabad", state: "Gujarat", pincode: "380001", address: "404, Ashram Road, Near Riverfront" },
  { city: "Kolkata", state: "West Bengal", pincode: "700001", address: "12, Park Street, Landmark Court" },
];

const CHANNELS = ["shopify", "shopify", "woocommerce", "amazon", "manual"] as const;
const COURIERS = ["delhivery", "bluedart", "xpressbees", "dtdc", "ecom_express", "amazon_shipping"] as const;

// Deterministic random generation for realistic mock sets
function seedRandom(seed: number) {
  const mask = 0xffffffff;
  let m_w = (123456789 + seed) & mask;
  let m_z = (987654321 - seed) & mask;
  
  return function() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    return result / 4294967296;
  };
}

export function generateMockOrders(count = 150): Order[] {
  const random = seedRandom(42); // Seed to guarantee stability across loads
  const orders: Order[] = [];
  
  const now = new Date();
  
  for (let i = 1; i <= count; i++) {
    const pIndex = Math.floor(random() * PRODUCTS.length);
    const bIndex = Math.floor(random() * BUYERS.length);
    const lIndex = Math.floor(random() * LOCATIONS.length);
    const cIndex = Math.floor(random() * CHANNELS.length);
    const crIndex = Math.floor(random() * COURIERS.length);
    
    const product = PRODUCTS[pIndex];
    const buyer = BUYERS[bIndex];
    const location = LOCATIONS[lIndex];
    
    const orderId = `ODR-${100000 + i}`;
    
    // Status distribution: ~70% delivered, ~15% in transit, ~10% RTO, rest new/cancelled/lost/damaged
    let status: ShipmentStatus = "delivered";
    const roll = random();
    if (roll < 0.05) {
      status = "new";
    } else if (roll < 0.10) {
      status = "label_generated";
    } else if (roll < 0.15) {
      status = "picked";
    } else if (roll < 0.23) {
      status = "in_transit";
    } else if (roll < 0.27) {
      status = "out_for_delivery";
    } else if (roll < 0.85) {
      status = "delivered";
    } else if (roll < 0.90) {
      status = "rto_initiated";
    } else if (roll < 0.96) {
      status = "rto_delivered";
    } else if (roll < 0.98) {
      status = "lost";
    } else {
      status = "damaged";
    }
    
    // Dates calculation
    const daysAgo = Math.floor(random() * 30);
    const orderDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - Math.floor(random() * 12) * 60 * 60 * 1000);
    const orderDateStr = orderDate.toISOString();
    
    let shippedDateStr: string | undefined;
    let deliveredDateStr: string | undefined;
    let etaDateStr: string | undefined;
    
    if (status !== "new") {
      const shipDate = new Date(orderDate.getTime() + (12 + Math.floor(random() * 24)) * 60 * 60 * 1000);
      shippedDateStr = shipDate.toISOString();
      
      const eta = new Date(shipDate.getTime() + (24 + Math.floor(random() * 48)) * 60 * 60 * 1000);
      etaDateStr = eta.toISOString();
      
      if (status === "delivered" || status === "rto_delivered") {
        const delDate = new Date(shipDate.getTime() + (24 + Math.floor(random() * 40)) * 60 * 60 * 1000);
        deliveredDateStr = delDate.toISOString();
      }
    }

    const courierId = COURIERS[crIndex];
    const baseCost = courierId === "bluedart" ? 98 : courierId === "delhivery" ? 54 : 45;
    const shippingCost = Math.round(baseCost + product.weight * 12);
    
    const paymentMode = random() < 0.65 ? "cod" : "prepaid";
    
    // High RTO risk flag for certain pincodes and cod combinations (specifically Tier-3 cod)
    const isTier3 = ["812001", "273001", "800001"].includes(location.pincode);
    const rtoRisk = (isTier3 && paymentMode === "cod") ? "high" : (isTier3 || paymentMode === "cod") ? "medium" : "low";

    const hasAwb = status !== "new";
    const awb = hasAwb ? `AWB${Math.floor(892019283 + i * 102919)}` : undefined;

    // Simulate scanned discrepancies in weight
    const scannedWeightKg = (hasAwb && random() < 0.15) 
      ? Number((product.weight + 0.5 + random() * 1.5).toFixed(2)) 
      : product.weight;

    orders.push({
      id: orderId,
      awb,
      channel: CHANNELS[cIndex],
      buyerName: buyer.name,
      buyerPhone: buyer.phone,
      buyerEmail: buyer.email,
      deliveryAddress: location.address,
      deliveryPincode: location.pincode,
      deliveryCity: location.city,
      deliveryState: location.state,
      sku: product.sku,
      packageName: product.name,
      declaredWeightKg: product.weight,
      scannedWeightKg,
      dimensionsCm: {
        length: product.length,
        width: product.width,
        height: product.height,
      },
      value: product.value,
      paymentMode,
      status,
      createdDate: orderDateStr,
      etaDate: etaDateStr,
      shippedDate: shippedDateStr,
      deliveredDate: deliveredDateStr,
      courierId: hasAwb ? courierId : undefined,
      shippingCost: hasAwb ? shippingCost : undefined,
      rtoRisk,
    });
  }
  
  return orders;
}

export function generateMockShipments(orders: Order[]): Shipment[] {
  const shipments: Shipment[] = [];
  
  orders.forEach((o) => {
    if (!o.awb || !o.courierId) return;

    const milestones = [
      {
        title: "Manifest Created",
        description: "Seller generated the label and manifest.",
        timestamp: o.createdDate,
        location: "Bengaluru, KA",
        status: "label_generated" as ShipmentStatus,
      }
    ];

    if (o.shippedDate) {
      milestones.push({
        title: "Picked Up",
        description: "Package was handed over to courier representative.",
        timestamp: o.shippedDate,
        location: "Bengaluru, KA",
        status: "picked" as ShipmentStatus,
      });

      milestones.push({
        title: "Package In Transit",
        description: "Arrived at primary distribution hub.",
        timestamp: new Date(new Date(o.shippedDate).getTime() + 6 * 60 * 60 * 1000).toISOString(),
        location: "Bengaluru Hub, KA",
        status: "in_transit" as ShipmentStatus,
      });
    }

    if (o.status === "delivered" && o.deliveredDate) {
      milestones.push({
        title: "Out for Delivery",
        description: "Delivery executive is out with the package.",
        timestamp: new Date(new Date(o.deliveredDate).getTime() - 4 * 60 * 60 * 1000).toISOString(),
        location: `${o.deliveryCity}, ${o.deliveryState}`,
        status: "out_for_delivery" as ShipmentStatus,
      });

      milestones.push({
        title: "Package Delivered",
        description: "Delivered successfully. Signature verified.",
        timestamp: o.deliveredDate,
        location: `${o.deliveryCity}, ${o.deliveryState}`,
        status: "delivered" as ShipmentStatus,
      });
    } else if ((o.status === "rto_initiated" || o.status === "rto_delivered") && o.shippedDate) {
      milestones.push({
        title: "Delivery Failed",
        description: "Attempt 1 failed: Customer refused delivery.",
        timestamp: new Date(new Date(o.shippedDate).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        location: `${o.deliveryCity}, ${o.deliveryState}`,
        status: "rto_initiated" as ShipmentStatus,
      });

      milestones.push({
        title: "RTO Initiated",
        description: "Return to Origin process has been initiated.",
        timestamp: new Date(new Date(o.shippedDate).getTime() + 28 * 60 * 60 * 1000).toISOString(),
        location: `${o.deliveryCity}, ${o.deliveryState}`,
        status: "rto_initiated" as ShipmentStatus,
      });

      if (o.status === "rto_delivered" && o.deliveredDate) {
        milestones.push({
          title: "RTO Delivered",
          description: "Package returned and delivered back to seller.",
          timestamp: o.deliveredDate,
          location: "Bengaluru, KA",
          status: "rto_delivered" as ShipmentStatus,
        });
      }
    }

    const lastLocation = milestones[milestones.length - 1]?.location || "Bengaluru, KA";
    const lastUpdate = milestones[milestones.length - 1]?.timestamp || o.createdDate;

    shipments.push({
      ...o,
      awb: o.awb,
      courierId: o.courierId,
      lastUpdate,
      lastLocation,
      milestones,
      pickupPhotoUrl: "https://images.unsplash.com/photo-1566576912321-d58ded7a214f?q=80&w=400&auto=format&fit=crop",
      weightScanPhotoUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop",
    });
  });

  return shipments;
}

export const mockOrders: Order[] = generateMockOrders();
export const mockShipments: Shipment[] = generateMockShipments(mockOrders);
