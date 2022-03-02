<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h6 grey lighten-1">
      Hidratação para Recém-nascido
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <label for="volume">Volume desejado (ml/kg)</label>
      <vue-numeric-input
        id="volume"
        :step="1"
        min="0"
        v-model="volPorKg"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>

      <label for="vig"
        >Velocidade de Infusão de Glicose - VIG (mg/kg/min)</label
      >
      <vue-numeric-input
        id="vig"
        :min="4"
        :step="1"
        v-model="vig"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>

      <v-divider class="mt-5 mb-3"></v-divider>

      <div class="pb-3">
        <v-data-iterator :items="volumesTabela" hide-default-footer>
          <template v-slot:header>
            <v-row class="font-weight-bold">
              <v-col>Item</v-col>
              <v-col>Volume</v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row
              v-for="(item, index) in props.items"
              v-bind:key="index"
              :class="item._classes"
            >
              <v-col>
                {{ item.item }}
              </v-col>
              <v-col> {{ item.quantidade }} {{ item.unidade }} </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </div>

      <div class="py-3">
        <v-select
          v-model="tipoTomada"
          label="Tomadas"
          :items="['Bomba de Infusão', '6/6h', '8/8h', '12/12h']"
        ></v-select>
      </div>

      <p><b>Prescrição:</b></p>
      <p>{{ prescricao }}</p>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
      pediatria: {},
      vig: 7,
      volPorKg: 140,
      tipoTomada: "Bomba de Infusão",
      alertaPrescricao: false,
      constantes: {
        NACL20: 0.88235, // NaCl a 20%: 1 ml = 3,4 mEq/L | 3 mEq/kg/dia (peso*3/3,4)
        KCL19: 0.8, // KCl a 19,1%: 1 ml = 2,5 mEq/L | 2 mEq/kg/dia (peso*2/2,5)
        MGSO4: 0.375, //MgSO4 a 10%:1 ml = 0,8 mEq/L | 0,3 mEq/kg/dia (peso*0,3/0,8)
      },
    };
  },
  watch: {
    pediatria: function () {
      this.$store.state.pediatria = this.pediatria;
    },
  },
  beforeMount() {
    this.pediatria = this.$store.state.pediatria;
  },
  computed: {
    //Controle de nome de variáveis.
    peso() {
      return this.pediatria.peso;
    },

    // Calculo dos volumes dos eletrólitos
    volNACL() {
      return this.peso * this.constantes.NACL20;
    },
    volKCL() {
      return this.peso * this.constantes.KCL19;
    },
    volMGSO4() {
      return this.peso * this.constantes.MGSO4;
    },
    volGlucCalc() {
      return this.peso;
    },
    volEletrolitos() {
      return this.volNACL + this.volKCL + this.volMGSO4 + this.volGlucCalc;
    },

    // Calculo do volume da proporção de glicose 5% e 50%
    gramasDeGlicose() {
      return this.vig * this.pediatria.peso * 1.44;
    },
    volumeGlicFinal() {
      return this.volTotal - this.volEletrolitos;
    },
    concentracaoGlicose() {
      return (100 * this.gramasDeGlicose) / this.volumeGlicFinal;
    },
    difGlic50_concFinal() {
      return 50 - this.concentracaoGlicose;
    },
    difGlic05_concFinal() {
      return this.concentracaoGlicose - 5;
    },
    volGlic50() {
      return (
        (this.volumeGlicFinal * this.difGlic50_concFinal) /
        (this.difGlic50_concFinal + this.difGlic05_concFinal)
      );
    },
    volGlic05() {
      return (
        (this.volumeGlicFinal * this.difGlic05_concFinal) /
        (this.difGlic50_concFinal + this.difGlic05_concFinal)
      );
    },

    //Outros calculos
    volTotal() {
      return this.peso * this.volPorKg;
    },

    //Elaborando dados para inserção em tabela
    volumesTabela() {
      return [
        {
          item: "Gramas de Glicose",
          quantidade: this.gramasDeGlicose.toFixed(2),
          unidade: "g/dia",
          _classes: "",
        },
        {
          item: "Soro Glicosado 5%",
          quantidade: this.volGlic05.toFixed(1),
          unidade: "ml/dia",
          _classes: "",
        },
        {
          item: "Glicose à 50%",
          quantidade: this.volGlic50.toFixed(1),
          unidade: "ml/dia",
          _classes: "",
        },
        {
          item: "NaCl à 20%",
          quantidade: this.volNACL.toFixed(1),
          unidade: "ml/dia",
          _classes: "",
        },
        {
          item: "KCl à 19,1%",
          quantidade: this.volKCL.toFixed(1),
          unidade: "ml/dia",
          _classes: "",
        },
        {
          item: "Magnésio à 10%",
          quantidade: this.volMGSO4.toFixed(1),
          unidade: "ml/dia",
          _classes: "",
        },
        {
          item: "Gluconato de Cálcio à 10%",
          quantidade: this.volGlucCalc.toFixed(1),
          unidade: "ml/dia",
          _classes: "",
        },
        {
          item: "Volume Total",
          quantidade: this.volTotal.toFixed(1),
          unidade: "ml/dia",
          _classes: "font-weight-bold green lighten-2",
        },
      ];
    },
    prescricao() {
      let string;
      switch (this.tipoTomada) {
        case "Bomba de Infusão":
          string = `
            SG5% ${this.volGlic05.toFixed(1)} ml +
            G50% ${this.volGlic50.toFixed(1)} ml +
            NaCl 20% ${this.volNACL.toFixed(1)} ml +
            KCl 19,1% ${this.volKCL.toFixed(1)} ml +
            MgSO4 10% ${this.volMGSO4.toFixed(1)} ml +
            Gluc. de Cálcio 10% ${this.volGlucCalc.toFixed(
              1
            )} ml, EV, em 24h na BIC à
            ${(this.volTotal / 24).toFixed(1)} ml/h.
             `;
          return string;
        case "6/6h":
          string = `
            ${(this.volGlic05 / 4).toFixed(1)} ml SG5% +
            ${(this.volGlic50 / 4).toFixed(1)} ml G50% +
            ${(this.volNACL / 4).toFixed(1)} ml NaCl 20% +
            ${(this.volKCL / 4).toFixed(1)} ml KCl 19,1% +
            ${(this.volMGSO4 / 4).toFixed(1)} ml MgSO4 10% +
            ${(this.volGlucCalc / 4).toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, de 6/6h.`;
          return string;
        case "8/8h":
          string = `
            ${(this.volGlic05 / 3).toFixed(1)} ml SG5% +
            ${(this.volGlic50 / 3).toFixed(1)} ml G50% +
            ${(this.volNACL / 3).toFixed(1)} ml NaCl 20% +
            ${(this.volKCL / 3).toFixed(1)} ml KCl 19,1% +
            ${(this.volMGSO4 / 3).toFixed(1)} ml MgSO4 10% +
            ${(this.volGlucCalc / 3).toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, de 8/8h.`;
          return string;
        case "12/12h":
          string = `
            ${(this.volGlic05 / 2).toFixed(1)} ml SG5% +
            ${(this.volGlic50 / 2).toFixed(1)} ml G50% +
            ${(this.volNACL / 2).toFixed(1)} ml NaCl 20% +
            ${(this.volKCL / 2).toFixed(1)} ml KCl 19,1% +
            ${(this.volMGSO4 / 2).toFixed(1)} ml MgSO4 10% +
            ${(this.volGlucCalc / 2).toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, de 12/12h.`;
          return string;
        default:
          return "Opção não encontrada.";
      }
    },
  },
};
</script>
