import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Formats a number to Indian Rupees (INR) format (e.g., ₹1,23,456.78)
 */
export function formatINR(value: number): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

/**
 * Formats a number to standard Indian numbering grouping
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

/**
 * Formats a date to standard display format (e.g., 20 May 2026, 09:45 AM)
 */
export function formatDate(date: Date | string | number, pattern = "dd MMM yyyy, hh:mm a"): string {
  const d = typeof date === "string" ? parseISO(date) : new Date(date);
  return format(d, pattern);
}

/**
 * Formats a date to relative time format (e.g., "3 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const d = typeof date === "string" ? parseISO(date) : new Date(date);
  return `${formatDistanceToNow(d)} ago`;
}

/**
 * Formats a weight in kilograms to JetBrains Mono display standard (e.g., "0.85 kg")
 */
export function formatWeight(weightKg: number): string {
  return `${weightKg.toFixed(2)} kg`;
}

/**
 * Formats volumetric dimensions to display standard (e.g., "15 × 10 × 5 cm")
 */
export function formatDimensions(lengthCm: number, widthCm: number, heightCm: number): string {
  return `${lengthCm} × ${widthCm} × ${heightCm} cm`;
}
