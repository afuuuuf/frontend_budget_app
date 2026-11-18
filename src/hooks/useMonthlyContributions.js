import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { savingsService } from "@/services/savingsService";
import { queryKeys } from "@/constants/queryKeys";
import { sumContributionsInMonth } from "@/utils/savingsUtil";

// How much was added to each goal in a month, and in total. The API only lists contributions
// per goal, so this asks for each goal's list (cached under the same key as the goal page)
// and adds up the month here. A list that fails counts as 0 rather than breaking the page.
// Pass the same `goals` array between renders so `combine` stays stable.
export function useMonthlyContributions(goals, year, month) {
  const combine = useCallback(
    (results) => {
      const byGoal = {};
      results.forEach((result, index) => {
        byGoal[goals[index].id] = sumContributionsInMonth(
          result.data ?? [],
          year,
          month,
        );
      });

      return {
        isPending: results.some((result) => result.isPending),
        byGoal,
        total: Object.values(byGoal).reduce((sum, amount) => sum + amount, 0),
      };
    },
    [goals, year, month],
  );

  return useQueries({
    queries: goals.map((goal) => ({
      queryKey: queryKeys.contributions(goal.id),
      queryFn: () => savingsService.getContributions(goal.id),
    })),
    combine,
  });
}
