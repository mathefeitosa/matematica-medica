<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <Metricas></Metricas>
        <CalculadoraConcentracao></CalculadoraConcentracao>
        <DrogasVasoativas></DrogasVasoativas>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import Metricas from "../components/Metricas.vue";
import CalculadoraConcentracao from "../components/CalculadoraConcentracao.vue";
import DrogasVasoativas from "../components/DrogasVasoativas.vue";

export default {
  components: { Metricas, CalculadoraConcentracao, DrogasVasoativas },
  name: "Drogas",
  data() {
    return {
      panels: [0],
    };
  },
};
</script>
