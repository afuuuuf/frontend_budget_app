import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { TRANSACTION_FLOW } from "@/enums";
import { useBudgets } from "@/hooks/useBudgets";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useTransactionForm } from "@/hooks/useTransactionForm";
import { getCurrentMonth } from "@/utils/timeUtil";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreateTransactionForm } from "@/components/forms/CreateTransactionForm";
import { CreateTransactionAside } from "@/components/transactions/CreateTransactionAside";

const SUBTITLES = {
  [TRANSACTION_FLOW.EXPENSE]: "Keep your money story up to date.",
  [TRANSACTION_FLOW.INCOME]: "A little more possibility for your everyday.",
};

export default function CreateTransactionPage() {
  const navigate = useNavigate();
  // A new transaction is recorded now, so it counts toward the current month's budgets.
  const { year, month } = getCurrentMonth();

  const form = useTransactionForm();
  const values = form.watch();
  const { data: budgets = [] } = useBudgets({ year, month });
  const { mutate, isPending } = useCreateTransaction();

  const goBack = () => navigate(ROUTES.transactions);

  return (
    <div className="space-y-6">
      <Link
        to={ROUTES.transactions}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to transactions
      </Link>

      <PageHeader
        title="Add transaction"
        description={SUBTITLES[values.transactionFlow]}
      />

      <CreateTransactionForm
        form={form}
        loading={isPending}
        onCancel={goBack}
        onSubmit={(formValues) => mutate(formValues, { onSuccess: goBack })}
        aside={
          <CreateTransactionAside
            values={values}
            budgets={budgets}
            year={year}
            month={month}
          />
        }
      />
    </div>
  );
}
