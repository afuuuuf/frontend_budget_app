import { apiClient } from "@/libs/apiClient";
import { API_PATHS } from "@/constants/api";
import { GOAL_COLOR } from "@/constants/savings";
import { inferGoalIconKey } from "@/constants/goalIcons";
import { fromApiMoney, toApiMoney } from "@/utils/moneyUtil";
import { getProgress } from "@/utils/savingsUtil";
import { buildDetailPath } from "./commonService";

export function toGoal(raw) {
  const target = fromApiMoney(raw.target_amount);
  const saved = fromApiMoney(raw.current_amount);

  return {
    id: raw.id,
    name: raw.name,
    status: raw.status,
    icon: raw.icon,
    color: raw.color,
    targetDate: raw.target_date,
    target,
    saved,
    ...getProgress(saved, target),
  };
}

export function toContribution(raw) {
  return {
    id: raw.id,
    goalId: raw.goal_id,
    amount: fromApiMoney(raw.amount),
    date: raw.contributed_at,
    note: raw.note,
    createdAt: raw.created_at,
  };
}

const contributionsPath = (id) =>
  `${buildDetailPath(API_PATHS.savings, id)}/contributions`;

export const savingsService = {
  async getGoals() {
    const { data } = await apiClient.get(API_PATHS.savings);
    return data.items.map(toGoal);
  },

  async getGoal(id) {
    const { data } = await apiClient.get(
      buildDetailPath(API_PATHS.savings, id),
    );
    return toGoal(data);
  },

  // Form values in (amount in dollars); the icon comes from the name.
  async createGoal({ name, targetAmount, targetDate }) {
    const { data } = await apiClient.post(API_PATHS.savings, {
      name,
      target_amount: toApiMoney(targetAmount),
      target_date: targetDate,
      icon: inferGoalIconKey(name),
      color: GOAL_COLOR,
    });
    return toGoal(data);
  },

  // PUT replaces the whole goal, so the stored color (and icon, if the name gives no hint) are sent back.
  async updateGoal({ goal, name, targetAmount, targetDate, status }) {
    const { data } = await apiClient.put(
      buildDetailPath(API_PATHS.savings, goal.id),
      {
        name,
        target_amount: toApiMoney(targetAmount),
        target_date: targetDate,
        status,
        icon: inferGoalIconKey(name) || goal.icon,
        color: goal.color,
      },
    );
    return toGoal(data);
  },

  async deleteGoal(id) {
    await apiClient.delete(buildDetailPath(API_PATHS.savings, id));
  },

  async getContributions(goalId) {
    const { data } = await apiClient.get(contributionsPath(goalId));
    return data.items.map(toContribution);
  },

  // The API answers with the new contribution and the goal with its updated totals.
  async addContribution({ goalId, amount }) {
    const { data } = await apiClient.post(contributionsPath(goalId), {
      amount: toApiMoney(amount),
    });
    return {
      contribution: toContribution(data.contribution),
      goal: toGoal(data.goal),
    };
  },
};
