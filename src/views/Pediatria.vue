<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <PediatriaMetricas></PediatriaMetricas>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import PediatriaMetricas from "../components/PediatriaMetricas.vue";
export default {
  components: { PediatriaMetricas },
  data() {
    return {
      panels: [0],
    };
  },
};
</script>
