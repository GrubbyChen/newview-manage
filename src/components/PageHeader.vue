<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3"
    dark
    app
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0">
      <v-toolbar-side-icon @click.stop="changeDrawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Newview</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn> -->
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        >
      </v-avatar>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    drawer: true
  }),
  methods: {
    changeDrawer () {
      this.drawer = !this.drawer
      this.$emit('drawer', this.drawer)
    }
  }
}
</script>
