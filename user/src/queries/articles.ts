import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { articleApi } from '@/api/article'
import { queryKeys } from '@/queries/queryKeys'

export function useArticlesInfiniteQuery(params: {
  pageSize: any
  keyword?: any
  category?: any
  month?: any
}) {
  const pageSizeRef = computed(() => Number(unref(params.pageSize)))
  const keywordRef = computed(() => (unref(params.keyword) || '').toString().trim())
  const categoryRef = computed(() => (unref(params.category) || '').toString().trim())
  const monthRef = computed(() => (unref(params.month) || '').toString().trim())

  return useInfiniteQuery({
    queryKey: computed(() =>
      queryKeys.articlesPage({
        pageSize: pageSizeRef.value,
        keyword: keywordRef.value,
        category: categoryRef.value,
        month: monthRef.value,
      })
    ),
    enabled: computed(() => Number.isFinite(pageSizeRef.value) && pageSizeRef.value > 0),
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      articleApi.page(
        {
          pageNo: pageParam,
          pageSize: pageSizeRef.value,
          keyword: keywordRef.value || undefined,
          category: categoryRef.value || undefined,
          month: monthRef.value || undefined,
        },
        { signal }
      ),
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.pageNo * lastPage.pageSize
      if (loaded >= lastPage.total) return undefined
      return lastPage.pageNo + 1
    },
  })
}

export function useArticleDetailQuery(id) {
  const idRef = computed(() => Number(unref(id)))
  return useQuery({
    queryKey: computed(() => queryKeys.articleDetail(idRef.value)),
    enabled: computed(() => Number.isFinite(idRef.value) && idRef.value > 0),
    queryFn: ({ signal }) => articleApi.detail(idRef.value, { signal }),
  })
}
