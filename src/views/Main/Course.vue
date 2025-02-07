<script setup lang="ts">
  import { getCourses, postApplyCourse, type Course } from '@/apis/course';
  import { useDeptMajorStore, type Dept } from '@/stores/deptMajorStore';
  import { ElButton, ElCascader, ElForm, ElFormItem, ElInput, ElMessage, ElOption, ElSelect, type FormInstance, type FormRules } from 'element-plus';
  import { ref } from 'vue';

  const deptMajorStore = useDeptMajorStore()

  const deptMajorList = ref<Dept[]>([])

  async function init() {
    deptMajorList.value = await deptMajorStore.getList()
  }
  init()
  const courseAddFormRef = ref<FormInstance>()
  function validateMajors(_: any, __: any, cb: Function) {
    if (requiredMajorsSet.size + notRequiredMajorsSet.size > 0)
      cb()
    else
      cb(new Error('请选择至少一个专业'))
  }
  const rules: FormRules<AddCourse> = {
    name: [
      { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: ['blur', 'change'] }
    ],
    credit: [
      { required: true, message: '请输入学分', trigger: ['blur', 'change'] },
    ],
    requiredMajors: [{ validator: validateMajors, message: '请选择至少一个专业', trigger: ['blur', 'change'] }],
    notRequiredMajors: [{ validator: validateMajors, message: '请选择至少一个专业', trigger: ['blur', 'change'] }]
  }

  interface AddCourse {
    name: string,
    credit: string,
    requiredMajors: [number, number][]
    notRequiredMajors: [number, number][]
    preIds: number[]
  }
  const requiredMajorsSet = new Set<number>()
  const notRequiredMajorsSet = new Set<number>()
  const addCourseFormVal = ref<AddCourse>({
    name: '',
    credit: '',
    requiredMajors: [],
    notRequiredMajors: [],
    preIds: []
  });
  function handleRequireSelect() {
    const data = addCourseFormVal.value.requiredMajors
    requiredMajorsSet.clear()
    data.forEach(([, id]) => {
      requiredMajorsSet.add(id)
      if (notRequiredMajorsSet.has(id)) {
        notRequiredMajorsSet.delete(id)
        const idx = addCourseFormVal.value.notRequiredMajors.findIndex(([, _id]) => _id === id)
        if (idx !== -1)
          addCourseFormVal.value.notRequiredMajors = addCourseFormVal.value.notRequiredMajors.toSpliced(idx, 1)
      }
    })
    courseAddFormRef.value?.validateField('notRequiredMajors')
    pres.value = []
  }

  function handleNotRequireSelect() {
    const data = addCourseFormVal.value.notRequiredMajors
    notRequiredMajorsSet.clear()
    data.forEach(([, id]) => {
      notRequiredMajorsSet.add(id)
      if (requiredMajorsSet.has(id)) {
        requiredMajorsSet.delete(id)
        const idx = addCourseFormVal.value.requiredMajors.findIndex(([, _id]) => _id === id)
        if (idx !== -1)
          addCourseFormVal.value.requiredMajors = addCourseFormVal.value.requiredMajors.toSpliced(idx, 1)
      }
    })
    courseAddFormRef.value?.validateField('requiredMajors')
    pres.value = []
  }
  //
  const noDataText = ref('无匹配先修课')
  const pres = ref<Course[]>([])
  async function getPres(vis: boolean) {
    if (!vis || pres.value.length || requiredMajorsSet.size + notRequiredMajorsSet.size === 0)
      return
    noDataText.value = '加载中...'
    pres.value = await getCourses({ majors: [...requiredMajorsSet, ...notRequiredMajorsSet] })
    noDataText.value = '无匹配先修课'
  }
  //
  async function submit() {
    const vaild = await courseAddFormRef.value?.validate()
    if (!vaild)
      return
    const majors = [
      ...([...requiredMajorsSet].map(majorId => ({ majorId, required: 1 }))),
      ...([...notRequiredMajorsSet].map(majorId => ({ majorId, required: 0 })))
    ]
    const data = {
      name: addCourseFormVal.value.name,
      credit: +addCourseFormVal.value.credit,
      preIds: addCourseFormVal.value.preIds,
      majors
    }
    console.log(data)
    await postApplyCourse(data)
    ElMessage.success('申请成功!')
    courseAddFormRef.value?.resetFields()
    requiredMajorsSet.clear()
    notRequiredMajorsSet.clear()
    pres.value = []
  }

</script>

<template>
  <div class="course-container">
    <ElForm class="form" label-width="auto" ref="courseAddFormRef" @submit.prevent="submit" :model="addCourseFormVal"
      :rules>
      <ElFormItem label="课程名称" prop="name">
        <ElInput v-model="addCourseFormVal.name" size="large" placeholder="请输入课程名称" />
      </ElFormItem>
      <ElFormItem label="学分" prop="credit">
        <ElInput v-model="addCourseFormVal.credit" size="large" type="number" step="0.5" placeholder="请输入学分" />
      </ElFormItem>
      <ElFormItem label="必修专业" prop="requiredMajors">
        <ElCascader collapse-tags collapse-tags-tooltip :max-collapse-tags="3" @change="handleRequireSelect"
          style="width: 100%;" size="large" :options="deptMajorList" v-model="addCourseFormVal.requiredMajors"
          :props="{ value: 'id', label: 'name', children: 'majors', multiple: true }">
        </ElCascader>
      </ElFormItem>
      <ElFormItem label="选修专业" prop="notRequiredMajors">
        <ElCascader collapse-tags collapse-tags-tooltip :max-collapse-tags="3" @change="handleNotRequireSelect"
          style="width: 100%;" size="large" :options="deptMajorList" v-model="addCourseFormVal.notRequiredMajors"
          :props="{ value: 'id', label: 'name', children: 'majors', multiple: true }">
        </ElCascader>
      </ElFormItem>
      <ElFormItem label="先修课程" prop="preIds">
        <ElSelect size="large" :no-data-text @visible-change="getPres" v-model="addCourseFormVal.preIds" multiple
          :max-collapse-tags="5" collapse-tags collapse-tags-tooltip>
          <ElOption v-for="p in pres" :value="p.id" :label="p.name">{{ p.name }}({{ p.credit }}学分)</ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="less" scoped>
  .course-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10%;

    .form {
      width: 80%;
    }
  }
</style>
