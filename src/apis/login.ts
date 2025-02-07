import type { User } from "@/stores/userStore";
import { req } from "./req";

interface LoginReq {
  id: number
  password: string
}

interface LoginResp {
  token: string
  info: User
}

export const userLogin = (data: LoginReq): Promise<LoginResp> =>
  req({ url: '/teacher/teacherLogin', method: 'POST', data, noAuth: true, showLoading: false })
