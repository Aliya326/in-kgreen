import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. 响应式状态作为登录态唯一来源
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const avatar = ref(localStorage.getItem('avatar') || '')

  // 2. 页面只依赖这个 computed
  const isLogin = computed(() => token.value !== '')
  const user = computed(() => ({
    username: username.value,
    avatar: avatar.value,
  }))

  // 3. 设置 token
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 4. 设置用户资料
  const setProfile = (profile: { username?: string; avatar?: string }) => {
    username.value = profile.username || ''
    avatar.value = profile.avatar || ''

    localStorage.setItem('username', username.value)
    localStorage.setItem('avatar', avatar.value)
  }

  // 5. 登录成功统一入口
  const loginSuccess = (payload: {
    token: string
    username?: string
    avatar?: string
  }) => {
    setToken(payload.token)
    setProfile({
      username: payload.username,
      avatar: payload.avatar,
    })
  }

  // 6. 退出登录统一入口
  const logout = () => {
    token.value = ''
    username.value = ''
    avatar.value = ''

    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
  }

  return {
    token,
    username,
    avatar,
    user,
    isLogin,
    setToken,
    setProfile,
    loginSuccess,
    logout,
  }
})

export default useUserStore
