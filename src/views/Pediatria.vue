<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <PediatriaMetricas></PediatriaMetricas>
        <PediatriaHolidaySegar
          v-if="!$store.state.pediatria.isRN"
        ></PediatriaHolidaySegar>
        <PediatriaHidratacaoRN
          v-if="$store.state.pediatria.isRN"
        ></PediatriaHidratacaoRN>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import PediatriaMetricas from "../components/PediatriaMetricas.vue";
import PediatriaHolidaySegar from "../components/PediatriaHollidaySegar.vue";
import PediatriaHidratacaoRN from "../components/PediatriaHidratacaoRN.vue";

export default {
  components: {
    PediatriaMetricas,
    PediatriaHolidaySegar,
    PediatriaHidratacaoRN,
  },
  data() {
    return {
      panels: [0],
    };
  },
};
</script>
