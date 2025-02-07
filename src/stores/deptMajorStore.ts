import { getDeptMajorList } from "@/apis/deptMajor";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface Dept {
  id: number; // 系别ID
  name: string; // 系别名称
  majors: Major[]; // 专业列表
}

export interface Major {
  id: number; // 专业ID
  name: string; // 专业名称
}

export const useDeptMajorStore = defineStore('deptMajor', () => {
  const list = ref<Dept[]>()
  const depts = new Map<number, string>()
  const majors = new Map<number, string>()

  async function fetchDepts() {
    list.value = await getDeptMajorList()
    list.value?.forEach(d => {
      depts.set(d.id, d.name)
      d.majors?.forEach(m => majors.set(m.id, m.name))
    })
  }

  async function getList() {
    if (!list.value)
      await fetchDepts()
    return list.value as Dept[]
  }
  async function getDepts() {
    if (!list.value)
      await fetchDepts()
    return depts
  }
  async function getMajors() {
    if (!list.value)
      await fetchDepts()
    return majors
  }

  // async function addDept(name: string) {
  //   const id = await postAddDept({ name })
  //   list.value?.push({ id, name, majors: [] })
  //   depts.set(id, name)
  // }

  // async function addMajor(data: { name: string, deptId?: number }) {
  //   if (data.deptId === void 0)
  //     return
  //   const id = await postAddMajor(data as { name: string, deptId: number })
  //   const deptItem = list.value?.find(d => d.id === data.deptId)
  //   if (!deptItem)
  //     return
  //   if (!deptItem.majors)
  //     deptItem.majors = []
  //   deptItem.majors.push({ id, name: data.name })
  //   majors.set(id, data.name)
  // }

  return {
    getList,
    fetchDepts,
    getDepts,
    getMajors
  }

})
