<template>
  <v-container>
    <v-row>
      <Metricas></Metricas>
      <CalculadoraConcentracao></CalculadoraConcentracao>
      <DrogasVasoativas></DrogasVasoativas>
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
};
</script>
