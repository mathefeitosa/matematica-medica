<template>
  <v-col cols="12">
    <v-card outlined class="blue lighten-5" elevation="3">
      <v-card-title class="text-h6">Métricas do paciente</v-card-title>
      <v-card-text>
        <v-radio-group v-model="metricas.sexo" row>
          <v-radio label="Mulher" value="F"></v-radio>
          <v-radio label="Homem" value="M"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="metricas.raca" row>
          <v-radio label="Negro" value="N"></v-radio>
          <v-radio label="Branco" value="B"></v-radio>
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

        <label for="peso">Creatinina em mg/dl</label>
        <vue-numeric-input
          id="peso"
          :min="0.1"
          :step="0.1"
          v-model="creatinina"
          width="100%"
          align="center"
          autofocus
        ></vue-numeric-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <p>Água corporal total: {{ agua_corporal_total.toFixed(1) }} L</p>
        <p>
          Clearance de creatinina:
          {{ taxa_filtracao_glomerular.toFixed(2) }} ml/min/1.73 m2
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      metricas: {},
      creatinina: 1,
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
    constantes() {
      let constantes = {
        k: null,
        alfa: null,
        raca: null,
        genero: null,
      };

      if (this.metricas.raca == "N") {
        constantes.raca = 1.159;
      } else {
        constantes.raca = 1;
      }

      if (this.metricas.sexo === "F") {
        constantes.k = 0.7;
        constantes.alfa = -0.329;
        constantes.genero = 1.018;
      } else if (this.metricas.sexo === "M") {
        constantes.k = 0.9;
        constantes.alfa = -0.411;
        constantes.genero = 1;
      } else {
        console.log("Erro ao calcular constantes (sexo não não definido?)");
      }

      return constantes;
    },
    taxa_filtracao_glomerular() {
      return (
        141 *
        Math.pow(
          Math.min(this.creatinina / this.constantes.k, 1),
          this.constantes.alfa
        ) *
        Math.pow(Math.max(this.creatinina / this.constantes.k, 1), -1.209) *
        Math.pow(0.993, this.metricas.idade) *
        this.constantes.genero *
        this.constantes.raca
      );
    },
  },
};
</script>
