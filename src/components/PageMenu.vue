<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    fixed
    app
    :width="220"
  >
    <v-list>
      <template v-for="item in items">
        <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-tile v-else :key="item.text" @click="changeRouter(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'view_carousel', text: 'Carousel', router: '/carousel' },
      { icon: 'photo', text: 'Photo', router: '/photo' },
      { icon: 'photo_library', text: 'Album', router: '/album' },
      { icon: 'videocam', text: 'Video', router: '/video' }
    ]
  }),
  methods: {
    changeRouter (item) {
      this.$router.push(item.router)
    },
    setDrawer (drawer) {
      this.drawer = drawer
    }
  }
}
</script>
