<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h6">
      calendário Vacinal
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-radio-group v-model="pediatria.sexo" row>
        <v-radio label="Feminino" value="F"></v-radio>
        <v-radio label="Masculino" value="M"></v-radio>
      </v-radio-group>
      <label for="peso">Peso em quilogramas (kg)</label>
      <vue-numeric-input
        id="peso"
        :min="0.5"
        :step="0.1"
        v-model="pediatria.peso"
        width="100%"
        align="center"
        autofocus
      ></vue-numeric-input>

      <v-switch label="Recém-nascido" v-model="pediatria.isRN"></v-switch>

      <label for="idade">Idade (anos)</label>
      <vue-numeric-input
        id="idadeAnos"
        :min="0"
        :max="19"
        placeholder="Meses"
        v-model="pediatria.idadeAnos"
        width="100%"
        align="center"
        autofocus
        :disabled="pediatria.isRN"
      ></vue-numeric-input>

      <label for="idade">Idade (meses)</label>
      <vue-numeric-input
        id="idadeMeses"
        :min="1"
        :step="1"
        :max="12"
        placeholder="Meses"
        v-model="pediatria.idadeMeses"
        width="100%"
        align="center"
        autofocus
        :disabled="pediatria.isRN"
      ></vue-numeric-input>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
      pediatria: {},
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
  computed: {},
};
</script>
