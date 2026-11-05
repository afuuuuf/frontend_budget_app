import { Skeleton } from '@/components/ui/Skeleton'

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading your dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[158px]" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[260px]" />
        <Skeleton className="h-[260px]" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2.1fr_1fr]">
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
      </div>
    </div>
  )
}
