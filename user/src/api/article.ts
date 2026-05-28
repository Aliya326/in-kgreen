import request from '@/utils/request'

export type Article = {
  id: number
  title: string
  category?: string
  content?: string
  intro_md?: string
  cover_image?: string
  download_url?: string
  publishDate?: string
}

export type PageResult<T> = {
  list: T[]
  total: number
  pageNo: number
  pageSize: number
}

export const articleApi = {
  list(options?: { signal?: AbortSignal }): Promise<Article[]> {
    return request.get('/articles/list', { signal: options?.signal })
  },

  page(
    params: {
      pageNo: number
      pageSize: number
      keyword?: string
      category?: string
      month?: string
    },
    options?: { signal?: AbortSignal }
  ): Promise<PageResult<Article>> {
    return request.get('/articles/page', { params, signal: options?.signal })
  },

  detail(id: number, options?: { signal?: AbortSignal }): Promise<Article> {
    return request.get(`/articles/${id}`, { signal: options?.signal })
  },

  add(formData: FormData): Promise<Article> {
    return request.post('/articles/add', formData)
  },

  update(formData: FormData): Promise<void> {
    return request.put('/articles/update', formData)
  },

  remove(id: number): Promise<void> {
    return request.delete(`/articles/${id}`)
  },
}
