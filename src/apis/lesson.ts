import { req } from "./req";

interface ApplyLessonReq {
  courseId: number
  targetGrade: number
}

export const postApplyLesson = (data: ApplyLessonReq): Promise<void> =>
  req({ url: '/teacher/askForLessons', method: 'POST', data })
