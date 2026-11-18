// The API stores an icon *key* per goal. The designs show an icon that matches the goal
// ("Home deposit" → house), so we pick the key from words in the name when the goal is saved.
// The key → component map lives in components/savings/goalIcons.js.
export const GOAL_ICON = {
  HOME: "home",
  SHIELD: "shield",
  PLANE: "plane",
  CAR: "car",
  BOOK: "book",
  GIFT: "gift",
};

const RULES = [
  [GOAL_ICON.HOME, /home|house|apartment|deposit|renovat/],
  [GOAL_ICON.SHIELD, /emergency|rainy|safety|buffer/],
  [GOAL_ICON.PLANE, /trip|travel|vacation|holiday|flight|japan|adventure/],
  [GOAL_ICON.CAR, /\bcar\b|vehicle|motorbike|bike/],
  [GOAL_ICON.BOOK, /school|tuition|study|course|education|degree/],
  [GOAL_ICON.GIFT, /gift|wedding|birthday|anniversary/],
];

// "Japan adventure" → "plane". Returns "" when nothing matches (the UI shows the seedling).
export function inferGoalIconKey(name = "") {
  const text = name.toLowerCase();
  return RULES.find(([, pattern]) => pattern.test(text))?.[0] ?? "";
}
