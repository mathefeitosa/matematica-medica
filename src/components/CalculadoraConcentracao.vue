<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h6 font-weight-black grey lighten-1">
      Calculadora de infusão
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p class="pt-2 subtitle-1 font-weight-bold">Pré-definições</p>
      <div class="d-flex flex-wrap justify-center mb-6">
        <v-btn
          class="ma-1 grey lighten-3"
          small
          elevation="0"
          value="noradrenalina_4_ap"
          @click="valores_predefinidos('noradrenalina_4_ap')"
        >
          Nora 4 ap
        </v-btn>
        <v-btn
          class="ma-1 grey lighten-3"
          elevation="0"
          small
          value="noradrenalina_8_ap"
          @click="valores_predefinidos('noradrenalina_8_ap')"
        >
          Nora 8 ap
        </v-btn>
        <v-btn
          class="ma-1 grey lighten-3"
          elevation="0"
          small
          value="dobutamina"
          @click="valores_predefinidos('dobutamina')"
        >
          Dobuta 4 AMP
        </v-btn>
        <v-btn
          class="ma-1 grey lighten-3"
          elevation="0"
          small
          value="fentanil"
          @click="valores_predefinidos('fentanil')"
        >
          Fentanil 1 AMP
        </v-btn>
        <v-btn
          class="ma-1 grey lighten-3"
          elevation="0"
          small
          value="dopamina"
          @click="valores_predefinidos('dopamina')"
        >
          Dopamina 2 AMP
        </v-btn>
        <v-btn
          class="ma-1 grey lighten-3"
          elevation="0"
          small
          value="midazolam"
          @click="valores_predefinidos('midazolam')"
        >
          Midazolam 20 ML
        </v-btn>
      </div>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <p class="subtitle-1">Concentração da ampola</p>
      <div class="d-flex flex justify-center align-center">
        <div class="d-flex justify-center">
          <v-radio-group v-model="calculadora.modo_concentracao" row>
            <v-radio label="mcg/ml" value="mcg/ml"></v-radio>
            <v-radio label="mg/ml" value="mg/ml"></v-radio>
          </v-radio-group>
        </div>
        <div>
          <vue-numeric-input
            id="concentracao_ampola"
            :min="0"
            v-model="calculadora.concentracao_ampola"
            width="100%"
            align="center"
            autofocus
          ></vue-numeric-input>
        </div>
      </div>
      <label for="volume_ampola"> Volume da ampola (ml) </label>
      <vue-numeric-input
        id="volume_ampola"
        :min="0"
        v-model="calculadora.volume_ampola"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>

      <label for="volume_ampola"> Número de ampolas </label>
      <vue-numeric-input
        id="numero_ampolas"
        :min="0"
        v-model="calculadora.numero_ampolas"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>

      <label for="volume_ampola"> Volume final da solução (ml)</label>
      <vue-numeric-input
        id="volume_final"
        :min="calculadora.numero_ampolas * calculadora.volume_ampola"
        v-model="calculadora.volume_final"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>

      <v-alert
        v-if="
          calculadora.numero_ampolas * calculadora.volume_ampola >
          calculadora.volume_final
        "
        class="my-4"
        border="left"
        color="red"
        type="error"
        text
      >
        O volume final da solução não pode ser menor que o volume total das
        ampolas. ({{ calculadora.numero_ampolas * calculadora.volume_ampola }}
        mL)
      </v-alert>
    </v-expansion-panel-content>
    <v-expansion-panel-content color="red  lighten-5" class="py-3">
      <label for="infusao">Velocidade de infusão (ml/h)</label>
      <vue-numeric-input
        id="infusao"
        :min="0"
        v-model="calculadora.infusao"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>
    </v-expansion-panel-content>
    <v-expansion-panel-content color="yellow lighten-3" class="py-3">
      <p>
        Peso do paciente: <b>{{ $store.state.metricas.peso }} kg</b>
      </p>
      <v-divider class="my-4"></v-divider>
      <p>
        Adicionar
        <b>{{ calculadora.numero_ampolas * calculadora.volume_ampola }} ml</b>
        da droga em <b>{{ concentracao.volume_soro }} ml</b> de soro.
      </p>
      <p>
        <b>Concentração final</b>:
        {{ concentracao.concentracao.toFixed(3) }} mg/ml •
        {{ (concentracao.concentracao * 1000).toFixed(0) }} mcg/ml
      </p>

      <b>Dose da infusão</b>: {{ dose.toFixed(2) }} mcg/kg/min •
      {{ (dose * metricas.peso).toFixed(2) }}
      mcg/min
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "Drogas",
  data() {
    return {
      calculadora: {
        concentracao_ampola: 2,
        modo_concentracao: "mg/ml",
        volume_ampola: 4,
        numero_ampolas: 4,
        volume_final: 250,
        volume_soro: 0,
        infusao: 5,
      },
      preset: "",
    };
  },
  computed: {
    conversao_mcg() {
      if (this.calculadora.modo_concentracao == "mg/ml") {
        return 1;
      } else if (this.calculadora.modo_concentracao == "mcg/ml") {
        return 1000;
      }
      return 1;
    },
    dose() {
      return (
        (this.calculadora.infusao * 1000 * this.concentracao.concentracao) /
        (60 * this.metricas.peso)
      );
    },
    concentracao() {
      let concentracao =
        this.calculadora.concentracao_ampola / this.conversao_mcg;
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
    concentracao_porcentagem() {
      return this.concentracao.concentracao / 10;
    },
    metricas() {
      return this.$store.state.metricas;
    },
  },
  methods: {
    valores_predefinidos(droga) {
      switch (droga) {
        case "dobutamina":
          this.calculadora.modo_concentracao = "mg/ml";
          this.calculadora.volume_ampola = 20;
          this.calculadora.numero_ampolas = 4;
          this.calculadora.concentracao_ampola = 12.5;
          this.calculadora.volume_final = 250;
          break;
        case "dopamina":
          this.calculadora.modo_concentracao = "mg/ml";
          this.calculadora.volume_ampola = 5;
          this.calculadora.numero_ampolas = 2;
          this.calculadora.concentracao_ampola = 40;
          this.calculadora.volume_final = 250;
          break;
        case "noradrenalina_4_ap":
          this.calculadora.modo_concentracao = "mg/ml";
          this.calculadora.volume_ampola = 4;
          this.calculadora.numero_ampolas = 4;
          this.calculadora.concentracao_ampola = 1;
          this.calculadora.volume_final = 250;
          break;
        case "noradrenalina_8_ap":
          this.calculadora.modo_concentracao = "mg/ml";
          this.calculadora.volume_ampola = 4;
          this.calculadora.numero_ampolas = 8;
          this.calculadora.concentracao_ampola = 1;
          this.calculadora.volume_final = 250;
          break;
        case "fentanil":
          this.calculadora.modo_concentracao = "mcg/ml";
          this.calculadora.volume_ampola = 20;
          this.calculadora.numero_ampolas = 1;
          this.calculadora.concentracao_ampola = 50;
          this.calculadora.volume_final = 120;
          break;
        case "midazolam":
          this.calculadora.modo_concentracao = "mg/ml";
          this.calculadora.volume_ampola = 15;
          this.calculadora.numero_ampolas = 1.3333333333333333;
          this.calculadora.concentracao_ampola = 5;
          this.calculadora.volume_final = 100;
          break;
        default:
          console.log("Prefedinição de droga desconhecida!");
          break;
      }
    },
  },
};
</script>
