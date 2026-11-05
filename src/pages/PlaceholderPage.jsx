import { Card } from '@/components/ui/Card'

// Stands in for screens we haven't built yet, so the sidebar links have somewhere to go.
export default function PlaceholderPage({ title }) {
  return (
    <div className="space-y-6">
      <h1 className="text-[32px] font-medium leading-tight tracking-tight text-ink">{title}</h1>
      <Card>
        <p className="text-slate">This screen is coming soon.</p>
      </Card>
    </div>
  )
}
