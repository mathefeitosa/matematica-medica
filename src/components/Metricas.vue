<template>
  <v-col cols="12">
    <v-card outlined>
      <v-card-title class="text-h6">Métricas do paciente</v-card-title>
      <v-card-text>
        <v-radio-group v-model="metricas.sexo" row>
          <v-radio label="Mulher" value="F"></v-radio>
          <v-radio label="Homem" value="M"></v-radio>
        </v-radio-group>
        <label for="peso">Peso em kg</label>
        <vue-numeric-input
          id="peso"
          :min="1"
          v-model="metricas.peso"
          width="100%"
          align="center"
          autofocus
        ></vue-numeric-input>
        <label for="idade">Idade em anos</label>
        <vue-numeric-input
          id="idade"
          :min="1"
          :max="100"
          placeholder="Idade"
          v-model="metricas.idade"
          width="100%"
          align="center"
          autofocus
        ></vue-numeric-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <p>Água corporal total: {{ agua_corporal_total.toFixed(1) }} L</p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      metricas: {},
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
        if (idade < 65) {
          return this.metricas.peso * 0.6;
        } else {
          return this.metricas.peso * 0.5;
        }
      } else if (sexo == "F") {
        if (idade < 65) {
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
