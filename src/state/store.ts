import { create } from "zustand";
import {
  DEMO_GUEST,
  INITIAL_KPIS,
  LEAK_ALERT,
  RECOMMENDED_SERVICES,
  SEED_ALERTS,
} from "../data/scripted";

// SCRIPTED: deterministic mock for demo — single shared in-memory store.

export type LoyaltyTier = "Silver" | "Gold" | "Platinum";

export interface Guest {
  name: string;
  room: number;
  loyaltyTier: LoyaltyTier;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  priceEur: number;
  guestName: string;
  room: number;
  createdAt: string; // ISO
}

export type CleaningRequest = "clean_now" | "skip_today" | null;

export type AlertSeverity = "low" | "medium" | "high";

export interface Alert {
  id: string;
  title: string;
  location: string;
  severity: AlertSeverity;
  createdAt: string; // ISO
  guestVisible?: boolean;
  acknowledged?: boolean;
}

export interface Kpis {
  revenueToday: number;
  waterToday: number; // m3
  electricityToday: number; // kWh
  alertsOpen: number;
}

export interface FlowyState {
  currentGuest: Guest;
  bookings: Booking[];
  cleaningRequest: CleaningRequest;
  alerts: Alert[];
  kpis: Kpis;

  bookService: (serviceId: string) => void;
  toggleCleaning: (state: CleaningRequest) => void;
  triggerLeakAlert: () => void;
  acknowledgeAlert: (id: string) => void;
}

// SCRIPTED: deterministic mock for demo — seed alerts at module load
const seededAlerts: Alert[] = SEED_ALERTS.map((a, i) => ({
  ...a,
  id: `al_seed_${i + 1}`,
  createdAt: new Date(Date.now() - (i + 1) * 60 * 60 * 1000).toISOString(),
}));

function recomputeAlertsOpen(alerts: Alert[]): number {
  return alerts.filter((a) => !a.acknowledged).length;
}

export const useFlowyStore = create<FlowyState>((set) => ({
  currentGuest: DEMO_GUEST,
  bookings: [],
  cleaningRequest: null,
  alerts: seededAlerts,
  kpis: { ...INITIAL_KPIS, alertsOpen: recomputeAlertsOpen(seededAlerts) },

  bookService: (serviceId) =>
    set((s) => {
      // SCRIPTED: deterministic mock for demo
      const svc = RECOMMENDED_SERVICES.find((x) => x.id === serviceId);
      if (!svc) return s;
      const booking: Booking = {
        id: `bk_${s.bookings.length + 1}`,
        serviceId: svc.id,
        serviceName: svc.name,
        priceEur: svc.priceEur,
        guestName: s.currentGuest.name,
        room: s.currentGuest.room,
        createdAt: new Date().toISOString(),
      };
      return {
        bookings: [...s.bookings, booking],
        kpis: {
          ...s.kpis,
          revenueToday: s.kpis.revenueToday + svc.priceEur,
        },
      };
    }),

  toggleCleaning: (state) => set({ cleaningRequest: state }),

  triggerLeakAlert: () =>
    set((s) => {
      // SCRIPTED: deterministic mock for demo — guest-visible alert
      const exists = s.alerts.some(
        (a) => a.title === LEAK_ALERT.title && !a.acknowledged
      );
      if (exists) return s;
      const alert: Alert = {
        ...LEAK_ALERT,
        id: `al_leak_${s.alerts.length + 1}`,
        createdAt: new Date().toISOString(),
      };
      const next = [alert, ...s.alerts];
      return {
        alerts: next,
        kpis: {
          ...s.kpis,
          alertsOpen: recomputeAlertsOpen(next),
          // SCRIPTED: leak triggers a small water-usage bump
          waterToday: Math.round((s.kpis.waterToday + 6.4) * 10) / 10,
        },
      };
    }),

  acknowledgeAlert: (id) =>
    set((s) => {
      const next = s.alerts.map((a) =>
        a.id === id ? { ...a, acknowledged: true } : a
      );
      return {
        alerts: next,
        kpis: { ...s.kpis, alertsOpen: recomputeAlertsOpen(next) },
      };
    }),
}));
