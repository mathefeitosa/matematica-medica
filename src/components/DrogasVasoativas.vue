<template>
  <v-col cols="12">
    <v-card outlined>
      <v-card-title class="text-h6"> Dose das drogas vasoativas </v-card-title>
      <v-card-text>
        <p>
          <v-tooltip color="primary" top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <b>Dobutamina</b>: {{ dobutamina.min }}-{{ dobutamina.max }}
                mcg/min
              </span>
            </template>
            <span>2,5-20 mcg/kg/min</span>
          </v-tooltip>
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  computed: {
    dobutamina() {
      return { min: this.peso * 2.5, max: this.peso * 20 };
    },
    peso() {
      return this.$store.state.metricas.peso;
    },
  },
};
</script>
