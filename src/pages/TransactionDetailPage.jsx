import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useTransaction } from "@/hooks/useTransaction";
import { useSelectedMonth } from "@/hooks/useSelectedMonth";
import { getErrorMessage } from "@/utils/errorMessageUtil";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { TransactionDetailCard } from "@/components/transactions/TransactionDetailCard";
import { DeleteTransactionDialog } from "@/components/transactions/DeleteTransactionDialog";

export default function TransactionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { monthValue } = useSelectedMonth();
  const { data: transaction, isPending, isError, error } = useTransaction(id);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const backTo = `${ROUTES.transactions}?month=${monthValue}`;

  return (
    <div className="space-y-6">
      <Link
        to={backTo}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to transactions
      </Link>

      <PageHeader
        title="Transaction details"
        description="Review it, or delete it if it was a mistake."
      />

      {isPending && <Skeleton className="h-[420px] max-w-2xl" />}

      {isError && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(error, "We couldn't find that transaction.")}
          </p>
          <Link
            to={backTo}
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to transactions
          </Link>
        </Card>
      )}

      {transaction && (
        <>
          <TransactionDetailCard
            transaction={transaction}
            onDelete={() => setConfirmingDelete(true)}
          />
          <DeleteTransactionDialog
            transaction={confirmingDelete ? transaction : null}
            onClose={() => setConfirmingDelete(false)}
            onDeleted={() => navigate(backTo, { replace: true })}
          />
        </>
      )}
    </div>
  );
}
