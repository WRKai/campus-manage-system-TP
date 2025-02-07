import { ElMessageBox } from "element-plus"
import JSEncrypt from "jsencrypt"
import { ref } from "vue"
const encryptor = new JSEncrypt()
encryptor.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqYAwk0WTgd8bSs6pg5uwcEP9V
EY96PQLXQlAxqUYn7o6E1PX5GxEQ55s1jPcOScKuoJK2/0BA5t3RTPUCKh9BhoGg
YKAbGaN9uFVQUHnO7Oo3G87mictwgC8axKNTlEip63vLrPRMv1nM2GOzBBpmzkoC
OHVyoJVk/FKikq+C3wIDAQAB
-----END PUBLIC KEY-----
`)
export function rsaEncrypt(pw: string) {
  return encryptor.encrypt(pw) as string
}

export const compRef = <T extends abstract new (...args: any) => any>(_: T) =>
  ref<InstanceType<T>>()

export function createNumInpFn<T extends Record<string, any>>(formVal: T, key: keyof T) {
  return function (str: string) {
    formVal[key] = str.replaceAll(/[^\d]/g, '') as T[keyof T]
  }
}

export type StringifyVals<T, Keys extends keyof T = keyof T> = {
  [K in keyof T]: K extends Keys ? string : T[K];
}

export type PagePromise<T> = Promise<{ records: T[], total: number }>


type ElMessageBoxType = 'success' | 'warning' | 'info' | 'error'
type ElMessageBoxOptions = {
  type?: ElMessageBoxType,
  confirmButtonText?: string,
  cancelButtonText?: string
}
export async function showConfirm(message: string, type?: ElMessageBoxType, title?: string): Promise<any>
export async function showConfirm(message: string, config?: ElMessageBoxOptions, title?: string): Promise<any>
export async function showConfirm(message: string, typeOrConfig?: ElMessageBoxOptions | ElMessageBoxType, title: string = '提示') {
  let config: ElMessageBoxOptions = { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' }
  if (typeof typeOrConfig === 'string') {
    config.type = typeOrConfig
  } else {
    config = { ...config, ...typeOrConfig }
  }
  return ElMessageBox.confirm(message, title, config)
}
