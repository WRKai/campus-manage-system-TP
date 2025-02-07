import { mock } from "mockjs";

mock('/api-teacher/teacher/teacherLogin', 'post', {
  "errorMessage": "",
  "code": 200,
  "data": {
    "token": "JWT string",
    "info": {
      "id": 1,
      "sex": '男',
      "dept": 1,
      "admin": 1,
      "entry_date": '2022-09-01',
      "title": '副教授'
    }
  }
})
