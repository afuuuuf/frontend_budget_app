import {
  FiHome,
  FiZap,
  FiTag,
  FiBriefcase,
  FiHeart,
  FiFilm,
  FiShoppingBag,
  FiTruck,
  FiBook,
  FiTrendingUp,
  FiPlusCircle,
} from "react-icons/fi";
import {
  MdOutlineShoppingBasket,
  MdOutlineRestaurant,
  MdOutlineDirectionsCar,
} from "react-icons/md";
import { toEnumKey } from "@/utils/enumUtil";
import { CATEGORY, TRANSACTION_FLOW } from "@/enums";

// Icons per category, matched by lowercase name. Unknown categories fall back to a tag.
const ICONS = {
  [CATEGORY.BILLS]: FiZap,
  [CATEGORY.DINING]: MdOutlineRestaurant,
  [CATEGORY.EDUCATION]: FiBook,
  [CATEGORY.ENTERTAINMENT]: FiFilm,
  [CATEGORY.FOOD]: MdOutlineRestaurant,
  [CATEGORY.FREELANCE]: FiBriefcase,
  [CATEGORY.GROCERIES]: MdOutlineShoppingBasket,
  [CATEGORY.HEALTH]: FiHeart,
  [CATEGORY.HOUSING]: FiHome,
  [CATEGORY.INVESTMENTS]: FiTrendingUp,
  [CATEGORY.OTHER_INCOME]: FiPlusCircle,
  [CATEGORY.RENT]: FiHome,
  [CATEGORY.SALARY]: FiBriefcase,
  [CATEGORY.SHOPPING]: FiShoppingBag,
  [CATEGORY.TRANSPORT]: MdOutlineDirectionsCar,
  [CATEGORY.TRAVEL]: FiTruck,
  [CATEGORY.UTILITIES]: FiZap,
};

export function getCategoryIcon(name = "") {
  return ICONS[toEnumKey(name)] ?? FiTag;
}

// Expense categories offered when creating a budget, in the order the design lists them.
// FREELANCE and SALARY are income; FOOD, RENT and BILLS overlap Groceries/Dining, Housing and
// Utilities, so they stay out of the picker (add them here if you want them back).
export const BUDGET_CATEGORIES = [
  CATEGORY.DINING,
  CATEGORY.EDUCATION,
  CATEGORY.ENTERTAINMENT,
  CATEGORY.GROCERIES,
  CATEGORY.HEALTH,
  CATEGORY.HOUSING,
  CATEGORY.SHOPPING,
  CATEGORY.TRANSPORT,
  CATEGORY.TRAVEL,
  CATEGORY.UTILITIES,
  CATEGORY.OTHERS,
];

// Expenses reuse the budget categories, so every expense lands in a budget category.
export const EXPENSE_CATEGORIES = BUDGET_CATEGORIES;
export const INCOME_CATEGORIES = [
  CATEGORY.SALARY,
  CATEGORY.FREELANCE,
  CATEGORY.INVESTMENTS,
  CATEGORY.OTHER_INCOME,
];

// Every category that exists, for the list's Category filter. Broader than what the form
// offers, so older transactions (like FOOD or RENT) can still be found.
export const ALL_CATEGORIES = Object.values(CATEGORY);

// The category list the transaction form offers for each type.
export const CATEGORIES_BY_FLOW = {
  [TRANSACTION_FLOW.EXPENSE]: EXPENSE_CATEGORIES,
  [TRANSACTION_FLOW.INCOME]: INCOME_CATEGORIES,
};

// Donut segment colors, in order, taken from the palette plus two supporting tones.
export const CHART_COLORS = [
  "#12665B",
  "#7FA397",
  "#B44737",
  "#C9D6CF",
  "#657570",
  "#946200",
  "#B9D07A",
];

// Segment color by position, so the donut and its legend always match.
export function getSegmentColor(index) {
  return CHART_COLORS[index % CHART_COLORS.length];
}
