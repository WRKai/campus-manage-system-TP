<script setup lang="ts">
  import { ElMenu, ElMenuItem, ElIcon } from 'element-plus';
  import SvgIcon from '@/components/SvgIcon.vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const activeIdx = ref('/main/course')
  watch(() => route.path,
    nval => activeIdx.value = nval,
    { immediate: true })
</script>

<template>
  <div class="main-container">
    <ElMenu class="menu" :default-active="activeIdx" router>
      <ElMenuItem index="/main/course">
        <ElIcon :size="20">
          <SvgIcon name="courseAdd" />
        </ElIcon>
        <span>申请课程</span>
      </ElMenuItem>
      <ElMenuItem index="/main/lesson">
        <ElIcon :size="22">
          <SvgIcon name="lessonAdd" />
        </ElIcon>
        <span>申请课次</span>
      </ElMenuItem>
    </ElMenu>
    <RouterView />
  </div>
</template>

<style lang="less" scoped>
  .main-container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .menu {
      width: fit-content;
      height: 100%;
    }
  }
</style>
