<template>
  <a-card class="register-form-card">
      <div class="register-form-header">
        <h2>注册账号</h2>
      </div>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
     layout="vertical"
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
      <a-button type="primary" html-type="submit" class="register-btn">注册账号</a-button>
      <a class="register-link" @click="router.push('/login')">已有账号？点击登录</a>
  </a-form>
</a-card>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import router from '@/router';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  const ref = {
    username: values.username,
    passwordHash: values.password,
  }
  
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style>
.register-form-card {
  margin: 0 auto;
  width: 400px;
  height: 600px;
}
.register-form-header {
  text-align: center;

}
.register-form-item {
  margin-bottom: 10px;
}
.register-btn {
  width: 100%;
  margin: 0 auto;
  display: block;
}
.register-link {
  display: block;
  width: fit-content;
  margin-left: auto;
}
</style>