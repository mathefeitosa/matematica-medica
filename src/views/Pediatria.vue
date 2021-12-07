<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <PediatriaMetricas></PediatriaMetricas>
        <PediatriaHolidaySegar></PediatriaHolidaySegar>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import PediatriaMetricas from "../components/PediatriaMetricas.vue";
import PediatriaHolidaySegar from "../components/PediatriaHollidaySegar.vue";
export default {
  components: { PediatriaMetricas, PediatriaHolidaySegar },
  data() {
    return {
      panels: [0],
    };
  },
};
</script>
