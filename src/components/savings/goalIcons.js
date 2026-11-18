import { FiBook, FiGift, FiHome } from "react-icons/fi";
import { LuCar, LuPlane, LuShieldCheck } from "react-icons/lu";
import { GOAL_ICON } from "@/constants/goalIcons";
import { SeedlingIcon } from "@/components/ui/SeedlingIcon";

const GOAL_ICONS = {
  [GOAL_ICON.HOME]: FiHome,
  [GOAL_ICON.SHIELD]: LuShieldCheck,
  [GOAL_ICON.PLANE]: LuPlane,
  [GOAL_ICON.CAR]: LuCar,
  [GOAL_ICON.BOOK]: FiBook,
  [GOAL_ICON.GIFT]: FiGift,
};

// An unknown or empty key falls back to the seedling.
export const getGoalIcon = (key) => GOAL_ICONS[key] ?? SeedlingIcon;
