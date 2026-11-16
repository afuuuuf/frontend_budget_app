import { TRANSACTION_FLOW } from "@/enums";

// Tailwind classes per transaction type, shared by the table and the detail card.
export const FLOW_STYLES = {
  [TRANSACTION_FLOW.INCOME]: {
    tile: "bg-primary/10 text-primary",
    amount: "text-primary",
  },
  [TRANSACTION_FLOW.EXPENSE]: {
    tile: "bg-ivory text-slate",
    amount: "text-terracotta",
  },
};
