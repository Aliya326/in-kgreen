export const queryKeys = {
  articlesPage: (params: { pageSize: number; keyword?: string; category?: string; month?: string }) =>
    [
      'articles',
      'page',
      {
        pageSize: params.pageSize,
        keyword: params.keyword || '',
        category: params.category || '',
        month: params.month || '',
      },
    ] as const,
  articleDetail: (id: number) => ['articles', 'detail', id] as const,
  categoriesList: ['categories', 'list'] as const,
}
