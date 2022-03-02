<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <v-col cols="12" xm="12" md="6" lg="4">
          <PediatriaMetricas></PediatriaMetricas>
        </v-col>
        <v-col
          cols="12"
          xm="12"
          md="6"
          lg="4"
          v-if="!$store.state.pediatria.isRN"
        >
          <PediatriaHolidaySegar></PediatriaHolidaySegar>
        </v-col>
        <v-col
          cols="12"
          xm="12"
          md="6"
          lg="4"
          v-if="$store.state.pediatria.isRN"
        >
          <PediatriaHidratacaoRN></PediatriaHidratacaoRN>
        </v-col>
        <v-col cols="12" xm="12" md="6" lg="4">
          <PediatriaCalendarioVacinal></PediatriaCalendarioVacinal>
        </v-col>
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
      panels: [0],
    };
  },
};
</script>
