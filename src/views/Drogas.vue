<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <Metricas></Metricas>
        <CalculadoraConcentracao></CalculadoraConcentracao>
        <DoseDrogas></DoseDrogas>
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
