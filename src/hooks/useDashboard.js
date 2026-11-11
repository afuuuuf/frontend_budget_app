import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboardService'
import { queryKeys } from '@/constants/queryKeys'

export function useDashboard({ year, month }) {
  return useQuery({
    queryKey: queryKeys.dashboard(year, month),
    queryFn: () => dashboardService.getDashboard({ year, month }),
    // Keep showing the old month while the new one loads, instead of flashing a skeleton.
    placeholderData: keepPreviousData,
  })
}
