<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h6">
      Dose das drogas vasoativas
    </v-expansion-panel-header>
    <v-expansion-panel-content class="py-2" color="grey lighten-4">
      <p>
        <v-tooltip color="secondary" top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <b>Dobutamina</b>: {{ dobutamina.min.toFixed(0) }}-{{
                dobutamina.max.toFixed(0)
              }}
              mcg/min
            </span>
          </template>
          <span>2-20 mcg/kg/min</span>
        </v-tooltip>
      </p>
      <p>
        <v-tooltip color="secondary" top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <b>Noradrenalina</b>: {{ noradrenalina.min.toFixed(2) }}-{{
                noradrenalina.max.toFixed(0)
              }}
              mcg/min
            </span>
          </template>
          <span>0.01-3 mcg/kg/min</span>
        </v-tooltip>
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
    peso() {
      return this.$store.state.metricas.peso;
    },
  },
};
</script>
