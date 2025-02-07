import type { Dept } from "@/stores/deptMajorStore";
import { req } from "./req";

export const getDeptMajorList = (): Promise<Dept[]> =>
  req('/dept/deptMajor')

// export const postAddDept = (data: { name: string }): Promise<number> =>
//   req({ url: '/dept/add', method: 'POST', data })

// export const postAddMajor = (data: { name: string, deptId: number }): Promise<number> =>
//   req({ url: '/major/add', method: 'POST', data })
