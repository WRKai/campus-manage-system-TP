import { defineStore } from "pinia";
import { ref } from "vue";

export interface User {
  id: number; // 教师号，类型为 long，对应 TypeScript 的 number
  sex?: string; // 性别，类型为 varchar(3)，对应 TypeScript 的 string，且为可选字段
  dept: number; // 系别，类型为 long，对应 TypeScript 的 number
  admin: number; // 是否管理员，类型为 tinyint，对应 TypeScript 的 number，默认值为 0
  entry_date?: string; // 入职日期，类型为 date，对应 TypeScript 的 string（或 Date 类型），且为可选字段
  title: string | null; // 职称，类型为 varchar(255)，对应 TypeScript 的 string，且为可选字段
  password: string | null; // 密码，类型为 varchar(255)，对应 TypeScript 的 string
  name: string; // 姓名，类型为 varchar(255)，对应 TypeScript 的 string
}
const USER_INFO_KEY = '__TEACHER_USER_INFO_KEY'
const TOKEN_KEY = '__TEACHER_TOKEN_KEY'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();

  function setUser(newUser: User) {
    user.value = newUser;
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(newUser));
  }

  function clearUser() {
    user.value = void 0;
    localStorage.removeItem(USER_INFO_KEY);
  }

  function getUser() {
    if (user.value)
      return user.value;
    const userStr = localStorage.getItem(USER_INFO_KEY);
    if (!userStr)
      return void 0;
    return user.value = JSON.parse(userStr) as User;
  }


  const token = ref('');

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem(TOKEN_KEY, newToken);
  }

  function clearToken() {
    token.value = '';
    localStorage.removeItem(TOKEN_KEY);
  }

  function getToken() {
    if (token.value)
      return token.value;
    const localToken = localStorage.getItem(TOKEN_KEY);
    return token.value = localToken ?? '';
  }

  return {
    setUser,
    clearUser,
    getUser,
    setToken,
    clearToken,
    getToken
  }
})
