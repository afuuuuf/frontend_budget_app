import { isInMonth, toDate } from "@/utils/timeUtil";

// ratio is 0–1 and never past 1; remaining never goes below 0. Goals can end up over target
// (or have their target lowered), and the UI should still read "100% saved", "goal reached".
export function getProgress(saved, target) {
  const ratio = target > 0 ? Math.min(saved / target, 1) : 0;
  return {
    ratio,
    percent: Math.floor(ratio * 100), // floor, so 99.6% never reads as "100% saved"
    remaining: Math.max(target - saved, 0),
  };
}

export function sumContributionsInMonth(contributions, year, month) {
  return contributions
    .filter((c) => isInMonth(c.date, year, month))
    .reduce((sum, c) => sum + c.amount, 0);
}

// Newest first: the first `visibleCount` as they are, the rest rolled into one total.
export function splitContributions(contributions, visibleCount) {
  const sorted = [...contributions].sort(
    (a, b) =>
      toDate(b.date) - toDate(a.date) ||
      toDate(b.createdAt) - toDate(a.createdAt),
  );
  const earlier = sorted.slice(visibleCount);

  return {
    visible: sorted.slice(0, visibleCount),
    hasEarlier: earlier.length > 0,
    earlierTotal: earlier.reduce((sum, c) => sum + c.amount, 0),
  };
}

// Totals across every goal, whatever its status.
export function getSavingsTotals(goals) {
  return goals.reduce(
    (totals, goal) => ({
      totalSaved: totals.totalSaved + goal.saved,
      combinedTarget: totals.combinedTarget + goal.target,
    }),
    { totalSaved: 0, combinedTarget: 0 },
  );
}
