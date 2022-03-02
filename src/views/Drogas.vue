<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <v-col cols="12" sm="12" md="6" lg="4">
          <Metricas></Metricas>
        </v-col>
        <v-col cols="12" xm="12" md="6" lg="4">
          <CalculadoraConcentracao></CalculadoraConcentracao>
        </v-col>
        <v-col cols="12" xm="12" md="6" lg="4">
          <DoseDrogas></DoseDrogas>
        </v-col>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import Metricas from "../components/Metricas.vue";
import CalculadoraConcentracao from "../components/CalculadoraConcentracao.vue";
import DoseDrogas from "../components/DoseDrogas.vue";

export default {
  components: { Metricas, CalculadoraConcentracao, DoseDrogas },
  name: "Drogas",
  data() {
    return {
      panels: [0],
    };
  },
};
</script>
