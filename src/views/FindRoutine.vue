<template>
  <div>
    <v-container class="primary lighten-5" fluid>
      <v-row align="end">
        <v-col md="2" />
        <v-col md="6" class="left">
          <tit class="titulazos">Favoritas</tit>
        </v-col>
        <v-col md="4">
          <more class="view-more">Ver más rutinas favoritas</more>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="2"
          ><Routine namep="titulo rutina 1" desc="descripcion de la rutina 1" :reviews="20"
        /></v-col>
        <v-col md="2"><Routine :reviews="22" /></v-col>
        <v-col md="2"><Routine /></v-col>
        <v-col md="2"><Routine /></v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row align="end">
        <v-col md="2" />
        <v-col md="6" class="left">
          <tit class="titulazos">De Categoría X</tit>
        </v-col>
        <v-col md="4" class="left">
          <more class="view-more">Ver más rutinas X</more>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="2"><Routine /></v-col>
        <v-col md="2"><Routine /></v-col>
        <v-col md="2"><Routine /></v-col>
        <v-col md="2"><Routine /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.titulazos {
  font-size: 80px;
  vertical-align: bottom;
}

.view-more {
  font-size: 25px;
  color: #6200ee;
  vertical-align: middle;
}
</style>

<script>
import Routine from "../components/Routine.vue";

export default {
  name: "FindRoutine",

  data: () => ({
    // routines: [{}, {}]
  }),

  components: {
    Routine,
  },
};
</script>
