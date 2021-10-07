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
        <v-col md="2">
          <Routine
            namep="titulo rutina 1"
            desc="descripcion de la rutina 1"
            :reviews="20"
            :difficulty="getDifficulty('rookie')"
            :score="normalizeScore(9)"
          />
        </v-col>
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
    //
  }),
  methods: {
    /**
     * @param   {String} difficultyString a string given by the api call.
     * @returns {Number}                  the numeric representation of the difficultyString.
     */
    getDifficulty(difficultyString) {
      switch (difficultyString) {
        case "rookie":
          return 1;
        case "beginner":
          return 2;
        case "intermediate":
          return 3;
        case "advanced":
          return 4;
        case "expert":
          return 5;
      }
    },
    /**
     * @param   {Number} score010 a score number from 0 to 10 given by the api call
     * @returns {Number}          the normalized score number (if the resulting number is float, 
     *                            the Routine component will use the integer part only. 
     *                            Resulting in {0...5} the only posibble score values)
     */
    normalizeScore(score010){
      return score010 / 2;
    }
  },
  components: {
    Routine,
  },
};
</script>
