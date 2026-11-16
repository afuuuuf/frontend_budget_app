import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { DEFAULT_FILTERS } from "@/constants/transactions";
import { useTransactions } from "@/hooks/useTransactions";
import { useSelectedMonth } from "@/hooks/useSelectedMonth";
import { getErrorMessage } from "@/utils/errorMessageUtil";
import { formatMonthName, formatPeriodRange } from "@/utils/timeUtil";
import { filterTransactions } from "@/utils/transactionUtil";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { MonthPicker } from "@/components/dashboard/MonthPicker";
import { TransactionSummary } from "@/components/transactions/TransactionSummary";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionListFooter } from "@/components/transactions/TransactionListFooter";

// Stays 0 until the backend has savings goals to move money into.
const SAVINGS_TRANSFERS = 0;

export default function TransactionsPage() {
  const { year, month, monthValue, setMonthValue } = useSelectedMonth();
  const { data, isPending, isError, error, refetch } = useTransactions({
    year,
    month,
  });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // The summary and the footer count the whole month; only the table follows the filters.
  const visible = useMemo(
    () => (data ? filterTransactions(data, filters) : []),
    [data, filters],
  );

  const updateFilters = (changes) =>
    setFilters((current) => ({ ...current, ...changes }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Every little move, in one place"
      >
        <MonthPicker year={year} month={month} onChange={setMonthValue} />
        <LinkButton to={ROUTES.transactionNew} icon={FiPlus}>
          Add transaction
        </LinkButton>
      </PageHeader>

      {isPending && (
        <div
          role="status"
          aria-label="Loading your transactions"
          className="space-y-6"
        >
          <Skeleton className="h-[131px]" />
          <Skeleton className="h-[560px]" />
        </div>
      )}

      {isError && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(error, "We couldn't load your transactions.")}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-xl border border-mist px-4 py-2 text-sm font-medium text-primary hover:bg-ivory"
          >
            Try again
          </button>
        </Card>
      )}

      {data && data.length === 0 && (
        <Card className="text-center">
          <h2 className="text-xl font-medium text-ink">
            No transactions in {formatMonthName(year, month)} yet
          </h2>
          <p className="mt-2 text-slate">
            Add an expense or income and it will show up here.
          </p>
          <LinkButton
            to={ROUTES.transactionNew}
            icon={FiPlus}
            className="mt-5"
          >
            Add transaction
          </LinkButton>
        </Card>
      )}

      {data && data.length > 0 && (
        <>
          <TransactionSummary
            transactions={data}
            year={year}
            month={month}
            savingsTransfers={SAVINGS_TRANSFERS}
          />

          <section className="overflow-hidden rounded-2xl border border-mist bg-surface">
            <TransactionFilters filters={filters} onChange={updateFilters} />

            {visible.length > 0 ? (
              <TransactionTable transactions={visible} monthValue={monthValue} />
            ) : (
              <div className="border-t border-mist px-6 py-12 text-center">
                <p className="text-ink">No transactions match your filters.</p>
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-3 text-sm font-semibold text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            <TransactionListFooter
              shown={visible.length}
              total={data.length}
              periodLabel={`${formatPeriodRange(year, month)}, ${year}`}
              savingsTransfers={SAVINGS_TRANSFERS}
            />
          </section>
        </>
      )}
    </div>
  );
}
