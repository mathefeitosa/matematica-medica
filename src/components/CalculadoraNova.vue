<script>
export default {
    name: 'Calculadora',
  data() {
    return {
      title: 'Calculadora de infusão',
      concentracao_ampola_mg_ml: 1,
      volume_ampola_ml: 4,
      quantidade_de_ampolas: 4,
      peso_paciente: 70,
      volume_soro_ml: 250,
      velocidade_infusao_ml_h: 1,
    }
  },
  computed:
  {
    massa_ampolas(){
      return this.concentracao_ampola_mg_ml*this.volume_ampola_ml*this.quantidade_de_ampolas
    },
    concentracao_solucao_mg(){
      return this.massa_ampolas/this.volume_solucao_final
    },
    concentracao_solucao_mcg(){
      return (this.massa_ampolas/this.volume_solucao_final)*1000
    },
    volume_solucao_final(){
      return (this.quantidade_de_ampolas*this.volume_ampola_ml)+this.volume_soro_ml
    },
    velocidade_infusao_mg_h(){
      return (this.concentracao_solucao_mg*this.velocidade_infusao_ml_h)
    },
    velocidade_infusao_mcg_h(){
      return ((this.concentracao_solucao_mg*this.velocidade_infusao_ml_h)*1000)
    },
    velocidade_infusao_mg_min(){
      return ((this.concentracao_solucao_mg*this.velocidade_infusao_ml_h)/60)
    },
    velocidade_infusao_mcg_min(){
      return (((this.concentracao_solucao_mg*this.velocidade_infusao_ml_h)/60)*1000)
    },
    velocidade_infusao_mcg_kg_min(){
      return (((((this.concentracao_solucao_mg/this.peso_paciente)*this.velocidade_infusao_ml_h)/60))*1000)
    },
    velocidade_infusao_mcg_kg_h(){
      return ((((this.concentracao_solucao_mg/this.peso_paciente)*this.velocidade_infusao_ml_h))*1000)
    }
  },
  methods: {
    presetNoradrenalina(){
      this.concentracao_ampola_mg_ml = 1;
      this.volume_ampola_ml = 4;
      this.quantidade_de_ampolas = 4;
      this.volume_soro_ml = 250;
    },
    presetNoradrenalinaDobrada(){
      this.concentracao_ampola_mg_ml = 1;
      this.volume_ampola_ml = 4;
      this.quantidade_de_ampolas = 8;
      this.volume_soro_ml = 250;
    },
    presetFentanil(){
      this.concentracao_ampola_mg_ml = 0.05;
      this.volume_ampola_ml = 50;
      this.quantidade_de_ampolas = 1;
      this.volume_soro_ml = 200;
      this.velocidade_infusao_ml_h = 5;
    },
    presetPropofol(){
      this.concentracao_ampola_mg_ml = 10;
      this.volume_ampola_ml = 20;
      this.quantidade_de_ampolas = 1;
      this.volume_soro_ml = 0;
      this.velocidade_infusao_ml_h = 5;
    },
    presetMidazolam(){
      this.concentracao_ampola_mg_ml = 5;
      this.volume_ampola_ml = 10;
      this.quantidade_de_ampolas = 5;
      this.volume_soro_ml = 200;
      this.velocidade_infusao_ml_h = 5;
    },
  }
}
</script>

<template>
  <h1>{{ title }}</h1>
  Peso: <input type="range" v-model="peso_paciente" min="1" max="140"> <input v-model="peso_paciente"> kg<br>
  Concentração da ampola: <input v-model="concentracao_ampola_mg_ml"> mg/ml -- {{(concentracao_ampola_mg_ml*1000).toFixed()}} mcg/ml<br>
  Volume da ampola: <input v-model="volume_ampola_ml"> ml <br>
  Quantidade de ampolas: <input v-model="quantidade_de_ampolas"> ml <br>
  Volume de soro: <input v-model="volume_soro_ml"> ml<br>
  Volume final: {{volume_solucao_final}} ml <br>
  Velocidade de infusão: <input type="range" v-model="velocidade_infusao_ml_h" min="1" max="30"> <input v-model="velocidade_infusao_ml_h"> ml/h <br>
<hr>
<h4>Predefinições</h4>
<input type="button" value="Noradrenalina" @click="presetNoradrenalina"/>
<input type="button" value="Nora dobrada" @click="presetNoradrenalinaDobrada" />
<input type="button" value="Fentanil" @click="presetFentanil"/>
<input type="button" value="Propofol" @click="presetPropofol"/>
<input type="button" value="Midazolam" @click="presetMidazolam"/>
<hr>
  <h4>Concentração da solução:</h4> 
  {{concentracao_solucao_mg.toFixed(3)}} mg/ml | {{concentracao_solucao_mcg.toFixed()}} mcg/ml
  
  <h4>Dose:</h4>
  {{velocidade_infusao_mg_h.toFixed(3)}} mg/hora | {{velocidade_infusao_mcg_h.toFixed()}} mcg/hora <br>
  {{velocidade_infusao_mg_min.toFixed(3)}} mg/min | {{velocidade_infusao_mcg_min.toFixed(1)}} mcg/min <br>
  {{velocidade_infusao_mcg_kg_min.toFixed(3)}} mcg/kg/min | {{velocidade_infusao_mcg_kg_h.toFixed(3)}} mcg/kg/hora <br>
  
</template>