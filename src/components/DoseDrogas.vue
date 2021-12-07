<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h6">
      Doses ajustadas pelo peso
    </v-expansion-panel-header>
    <v-expansion-panel-content class="py-2" color="grey lighten-4">
      <p>
        <span v-bind="attrs" v-on="on">
          <b>Dobutamina</b>: {{ dobutamina.min.toFixed(0) }}-{{
            dobutamina.max.toFixed(0)
          }}
          mcg/min (2-20 mcg/kg/min)
        </span>
      </p>

      <p>
        <span v-bind="attrs" v-on="on">
          <b>Noradrenalina</b>: {{ noradrenalina.min.toFixed(2) }}-{{
            noradrenalina.max.toFixed(0)
          }}
          mcg/min (0.01-3 mcg/kg/min)
        </span>
      </p>

      <p>
        <span v-bind="attrs" v-on="on">
          <b>Fentanil (analgesia):</b> {{ fentanil.analgesia.min }}-{{
            fentanil.analgesia.max
          }}
          mcg/min (0.5-5 mcg/kg/min)
        </span>
      </p>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  computed: {
    dobutamina() {
      return { min: this.peso * 2, max: this.peso * 20 };
    },
    noradrenalina() {
      return { min: this.peso * 0.01, max: this.peso * 3 };
    },
    fentanil() {
      return { analgesia: { min: 0.5 * this.peso, max: 5 * this.peso } };
    },
    peso() {
      return this.$store.state.metricas.peso;
    },
  },
};
</script>
