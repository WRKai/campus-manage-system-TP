import { mock } from "mockjs"

mock(/^\/api-teacher\/course\/together/, 'get', {
  "errorMessage": "",
  "code": 200,
  data: [
    { id: 1, name: '计算机网络', credit: 3 },
    { id: 2, name: '计算机网络实验', credit: 0.5 },
    { id: 3, name: '体育', credit: 1 },
    { id: 4, name: '体育', credit: 1 },
    { id: 5, name: '体育', credit: 1 },
    { id: 6, name: '体育', credit: 1 },
    { id: 7, name: '体育', credit: 1 },
    { id: 8, name: '体育', credit: 1 },
    { id: 9, name: '体育', credit: 1 },
    { id: 10, name: '体育', credit: 1 },
    { id: 11, name: '体育', credit: 1 },
    { id: 12, name: '体育', credit: 1 },
  ]
})

mock('/api-teacher/teacher/askForCourses', 'post', {
  "errorMessage": "",
  "code": 200,
  data: null
})
