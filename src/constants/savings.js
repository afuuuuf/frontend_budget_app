import { SAVINGS_STATUS } from "@/enums";

// The API stores a color per goal, but the design doesn't use one yet: every goal gets the brand teal.
export const GOAL_COLOR = "#12665B";

export const GOAL_NAME_MAX_LENGTH = 60;

// The goal page lists this many latest contributions; older ones roll into one "Before …" row.
export const VISIBLE_CONTRIBUTIONS = 3;

export const STATUS_OPTIONS = [
  { value: SAVINGS_STATUS.ACTIVE, label: "Active" },
  { value: SAVINGS_STATUS.ON_HOLD, label: "On hold" },
];
