// ─────────────────────────────────────────────
//  tokens.js  — shared design tokens & helpers
//  Import this in every Savoney component
// ─────────────────────────────────────────────

export const PALETTE = {
  hero:        "#E8EDFF",
  heroDark:    "#C7D2FF",
  primary:     "#4361EE",
  primaryDark: "#2845D4",
  secondary:   "#06C886",
  accent:      "#F97316",
  error:       "#EF4444",
  surface:     "#FFFFFF",
  bg:          "#F5F7FF",
  border:      "#E4E8FF",
  textPrimary: "#0F172A",
  textMuted:   "#64748B",
  textLight:   "#94A3B8",
};

export const DONUT_STROKES = ["#4361EE", "#06C886", "#F97316", "#EF4444", "#A855F7"];

export const CATEGORY_COLORS = [
  { bg: "#EEF0FF", text: PALETTE.primary },
  { bg: "#E6FFF5", text: "#059669" },
  { bg: "#FFF4E6", text: PALETTE.accent },
  { bg: "#FEE2E2", text: PALETTE.error },
  { bg: "#F0FFF4", text: "#16A34A" },
];

/** Format a number as Indian Rupee without decimals */
export const fmtINR = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** Return an emoji icon for a budget/expense category name */
export const getCategoryIcon = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("grocer") || cat.includes("food") || cat.includes("shop") || cat.includes("market")) return "🛒";
  if (cat.includes("trans") || cat.includes("travel") || cat.includes("car") || cat.includes("auto") || cat.includes("cab")) return "🚗";
  if (cat.includes("enter") || cat.includes("movi") || cat.includes("play") || cat.includes("fun") || cat.includes("show")) return "🎬";
  if (cat.includes("util") || cat.includes("bill") || cat.includes("elec") || cat.includes("water") || cat.includes("power")) return "⚡";
  if (cat.includes("sal") || cat.includes("work") || cat.includes("pay")) return "💳";
  return "📋";
};