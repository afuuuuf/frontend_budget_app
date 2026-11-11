import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Card } from '@/components/ui/Card'
import { BudgetRow } from '@/components/dashboard/BudgetRow'

// Home shows only the first few budgets; the full list lives on the Budgets page.
const MAX_ROWS = 4

export function BudgetOverviewCard({ budgets }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-ink">Budget overview</h2>
        <Link to={ROUTES.budgets} className="text-sm font-semibold text-primary hover:underline">
          View all budgets →
        </Link>
      </div>

      {budgets.length === 0 ? (
        <p className="mt-6 text-sm text-slate">
          No budgets yet. Set one up to see how your spending compares.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-mist [&>*]:py-5 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
          {budgets.slice(0, MAX_ROWS).map((budget) => (
            <BudgetRow key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </Card>
  )
}
