import request from '@/utils/request'

export type LoginRequest = {
  username?: string
  passwordHash?: string
}

export type LoginResponse = {
  token: string
  username?: string
  avatar?: string
}

export const loginApi = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return request.post('/user/login', data)
  },
  logout: () => request.post('/logout'),
  getProfile: () => request.get('/profile'),
}
