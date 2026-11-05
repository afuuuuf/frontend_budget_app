import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Card } from '@/components/ui/Card'
import { TransactionRow } from '@/components/dashboard/TransactionRow'

const MAX_ROWS = 3

export function RecentTransactionsCard({ transactions }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-ink">Recent transactions</h2>
        <Link
          to={ROUTES.transactions}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View history →
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p className="mt-6 text-sm text-slate">Nothing here yet. Add a transaction to get started.</p>
      ) : (
        <ul className="mt-2">
          {transactions.slice(0, MAX_ROWS).map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </ul>
      )}
    </Card>
  )
}
