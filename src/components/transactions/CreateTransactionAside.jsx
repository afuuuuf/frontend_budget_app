import { FiArrowDownLeft } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getCategoryIcon, INCOME_CATEGORIES } from "@/constants/categories";
import { TRANSACTION_FLOW } from "@/enums";
import { formatCurrency, parseMoneyInput } from "@/utils/moneyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { getBudgetStatus } from "@/utils/mathUtil";
import { formatMonthName, formatMonthYear } from "@/utils/timeUtil";

const money = (amount, options) =>
  formatCurrency(amount, { decimals: "auto", ...options });

const listFormat = new Intl.ListFormat("en-GB", { type: "conjunction" });

function BudgetImpactCard({ budget, amount, year, month }) {
  const { ratio, status, remaining } = getBudgetStatus(budget);
  const label = formatEnumLabel(budget.category);
  const Icon = getCategoryIcon(budget.category);
  const remainingAfter = remaining - amount;

  return (
    <Card>
      <div className="flex items-center gap-3">
        <Icon aria-hidden="true" size={20} className="text-primary" />
        <h2 className="text-xl font-medium text-ink">{label} budget</h2>
      </div>
      <p className="mt-4 text-sm text-slate">
        Monthly · {formatMonthYear(year, month)}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-ink">Spent so far</span>
        <span className="font-semibold text-ink">
          {money(budget.spent)} of {money(budget.limit)}
        </span>
      </div>
      <div className="mt-3">
        <ProgressBar ratio={ratio} status={status} label={`${label} budget used`} />
      </div>

      <dl className="mt-5 divide-y divide-mist border-t border-mist text-sm [&>div]:flex [&>div]:justify-between [&>div]:py-3">
        <div>
          <dt className="text-slate">This expense</dt>
          <dd className="font-semibold text-terracotta">{money(-amount)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Remaining after adding</dt>
          <dd
            className={`font-semibold ${remainingAfter < 0 ? "text-terracotta" : "text-ink"}`}
          >
            {money(remainingAfter)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

function ExpenseAside({ category, amount, budgets, year, month }) {
  const budget = budgets.find((b) => b.category === category);
  const label = formatEnumLabel(category);

  return budget ? (
    <>
      <BudgetImpactCard
        budget={budget}
        amount={amount}
        year={year}
        month={month}
      />
      <Callout>
        This will count toward your {label} budget. Savings transfers belong
        under Savings → Add money.
      </Callout>
    </>
  ) : (
    <Callout>
      You don't have a {label} budget for {formatMonthName(year, month)}, so
      this won't count toward one. It still counts in your totals.
    </Callout>
  );
}

function IncomeAside({ amount }) {
  const categories = listFormat.format(
    INCOME_CATEGORIES.map((category) => formatEnumLabel(category)),
  );

  return (
    <>
      <section className="rounded-2xl bg-primary/10 p-6">
        <FiArrowDownLeft aria-hidden="true" size={20} className="text-primary" />
        <h2 className="mt-8 text-2xl font-medium leading-snug text-ink">
          Income to your everyday
        </h2>
        <p className="mt-3 text-[15px] text-slate">
          This adds to your income and available balance. It won't use any of
          your spending budgets.
        </p>
        <dl className="mt-6 flex justify-between border-t border-primary/15 pt-4 text-sm">
          <dt className="text-ink">New income</dt>
          <dd className="font-semibold text-primary">
            {money(amount, { signed: true })}
          </dd>
        </dl>
      </section>
      <Callout>
        Categories change with transaction type. Only {categories} are
        available for income.
      </Callout>
    </>
  );
}

// The preview column next to the create form. `values` are the live form values.
export function CreateTransactionAside({ values, budgets, year, month }) {
  const amount = parseMoneyInput(values.amount);

  return (
    <>
      {values.transactionFlow === TRANSACTION_FLOW.INCOME ? (
        <IncomeAside amount={amount} />
      ) : (
        <ExpenseAside
          category={values.category}
          amount={amount}
          budgets={budgets}
          year={year}
          month={month}
        />
      )}
      <p className="text-[13px] text-slate">
        Not saved yet. Your totals update when you add it.
      </p>
    </>
  );
}
