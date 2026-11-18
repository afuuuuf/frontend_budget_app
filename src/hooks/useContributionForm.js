import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contributionSchema } from "@/schemas/savingsSchemas";

// The page owns the form so the "after this transfer" preview can follow the typed amount.
export function useContributionForm() {
  return useForm({
    resolver: zodResolver(contributionSchema),
    defaultValues: { amount: "" },
  });
}
