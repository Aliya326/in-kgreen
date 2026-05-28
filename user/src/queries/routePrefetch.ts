import { queryClient } from '@/queryClient'
import { queryKeys } from '@/queries/queryKeys'
import { articleApi } from '@/api/article'
import { categoryApi } from '@/api/category'

export const routePrefetchers = {
  categoriesList: () =>
    queryClient.prefetchQuery({
      queryKey: queryKeys.categoriesList,
      queryFn: ({ signal }) => categoryApi.list({ signal }),
    }),
  articleDetail: (id: number) =>
    queryClient.prefetchQuery({
      queryKey: queryKeys.articleDetail(id),
      queryFn: ({ signal }) => articleApi.detail(id, { signal }),
    }),
  articlesPage: (params: { pageSize: number; keyword?: string; category?: string; month?: string }) =>
    queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.articlesPage(params),
      initialPageParam: 1,
      queryFn: ({ pageParam, signal }) =>
        articleApi.page(
          {
            pageNo: pageParam,
            pageSize: params.pageSize,
            keyword: params.keyword || undefined,
            category: params.category || undefined,
            month: params.month || undefined,
          },
          { signal }
        ),
    }),
}

export function prefetchRouteData(to) {
  const list = to?.meta?.prefetch
  if (!Array.isArray(list) || list.length === 0) return

  const routeName = String(to?.name || '')
  const keyword = (to?.query?.keyword || '').toString().trim()
  const month = (to?.query?.month || '').toString().trim()
  const category = (to?.query?.category || '').toString().trim()

  for (const key of list) {
    if (key === 'categoriesList') {
      void routePrefetchers.categoriesList().catch(() => undefined)
    }
    if (key === 'articleDetail') {
      const id = Number(to?.params?.id)
      if (Number.isFinite(id) && id > 0) {
        void routePrefetchers.articleDetail(id).catch(() => undefined)
      }
    }
    if (key === 'articlesPage') {
      if (routeName === 'goableSearch') {
        if (keyword) void routePrefetchers.articlesPage({ pageSize: 20, keyword }).catch(() => undefined)
      } else if (routeName === 'archive') {
        void routePrefetchers.articlesPage({ pageSize: 20, keyword: keyword || undefined, month: month || undefined }).catch(
          () => undefined
        )
      } else if (routeName === 'category') {
        void routePrefetchers.articlesPage({ pageSize: 20, category: category || undefined }).catch(() => undefined)
      } else {
        void routePrefetchers.articlesPage({ pageSize: 20 }).catch(() => undefined)
      }
    }
  }
}
