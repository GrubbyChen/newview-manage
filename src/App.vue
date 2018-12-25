<template>
  <div id="app" style="height: 100%;">
    <a-layout class="nvmanage-layout">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        :width="220"
      >
        <div class="logo">Logo</div>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1" @click="() => $router.push({ name: 'carousel' })">
            <a-icon type="gift" />
            <span>轮播图</span>
          </a-menu-item>
          <a-menu-item key="2" @click="() => $router.push({ name: 'picture' })">
            <a-icon type="picture" />
            <span>照片</span>
          </a-menu-item>
          <a-menu-item key="3" @click="() => $router.push({ name: 'camera' })">
            <a-icon type="video-camera" />
            <span>视频</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; border-bottom: 1px solid #ddd;">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content class="page-main" :style="{ padding: '32px', background: '#fff', minHeight: '280px' }">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false
    }
  }
}
</script>
<style lang="less">
.nvmanage-layout {
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    margin: 16px;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .ant-menu-item .anticon {
    font-size: 16px;
  }
  // .ant-layout-header {
  //   border-bottom: 1px solid #ddd;
  // }
  // .ant-layout-content {
  //   margin: 0 !important;
  // }
}
</style>
