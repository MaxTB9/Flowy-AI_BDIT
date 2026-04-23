// SCRIPTED: deterministic mock for demo — all data hard-coded, no backend.

import type { Alert, Guest } from "../state/store";

export interface Resort {
  name: string;
  totalRooms: number;
  occupiedRooms: number;
  location: string;
}

export interface RecommendedService {
  id: string;
  name: string;
  category: "wellness" | "tour" | "dining";
  priceEur: number;
  description: string;
  durationMinutes: number;
  // SCRIPTED: deterministic mock for demo
  matchReason: string;
}

export interface DailyUsagePoint {
  day: string; // e.g. "Mon"
  date: string; // ISO
  value: number;
}

export const RESORT: Resort = {
  name: "Bahía Azul Resort",
  totalRooms: 120,
  occupiedRooms: 87,
  location: "Mallorca, Spain",
};

export const DEMO_GUEST: Guest = {
  name: "Maria Fernández",
  room: 214,
  loyaltyTier: "Gold",
};

// Maria's profile flavor (used for AI-style recommendations)
export const DEMO_GUEST_PROFILE = {
  checkedInDaysAgo: 2,
  preferences: ["wellness", "water sports"] as const,
  partySize: 2,
};

export const RECOMMENDED_SERVICES: RecommendedService[] = [
  {
    id: "svc_catamaran",
    name: "Sunset Catamaran Tour",
    category: "tour",
    priceEur: 85,
    description:
      "Two-hour sunset sail along the south coast with sparkling cava and tapas on board.",
    durationMinutes: 120,
    // SCRIPTED: deterministic mock for demo
    matchReason: "Matches your love of water sports and tonight's clear skies.",
  },
  {
    id: "svc_spa",
    name: "Spa Deep-Tissue Massage",
    category: "wellness",
    priceEur: 120,
    description:
      "60-minute deep-tissue treatment in our beachfront wellness pavilion.",
    durationMinutes: 60,
    // SCRIPTED: deterministic mock for demo
    matchReason: "Based on your wellness preference and tomorrow's free morning.",
  },
  {
    id: "svc_chef",
    name: "Chef's Table Tasting Menu",
    category: "dining",
    priceEur: 95,
    description:
      "Seven-course tasting from chef Lucía Marín, paired with local wines.",
    durationMinutes: 150,
    // SCRIPTED: deterministic mock for demo
    matchReason: "Most-loved dining experience by Gold-tier guests this season.",
  },
];

// SCRIPTED: deterministic mock for demo — open alerts seeded into ops dashboard
export const SEED_ALERTS: Omit<Alert, "id" | "createdAt">[] = [
  {
    title: "Suspected water leak",
    location: "Bungalow 42",
    severity: "high",
    guestVisible: false,
  },
  {
    title: "HVAC anomaly — temperature drift",
    location: "Wing B, floors 2–4",
    severity: "medium",
    guestVisible: false,
  },
  {
    title: "Low towel inventory",
    location: "Floor 3 housekeeping closet",
    severity: "low",
    guestVisible: false,
  },
];

// SCRIPTED: deterministic mock for demo — last 7 days
export const WATER_LAST_7_DAYS: DailyUsagePoint[] = [
  { day: "Thu", date: "2026-04-17", value: 138.4 },
  { day: "Fri", date: "2026-04-18", value: 142.1 },
  { day: "Sat", date: "2026-04-19", value: 156.8 },
  { day: "Sun", date: "2026-04-20", value: 161.2 },
  { day: "Mon", date: "2026-04-21", value: 134.7 },
  { day: "Tue", date: "2026-04-22", value: 129.9 },
  { day: "Wed", date: "2026-04-23", value: 144.3 },
];

export const ELECTRICITY_LAST_7_DAYS: DailyUsagePoint[] = [
  { day: "Thu", date: "2026-04-17", value: 2840 },
  { day: "Fri", date: "2026-04-18", value: 2965 },
  { day: "Sat", date: "2026-04-19", value: 3180 },
  { day: "Sun", date: "2026-04-20", value: 3220 },
  { day: "Mon", date: "2026-04-21", value: 2870 },
  { day: "Tue", date: "2026-04-22", value: 2790 },
  { day: "Wed", date: "2026-04-23", value: 3010 },
];

// SCRIPTED: deterministic mock for demo — KPIs at app boot
export const INITIAL_KPIS = {
  revenueToday: 18420, // €
  waterToday: WATER_LAST_7_DAYS[WATER_LAST_7_DAYS.length - 1].value,
  electricityToday: ELECTRICITY_LAST_7_DAYS[ELECTRICITY_LAST_7_DAYS.length - 1].value,
  alertsOpen: SEED_ALERTS.length,
};

// SCRIPTED: deterministic mock for demo — leak alert fired from /ops
export const LEAK_ALERT: Omit<Alert, "id" | "createdAt"> = {
  title: "Confirmed leak — water shut-off in your wing",
  location: "Wing B (your wing)",
  severity: "high",
  guestVisible: true,
};
