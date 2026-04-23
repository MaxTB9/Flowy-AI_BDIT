// SCRIPTED: deterministic mock for demo — extra ops-side fixtures.

import type { LoyaltyTier } from "../state/store";

export interface DemoGuestRow {
  id: string;
  name: string;
  room: number;
  loyaltyTier: LoyaltyTier;
  checkInDays: number;
  preferences: string[];
  spend: number;
}

export const DEMO_GUEST_ROWS: DemoGuestRow[] = [
  {
    id: "g_maria",
    name: "Maria Fernández",
    room: 214,
    loyaltyTier: "Gold",
    checkInDays: 2,
    preferences: ["wellness", "water sports"],
    spend: 0,
  },
  {
    id: "g_oliver",
    name: "Oliver Schmidt",
    room: 308,
    loyaltyTier: "Platinum",
    checkInDays: 5,
    preferences: ["fine dining", "golf"],
    spend: 480,
  },
  {
    id: "g_yuki",
    name: "Yuki Tanaka",
    room: 117,
    loyaltyTier: "Silver",
    checkInDays: 1,
    preferences: ["spa", "yoga"],
    spend: 95,
  },
  {
    id: "g_chloe",
    name: "Chloé Martin",
    room: 422,
    loyaltyTier: "Gold",
    checkInDays: 3,
    preferences: ["family activities", "kids club"],
    spend: 220,
  },
  {
    id: "g_amir",
    name: "Amir Hossain",
    room: 233,
    loyaltyTier: "Silver",
    checkInDays: 4,
    preferences: ["water sports", "tours"],
    spend: 165,
  },
];

export interface MaintenanceItem {
  id: string;
  asset: string;
  prediction: string;
  confidence: number; // 0..1
  etaDays: number;
}

export const PREDICTIVE_MAINTENANCE: MaintenanceItem[] = [
  {
    id: "m1",
    asset: "Pool pump #2",
    prediction: "Bearing wear — schedule service",
    confidence: 0.92,
    etaDays: 7,
  },
  {
    id: "m2",
    asset: "Chiller plant — Wing B",
    prediction: "Refrigerant leak likely",
    confidence: 0.78,
    etaDays: 14,
  },
  {
    id: "m3",
    asset: "Restaurant dishwasher",
    prediction: "Heating element degrading",
    confidence: 0.64,
    etaDays: 21,
  },
];

export interface ZoneSeries {
  zone: string;
  data: number[]; // 7 values
}

export const WATER_BY_ZONE: ZoneSeries[] = [
  { zone: "Pool & spa", data: [42, 44, 51, 53, 41, 39, 46] },
  { zone: "Bungalows", data: [58, 60, 64, 67, 56, 55, 60] },
  { zone: "Kitchens", data: [38, 38, 41, 41, 37, 35, 38] },
];

export const ELECTRICITY_BY_ZONE: ZoneSeries[] = [
  { zone: "HVAC", data: [1240, 1310, 1420, 1450, 1260, 1230, 1330] },
  { zone: "Kitchens", data: [820, 850, 920, 930, 830, 800, 870] },
  { zone: "Lighting", data: [780, 805, 840, 840, 780, 760, 810] },
];

export interface FunnelStage {
  name: string;
  value: number;
  fill: string;
}

export const REVENUE_FUNNEL: FunnelStage[] = [
  { name: "Recommendation impressions", value: 1240, fill: "#0B3B5C" },
  { name: "Card taps", value: 386, fill: "#1E5A82" },
  { name: "Booking views", value: 184, fill: "#3D7BA5" },
  { name: "Bookings completed", value: 73, fill: "#C9A36A" },
];

export interface ChannelBookings {
  channel: string;
  inside: number;
  external: number;
}

export const CHANNEL_BOOKINGS: ChannelBookings[] = [
  { channel: "Tours", inside: 28, external: 14 },
  { channel: "Dining", inside: 41, external: 9 },
  { channel: "Spa", inside: 33, external: 5 },
  { channel: "Transfers", inside: 12, external: 22 },
];

export interface TopService {
  name: string;
  bookings: number;
  revenue: number;
}

export const BASE_TOP_SERVICES: TopService[] = [
  { name: "Spa Deep-Tissue Massage", bookings: 14, revenue: 1680 },
  { name: "Sunset Catamaran Tour", bookings: 11, revenue: 935 },
  { name: "Chef's Table Tasting Menu", bookings: 9, revenue: 855 },
  { name: "Paella Cooking Class", bookings: 7, revenue: 350 },
];
