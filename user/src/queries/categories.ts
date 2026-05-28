import { useQuery } from '@tanstack/vue-query'
import { categoryApi } from '@/api/category'
import { queryKeys } from '@/queries/queryKeys'

export function useCategoriesListQuery() {
  return useQuery({
    queryKey: queryKeys.categoriesList,
    queryFn: ({ signal }) => categoryApi.list({ signal }),
  })
}

