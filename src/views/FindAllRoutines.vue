<template>
  <div>
    <v-container class="primary lighten-5" fluid>
      <NavDrawer ref="nav" />
      <v-row align="end">
        <v-col md="2" />
        <v-col md="6" class="left">
          <tit class="titulazos">{{ this.$route.params.category }}</tit>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="8">
          <v-row>
            <v-col md="3" v-for="eachroutine in favs" v-bind:key="eachroutine">
              <div
                @click="
                  $refs.nav.toggleDrawer(
                    getDifficulty(eachroutine.diff),
                    normalizeScore(eachroutine.score),
                    eachroutine.title,
                    eachroutine.desc
                  )
                "
              >
                <Routine
                  :namep="eachroutine.title"
                  :desc="eachroutine.desc"
                  :reviews="20"
                  :difficulty="getDifficulty(eachroutine.diff)"
                  :score="normalizeScore(eachroutine.score)"
                />
              </div>
            </v-col>
            <!-- <v-col md="2">
                    <div @click="$refs.nav.toggleDrawer(getDifficulty('rookie'), normalizeScore(9), 'titulo rutina 1', 'descripcion de la rutina 1')">
                        <Routine :reviews="22"  />
                    </div>
                    </v-col>
                    <v-col md="2"><Routine /></v-col>
                    <v-col md="2"><Routine /></v-col> -->
          </v-row>
        </v-col>
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
import NavDrawer from "../components/NavigationDrawer.vue";

export default {
  name: "FindRoutine",

  data: () => ({
    favs: [
      {
        title: "Principiantes I",
        desc: "Rutina para gente que arranca a entrenar",
        score: 9,
        diff: "rookie",
      },
      {
        title: "Principiantes II",
        desc: "Rutina para gente que lleva un tiempo entrenando",
        score: 8,
        diff: "intermediate",
      },
      {
        title: "Rutina de Toro",
        desc: "Rutina excigente para deportistas experimentados",
        score: 10,
        diff: "expert",
      },
      {
        title: "Rutina pikante",
        desc: "Para quedar más duro que cachetazo de padrastro",
        score: 4,
        diff: "advanced",
      },
      {
        title: "Rutina pikante",
        desc: "Para quedar más duro que cachetazo de padrastro",
        score: 4,
        diff: "advanced",
      },
      {
        title: "Rutina pikante",
        desc: "Para quedar más duro que cachetazo de padrastro",
        score: 4,
        diff: "advanced",
      },
      {
        title: "Rutina pikante",
        desc: "Para quedar más duro que cachetazo de padrastro",
        score: 4,
        diff: "advanced",
      },
      {
        title: "Rutina pikante",
        desc: "Para quedar más duro que cachetazo de padrastro",
        score: 4,
        diff: "advanced",
      },
      {
        title: "Rutina pikante",
        desc: "Para quedar más duro que cachetazo de padrastro",
        score: 4,
        diff: "advanced",
      },
    ],
  }),
  methods: {
    /**
     * @param   {String} difficultyString a string given by the api call.
     * @returns {Number}                  the numeric representation of the difficultyString.
     */
    getDifficulty(difficultyString) {
      //debería pasarsele el id de la rutina para luego extraer la dificultad
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
    //debería pasarsele el id de la rutina para luego extraer el score
    normalizeScore(score010) {
      return score010 / 2;
    },
    /* getTitle(id){
      return ;
    },
    getDesc(id){
      return ;
    } */
  },
  components: {
    Routine,
    NavDrawer,
  },
};
</script>
