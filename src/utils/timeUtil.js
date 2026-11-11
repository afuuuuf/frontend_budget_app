import { DEFAULT_LOCALE } from "@/constants/app";

const YYYY_MM_DD_REGEX = /^\d{4}-\d{2}-\d{2}$/; // e.g. 2026-11-04
const YYYY_MM_REGEX = /^(\d{4})-(0[1-9]|1[0-2])$/; // e.g. 2026-11
const fmt = (options) => new Intl.DateTimeFormat(DEFAULT_LOCALE, options);

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Accepts 'YYYY-MM-DD' (treated as a local calendar date, not UTC) or a full ISO timestamp.
export function toDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === "string" && YYYY_MM_DD_REGEX.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(value);
}

export const formatLongDate = (date) =>
  fmt({ weekday: "long", month: "long", day: "numeric" }).format(toDate(date));

export const formatShortDate = (date) =>
  fmt({ month: "short", day: "numeric" }).format(toDate(date));

export const formatMonthName = (year, month) =>
  fmt({ month: "long" }).format(new Date(year, month - 1, 1));

export const formatMonthYear = (year, month) =>
  fmt({ month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));

export function getCurrentMonth(now = new Date()) {
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

// <input type="month"> uses 'YYYY-MM'.
export function toMonthValue(year, month) {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function parseMonthValue(value) {
  const match = YYYY_MM_REGEX.exec(value ?? "");
  return match ? { year: Number(match[1]), month: Number(match[2]) } : null;
}

// "November 1–4" for the month in progress, "November 1–30" for any other month.
export function formatPeriodRange(year, month, now = new Date()) {
  const isCurrent = now.getFullYear() === year && now.getMonth() + 1 === month;
  const endDay = isCurrent ? now.getDate() : new Date(year, month, 0).getDate();
  return `${formatMonthName(year, month)} 1–${endDay}`;
}

export function getMonthEnum(month) {
  return new Date(2000, month - 1, 1)
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();
}
