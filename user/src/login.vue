<template>
    <a-card class="login-card">
        <h1>登录</h1>
    <a-form
    :model="formState"
    name="horizontal_login"
    layout="vertical"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-checkbox>记住密码</a-checkbox>
    </a-form-item>
      <a-button class="login-btn" :disabled="disabled" type="primary" html-type="submit">登录</a-button>
  </a-form>
  <a class="register-btn" @click="router.push('/register')">注册账号</a>
 </a-card>
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive, computed } from 'vue'
import useUserStore from '@/stores/user'
import { loginApi } from '@/api/login'

const user = useUserStore()

const formState = reactive({
  username: '',
  password: '',
})

const onFinish = async (values: { username: string; password: string }) => {
  try {
    const res = await loginApi.login({
      username: values.username,
      passwordHash: values.password,
    })
    user.loginSuccess({
      token: res.token,
      username: res.username || values.username,
      avatar: res.avatar || '',
    })
    await router.push({ name: 'home' })
  } catch (error) {
    console.error('登录失败', error)
    alert('用户名或密码错误')
  }
}

const disabled = computed(() => {
  return !(formState.username && formState.password);
});

const onFinishFailed = () => {
  console.log('登录失败');
}
</script>

<style scoped>
.login-card .ant-form-item,
.login-card .ant-input-affix-wrapper,
.login-card .ant-input,
.login-card .ant-input-password {
  width: 100%;
}
.login-card {
  width: 400px;
  height: 600px ;
  margin: 0 auto;
}
.login-btn {
  width: 100%;
}

.register-btn {
  display: block;
  width: fit-content;
  margin-top: 20px;
  margin-left: auto;
}
h1 {
  text-align: center;
}
</style>
