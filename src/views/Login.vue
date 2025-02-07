<script setup lang="ts">
  import { ElForm, ElFormItem, ElInput, ElButton, type FormInstance, type FormRules, ElMessage } from 'element-plus';
  import { Key, User } from '@element-plus/icons-vue'
  import { ref } from 'vue';
  import { userLogin } from '@/apis/login';
  import { createNumInpFn, rsaEncrypt } from '@/utils';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/userStore';

  const router = useRouter()
  const userStore = useUserStore()
  // 登录按钮状态
  const loginBtnLoading = ref(false)
  const loginBtnDisabled = ref(false)

  // 表单
  interface Login {
    id: string,
    password: string
  }
  const formRef = ref<FormInstance>()
  const formVal = ref<Login>({
    id: '',
    password: ''
  })
  const rules = ref<FormRules<Login>>({
    id: [
      { required: true, message: '请输入UID', trigger: 'blur' },
      { max: 12, message: '长度在 1 到 12 个数字', trigger: ['blur', 'change'] }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 20, message: '密码长度应大于3个字符', trigger: ['blur', 'change'] }
    ],
  })
  function login() {
    formRef.value?.validate(async valid => {
      if (!valid)
        return
      loginBtnLoading.value = true
      try {
        const res = await userLogin({
          id: +formVal.value.id,
          password: rsaEncrypt(formVal.value.password)
        })
        userStore.setUser(res.info)
        userStore.setToken(res.token)
      } catch {
        loginBtnLoading.value = false
        return
      }
      loginBtnLoading.value = false
      loginBtnDisabled.value = true
      ElMessage.success('登录成功')
      setTimeout(() => {
        router.push({ name: 'main' })
      }, 1111);
    })
  }
  // 其它处理
  const _fn = createNumInpFn(formVal.value, 'id')
</script>

<template>
  <h1>教师智慧平台</h1>
  <div class="login-form">
    <ElForm ref="formRef" :model="formVal" :rules class="form" @submit.prevent="login">
      <ElFormItem class="input" prop="id">
        <ElInput size="large" placeholder="UID" :model-value="formVal.id" @update:model-value="_fn"
          :prefix-icon="User" />
      </ElFormItem>
      <ElFormItem class="input" prop="password">
        <ElInput size="large" placeholder="密码" v-model.trim="formVal.password" show-password type="password"
          :prefix-icon="Key" />
      </ElFormItem>
      <ElFormItem class="input">
        <ElButton style="width: 100%;" type="primary" size="large" native-type="submit" :loading="loginBtnLoading"
          :disabled="loginBtnDisabled">登录</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="less" scoped>
  .login-form {
    height: 60vh;
    width: 30vw;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #ccc;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);

    .form {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .input {
        width: 60%;
      }
    }
  }
</style>
