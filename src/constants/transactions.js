import { TRANSACTION_FLOW } from "@/enums";

// Shown in the "Transaction type" toggle and the list's Type filter, in the design's order.
export const FLOW_OPTIONS = [
  { value: TRANSACTION_FLOW.INCOME, label: "Income" },
  { value: TRANSACTION_FLOW.EXPENSE, label: "Expense" },
];

// "" means "no filter" for each field.
export const DEFAULT_FILTERS = { search: "", category: "", flow: "" };

// Assumed limit; match it to the description column on the backend.
export const DESCRIPTION_MAX_LENGTH = 100;
