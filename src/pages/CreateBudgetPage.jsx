import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useBudgets } from "@/hooks/useBudgets";
import { useCreateBudget } from "@/hooks/useCreateBudget";
import { getCurrentMonth, formatMonthRange } from "@/utils/timeUtil";
import { Skeleton } from "@/components/ui/Skeleton";
import { BudgetEditorForm } from "@/components/forms/BudgetEditorForm";
import { CreateBudgetAside } from "@/components/budgets/CreateBudgetAside";

export default function CreateBudgetPage() {
  const navigate = useNavigate();
  // New budgets always apply to the current month.
  const { year, month } = getCurrentMonth();

  const { data: budgets = [], isPending } = useBudgets({ year, month });
  const { mutate, isPending: saving } = useCreateBudget();

  const goBack = () => navigate(ROUTES.budgets);

  return (
    <div className="space-y-6">
      <Link
        to={ROUTES.budgets}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to budgets
      </Link>

      <div>
        <h1 className="text-[32px] font-medium leading-tight tracking-tight text-ink">
          Create budget
        </h1>
        <p className="mt-2 text-[15px] text-slate">
          Give your spending a little direction. Set a limit that works for your
          life.
        </p>
      </div>

      {isPending ? (
        <Skeleton className="h-[520px]" />
      ) : (
        <BudgetEditorForm
          mode="create"
          existingCategories={budgets.map((b) => b.category)}
          periodLabel={formatMonthRange(year, month)}
          year={year}
          month={month}
          loading={saving}
          onCancel={goBack}
          onSubmit={({ category, amount }) =>
            mutate({ category, amount }, { onSuccess: goBack })
          }
          aside={(values) => (
            <CreateBudgetAside
              values={values}
              budgets={budgets}
              year={year}
              month={month}
            />
          )}
        />
      )}
    </div>
  );
}
