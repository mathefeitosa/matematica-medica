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
          title: "Dados do paciente",
          link: "/",
          icon: "mdi-home",
        },
        {
          title: "Drogas e Infusão",
          link: "/drogas",
          icon: "mdi-pill",
        },
        {
          title: "Pediatria",
          link: "/pediatria",
          icon: "mdi-baby-face-outline",
        },
        {
          title: "Sobre",
          link: "/about",
          icon: "mdi-information-outline",
        },
      ],
    };
  },
};
</script>
