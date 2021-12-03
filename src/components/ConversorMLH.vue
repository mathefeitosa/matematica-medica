<template>
  <v-col cols="12">
    <v-card outlined>
      <v-card-title class="text-h6">
        Transformar ml/h para mcg/kg/min
      </v-card-title>
      <v-card-text>
        <label for="infusao">Infusão em ml/h</label>
        <vue-numeric-input
          id="infusao"
          :min="0"
          v-model="mlh_p_mcgm.infusao"
          width="100%"
          autofocus
        ></vue-numeric-input>

        <label for="concentracao">Concentração da solução em mg/ml</label>
        <vue-numeric-input
          id="concentracao"
          :min="0"
          v-model="mlh_p_mcgm.concentracao"
          width="100%"
          autofocus
        ></vue-numeric-input>
      </v-card-text>
      <v-card-text class="grey lighten-2">
        <b>Dose</b>: {{ dose.toFixed(2) }} mcg/kg/min
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      mlh_p_mcgm: {
        infusao: 5,
        concentracao: 1,
      },
    };
  },
  computed: {
    dose() {
      return (
        (this.mlh_p_mcgm.concentracao * this.mlh_p_mcgm.infusao * 100) /
        this.metricas.peso
      );
    },
    metricas() {
      return this.$store.state.metricas;
    },
  },
};
</script>
