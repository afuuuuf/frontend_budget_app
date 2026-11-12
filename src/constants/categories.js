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
} from "react-icons/fi";
import {
  MdOutlineShoppingBasket,
  MdOutlineRestaurant,
  MdOutlineDirectionsCar,
} from "react-icons/md";
import { toEnumKey } from "@/utils/enumUtil";
import { CATEGORY } from "@/enums";

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
  CATEGORY.HOUSING,
  CATEGORY.GROCERIES,
  CATEGORY.DINING,
  CATEGORY.TRANSPORT,
  CATEGORY.UTILITIES,
  CATEGORY.HEALTH,
  CATEGORY.SHOPPING,
  CATEGORY.ENTERTAINMENT,
  CATEGORY.EDUCATION,
  CATEGORY.TRAVEL,
  CATEGORY.OTHERS,
];

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
