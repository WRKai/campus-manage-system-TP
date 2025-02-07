<script setup lang="ts">
  import { getCourses, type Course } from '@/apis/course';
  import { ref } from 'vue';
  import { ElButton, ElCascader, ElForm, ElFormItem, ElInput, ElMessage, ElOption, ElSelect, type FormInstance, type FormRules } from 'element-plus';
  import { postApplyLesson } from '@/apis/lesson';
  const courses = ref<Course[]>([])
  async function init() {
    courses.value = await getCourses()
  }
  init()

  const lessonAddFormRef = ref<FormInstance>()

  interface AddLesson {
    courseId?: number,
    targetGrade?: number,
  }

  const lessonAddFormVal = ref<AddLesson>({
    courseId: void 0,
    targetGrade: void 0,
  })

  const rules: FormRules<AddLesson> = {
    courseId: [{ required: true, message: '请选择课程', trigger: ['change', 'blur'] }],
    targetGrade: [
      { required: true, message: '请输入面向年级', trigger: ['change', 'blur'] },
      { len: 4, message: '年级输入有误', trigger: ['change', 'blur'] }
    ],
  }

  async function submit() {
    const valid = lessonAddFormRef.value?.validate()
    if (!valid)
      return
    await postApplyLesson({
      courseId: lessonAddFormVal.value.courseId!,
      targetGrade: lessonAddFormVal.value.targetGrade!,
    })
    ElMessage.success('申请成功!')
    lessonAddFormRef.value?.resetFields()
  }
</script>

<template>
  <div class="lesson-container">
    <ElForm class="form" label-width="auto" ref="lessonAddFormRef" @submit.prevent="submit" :model="lessonAddFormVal"
      :rules>
      <ElFormItem label="课程" prop="courseId">
        <ElSelect size="large" v-model="lessonAddFormVal.courseId" placeholder="请选择课程">
          <ElOption v-for="c in courses" :key="c.id" :label="c.name" :value="c.id">{{ c.name }}({{ c.credit }}学分)
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="年级" prop="targetGrade">
        <ElInput size="large" v-model="lessonAddFormVal.targetGrade" type="number" placeholder="请输入年级"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="less" scoped>
  .lesson-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 15%;

    .form {
      width: 80%;
    }
  }
</style>
