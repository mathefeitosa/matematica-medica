<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app dark>
      <drawer-buttons></drawer-buttons>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon
        @click="
          () => {
            drawer = !drawer;
            mini = !mini;
          }
        "
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Matemática Médica</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import DrawerButtons from "./components/DrawerButtons.vue";
export default {
  components: { DrawerButtons },
  data() {
    return {
      drawer: null,
      mini: true,
    };
  },
};
</script>
