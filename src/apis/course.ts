import { req } from "./req";

export interface Course {
  name: string;
  id: number;
  credit: number;
}


export const getCourses = (params: { majors?: number[] } = {}): Promise<Course[]> =>
  req({ url: '/course/together', params, showLoading: false })


interface ApplyCourseReq {
  name: string
  credit: number
  majors: { majorId: number, required: number }[]
  preIds: number[]
}

export const postApplyCourse = (data: ApplyCourseReq): Promise<void> =>
  req({ url: '/teacher/askForCourses', method: 'POST', data })
