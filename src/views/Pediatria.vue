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
        <PediatriaCalendarioVacinal></PediatriaCalendarioVacinal>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import PediatriaMetricas from "../components/PediatriaMetricas.vue";
import PediatriaHolidaySegar from "../components/PediatriaHollidaySegar.vue";
import PediatriaHidratacaoRN from "../components/PediatriaHidratacaoRN.vue";
import PediatriaCalendarioVacinal from "../components/PediatriaCalendarioVacinal.vue";

export default {
  components: {
    PediatriaMetricas,
    PediatriaHolidaySegar,
    PediatriaHidratacaoRN,
    PediatriaCalendarioVacinal,
  },
  data() {
    return {
      panels: [0, 1, 2, 3],
    };
  },
};
</script>
