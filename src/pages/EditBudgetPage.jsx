import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useBudgets } from "@/hooks/useBudgets";
import { useSelectedMonth } from "@/hooks/useSelectedMonth";
import { useUpdateBudget } from "@/hooks/useUpdateBudget";
import { formatMonthRange } from "@/utils/timeUtil";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { BudgetEditorForm } from "@/components/forms/BudgetEditorForm";
import { EditBudgetAside } from "@/components/budgets/EditBudgetAside";

export default function EditBudgetPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { year, month, monthValue } = useSelectedMonth();

  const { data: budgets, isPending } = useBudgets({ year, month });
  const { mutate, isPending: saving } = useUpdateBudget();

  const backTo = `${ROUTES.budgets}?month=${monthValue}`;
  const goBack = () => navigate(backTo);
  const budget = budgets?.find((b) => b.category === category);

  return (
    <div className="space-y-6">
      <Link
        to={backTo}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to budgets
      </Link>

      <div>
        <h1 className="text-[32px] font-medium leading-tight tracking-tight text-ink">
          Edit budget
        </h1>
        <p className="mt-2 text-[15px] text-slate">
          A little adjustment can make your plan work better for you.
        </p>
      </div>

      {isPending && <Skeleton className="h-[460px]" />}

      {!isPending && !budget && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            We couldn't find that budget for this month.
          </p>
          <Link
            to={backTo}
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to budgets
          </Link>
        </Card>
      )}

      {budget && (
        <BudgetEditorForm
          mode="edit"
          category={budget.category}
          defaultAmount={budget.limit.toFixed(2)}
          periodLabel={formatMonthRange(year, month)}
          year={year}
          month={month}
          loading={saving}
          onCancel={goBack}
          onSubmit={({ amount }) =>
            mutate(
              { category: budget.category, year, month, amount },
              { onSuccess: goBack },
            )
          }
          aside={() => (
            <EditBudgetAside budget={budget} year={year} month={month} />
          )}
        />
      )}
    </div>
  );
}
