<template>
  <v-list dense nav>
    <v-list-item
      v-for="item in items"
      v-bind:key="item.title"
      :to="item.link"
      link
      ><v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Início",
          link: "/",
          icon: "mdi-home",
        },
        {
          title: "Drogas",
          link: "/drogas",
          icon: "mdi-pill",
        },
      ],
    };
  },
};
</script>
