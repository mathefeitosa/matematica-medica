<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h6 grey lighten-1">
      Dados do paciente
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <div class="d-flex flex-row justify-center">
        <v-spacer></v-spacer>
        <v-radio-group v-model="metricas.sexo">
          <v-radio label="Mulher" value="F" color="pink"></v-radio>
          <v-radio label="Homem" value="M" color="light-blue"></v-radio>
        </v-radio-group>
        <v-spacer></v-spacer>
        <v-radio-group v-model="metricas.raca">
          <v-radio label="Negro" value="N" color="brown darken-1"></v-radio>
          <v-radio label="Branco" value="B" color="brown lighten-4"></v-radio>
        </v-radio-group>
        <v-spacer></v-spacer>
      </div>

      <label for="peso">Peso (kg)</label>
      <vue-numeric-input
        id="peso"
        :min="0"
        v-model="metricas.peso"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>
      <v-slider
        hide-details=""
        v-model="metricas.peso"
        max="150"
        min="0"
        step="1"
        persistent-hint
      ></v-slider>

      <v-divider class="my-1"></v-divider>

      <label for="idade">Idade (anos)</label>
      <vue-numeric-input
        id="idade"
        :min="0"
        :max="100"
        placeholder="Idade"
        v-model="metricas.idade"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>
      <v-slider
        hide-details=""
        v-model="metricas.idade"
        max="100"
        min="0"
        step="1"
        persistent-hint
      ></v-slider>

      <v-divider class="my-1"></v-divider>

      <label for="peso">Creatinina (mg/dL)</label>
      <vue-numeric-input
        id="peso"
        :min="0.1"
        :step="0.1"
        v-model="creatinina"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>
      <v-slider
        hide-details=""
        v-model="creatinina"
        max="15"
        min="0"
        step="0.1"
        persistent-hint
      ></v-slider>
      <v-divider class="my-1"></v-divider>
    </v-expansion-panel-content>

    <v-expansion-panel-content color="grey lighten-4" class="py-3">
      <p><b>Água corporal total</b>: {{ agua_corporal_total.toFixed(1) }} L</p>
      <p>
        <b>Clr. de creatinina (CKD-EPI)</b>:
        {{ taxa_filtracao_glomerular.toFixed(2) }} mL/min/1,73 m²
      </p>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
