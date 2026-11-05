import {
  FiHome,
  FiZap,
  FiTag,
  FiBriefcase,
  FiHeart,
  FiFilm,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import {
  MdOutlineShoppingBasket,
  MdOutlineRestaurant,
  MdOutlineDirectionsCar,
} from "react-icons/md";

// Icons per category, matched by lowercase name. Unknown categories fall back to a tag.
const ICONS = {
  HOUSING: FiHome,
  RENT: FiHome,
  GROCERIES: MdOutlineShoppingBasket,
  DINING: MdOutlineRestaurant,
  TRANSPORT: MdOutlineDirectionsCar,
  UTILITIES: FiZap,
  FREELANCE: FiBriefcase,
  SALARY: FiBriefcase,
  HEALTH: FiHeart,
  ENTERTAINMENT: FiFilm,
  SHOPPING: FiShoppingBag,
  TRAVEL: FiTruck,
};

export function getCategoryIcon(name = "") {
  return ICONS[name.trim().toUpperCase()] ?? FiTag;
}

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
