<template>
  <v-container>
    <v-row>
      <v-expansion-panels v-model="panels" multiple>
        <v-col cols="12" xm="12" md="6" lg="4">
          <Metricas></Metricas>
        </v-col>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import Metricas from "../components/Metricas.vue";

export default {
  components: { Metricas },
  data() {
    return {
      metricas: {},
      panels: [0],
    };
  },
  watch: {
    metricas: function () {
      this.$store.state.metricas = this.metricas;
    },
  },
  beforeMount() {
    this.metricas = this.$store.state.metricas;
  },
  computed: {
    agua_corporal_total() {
      let idade = this.metricas.idade;
      let sexo = this.metricas.sexo;
      if (sexo == "M") {
        if (idade > 65) {
          return this.metricas.peso * 0.6;
        } else {
          return this.metricas.peso * 0.5;
        }
      } else if (sexo == "F") {
        if (idade > 65) {
          return this.metricas.peso * 0.5;
        } else {
          return this.metricas.peso * 0.45;
        }
      } else {
        console.log(
          "Sexo dsconhecido. Impossível calcular agua corporal total."
        );
        return "";
      }
    },
  },
};
</script>
