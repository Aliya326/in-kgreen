import request from '@/utils/request'

export type Category = {
    value?:string
    label?:string
}

export const categoryApi = {
  list(options?: { signal?: AbortSignal }): Promise<Category[]> {
    return request.get('/categories/list', { signal: options?.signal })
  },
    add(formData: FormData): Promise<Category> {
        return request.post('/categories/add', formData)
    },
    deleteCategory(id: number): Promise<void> {
        return request.delete(`/categories/${id}`)
    },
}
