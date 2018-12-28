<template>
  <v-app id="inspire">
    <page-menu ref="pageMenu"></page-menu>
    <page-header @drawer="setMenuDrawer"></page-header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import PageMenu from '@/components/PageMenu'
import PageHeader from '@/components/PageHeader'
export default {
  components: { PageMenu, PageHeader },
  data: () => ({
    dialog: false
  }),
  methods: {
    setMenuDrawer (drawer) {
      this.$refs.pageMenu.setDrawer(drawer)
    }
  }
}
</script>
