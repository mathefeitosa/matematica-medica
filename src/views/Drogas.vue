<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title class="text-h6">
            Calculadora de concentração
          </v-card-title>
          <v-card-text>
            <label for="concentracao_ampola">
              Concentração da ampola em mg/ml
            </label>
            <vue-numeric-input
              id="concentracao_ampola"
              :min="1"
              v-model="calculadora.concentracao_ampola"
              width="100%"
              align="center"
              autofocus
            ></vue-numeric-input>

            <label for="volume_ampola"> Volume da ampola em ml </label>
            <vue-numeric-input
              id="volume_ampola"
              :min="1"
              v-model="calculadora.volume_ampola"
              width="100%"
              align="center"
              autofocus
            ></vue-numeric-input>

            <label for="volume_ampola"> Número de ampolas </label>
            <vue-numeric-input
              id="numero_ampolas"
              :min="1"
              v-model="calculadora.numero_ampolas"
              width="100%"
              align="center"
              autofocus
            ></vue-numeric-input>

            <label for="volume_ampola"> Volume final em ml</label>
            <vue-numeric-input
              id="volume_final"
              :min="1"
              v-model="calculadora.volume_final"
              width="100%"
              align="center"
              autofocus
            ></vue-numeric-input>
          </v-card-text>
          <v-card-text class="primary">
            <p>
              <b>Concentração</b>: {{ concentracao.concentracao }} mg/ml ou
              {{ concentracao.concentracao * 1000 }} mcg/ml
            </p>
            <p><b>Volume de soro</b>: {{ concentracao.volume_soro }} ml</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Drogas",
  data() {
    return {
      calculadora: {
        concentracao_ampola: 2,
        volume_ampola: 4,
        numero_ampolas: 4,
        volume_final: 250,
        volume_soro: 0,
      },
    };
  },
  computed: {
    concentracao() {
      let concentracao = this.calculadora.concentracao_ampola;
      let num_ampolas = this.calculadora.numero_ampolas;
      let vol_ampola = this.calculadora.volume_ampola;
      let vol_final = this.calculadora.volume_final;

      let droga_total = concentracao * vol_ampola * num_ampolas;
      let vol_total_ampolas = vol_ampola * num_ampolas;

      return {
        volume_soro: vol_final - vol_total_ampolas,
        concentracao: droga_total / vol_final,
      };
    },
    metricas() {
      return this.$store.state.metricas;
    },
  },
};
</script>
