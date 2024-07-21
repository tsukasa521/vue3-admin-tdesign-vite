<template>
  <div class="h-screen flex justify-center items-center bg">
    <div class="authentication-container">
      <div class="card">
        <div class="text-xl font-medium text-center mt-2 mb-6">
          管理系统
        </div>
        <t-form ref="refForm" :data="formValue" :rules="formRules" labelAlign="top" @submit="login">
          <t-form-item label="账户名" name="name">
            <t-input v-model="formValue.name" size="large" clearable placeholder="请输入手机号或邮箱"></t-input>
          </t-form-item>
          <t-form-item label="密码" name="password">
            <t-input v-model="formValue.password" type="password" size="large" clearable placeholder="请输入密码"></t-input>
          </t-form-item>
          <t-form-item>
            <div class="mt-4 w-full">
              <t-button :loading="buttonLoading" theme="primary" size="large" type="submit" block>登录</t-button>
            </div>
          </t-form-item>
        </t-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useAccountStore } from '@/stores'

const buttonLoading = ref(false)
const refForm = ref()
const formValue = ref({
  name: 'admin',
  password: 'password'
})
const formRules = ref({
  name: [{ required: true }],
  password: [{ required: true }]
})

const store = useAccountStore()

const login = async () => {
  try {
    await refForm.value?.validate()
    buttonLoading.value = true
    await store.login(formValue.value.name, formValue.value.password)
    // const { showSuccessMessage } = useNotification()
    // showSuccessMessage('登录成功！')
    router.push({ path: '/' })
  } finally {
    buttonLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.authentication-container {
  max-width: 400px;
  width: 100%;
  position: relative;
  @apply py-6;

  &:before {
    width: 238px;
    height: 233px;
    content: " ";
    position: absolute;
    top: -55px;
    left: -40px;
    z-index: -1;
    background-image: url("data:image/svg+xml,%3Csvg width='239' height='234' viewBox='0 0 239 234' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='88.5605' y='0.700195' width='149' height='149' rx='19.5' stroke='%237367F0' stroke-opacity='0.16'/%3E%3Crect x='0.621094' y='33.761' width='200' height='200' rx='10' fill='%237367F0' fill-opacity='0.08'/%3E%3C/svg%3E%0A");
  }

  &:after {
    width: 180px;
    height: 180px;
    content: " ";
    position: absolute;
    z-index: -1;
    bottom: -30px;
    right: -56px;
    background-image: url("data:image/svg+xml,%3Csvg width='181' height='181' viewBox='0 0 181 181' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.30469' y='1.44312' width='178' height='178' rx='19' stroke='%237367F0' stroke-opacity='0.16' stroke-width='2' stroke-dasharray='8 8'/%3E%3Crect x='22.8047' y='22.9431' width='135' height='135' rx='10' fill='%237367F0' fill-opacity='0.08'/%3E%3C/svg%3E");
  }

  .card {
    @apply p-8 bg-white rounded-md;
    box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, .1);
  }
}
</style>
