<template>
  <div>
    <v-container class="primary lighten-5" fluid>
        <v-row align="end">
          <v-col md="2" />
          <v-col md="6" class="left">
            <tit class="titulazos">Tus rutinas</tit>
          </v-col>
          <v-col md="4">
            <v-btn
              text
              color="primary"
              x-large
              append
              @click="routerPush()"
              ><h3>Agregar nueva rutina</h3></v-btn
            >
          </v-col>
        </v-row>

        <v-row justify="center">
        <v-container>
          <v-row justify="center">
            <v-col md="8">
              <v-container>
                <v-row>
                  <v-col md="3" v-for="r in userRoutines" v-bind:key="r.id">
                    <div
                      @click="
                        $refs.nav.toggleDrawer(
                          r.id,
                          r.intensity,
                          r.score,
                          r.name,
                          r.detail
                        )
                      "
                    >
                      <Routine 
                        :id="r.id"
                        :namep="r.name"
                        :desc="r.detail"
                        :difficulty="r.intensity"
                        :score="r.score"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
    


      <v-row align="end">
          <v-col md="2" />
          <v-col md="6" class="left">
            <tit class="titulazos">Tus ejercicios</tit>
          </v-col>
          <v-col align="center" md="2">
            <NewExercise/>
          </v-col>
          <v-col md="2"/>
        </v-row>
    
      <!--<v-row align="end">
        <v-col md="6" class="left">
          <tit class="titulazos">Tus Ejercicios</tit>
        </v-col>
        <v-col><NewExercise/></v-col>
      </v-row> -->
      <v-row justify="center">
        <v-container>
          <v-row justify="center">
            <v-col md="8">
              <v-container>
                <v-row>
                  <v-col md="3" v-for="(exc, index) in excercises" v-bind:key="index">
                    <ExerciseCard namep="Estocadas" desc="fortalecimiento"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    <ModifyNavDrawer ref="nav" style="navigate"/>
  </div>
</template>

<style>
.titulazos {
  font-size: 80px;
  vertical-align: bottom;
}
.navigate{
  position:fixed; 
  top:0; 
  right:0; 
  overflow-y:scroll;
}
.view-more {
  font-size: 25px;
  color: #6200ee;
  vertical-align: middle;
}
</style>

<script>
import Routine from "../components/Routine.vue";
import NewExercise from "../components/NewExercise.vue";
import ExerciseCard from "../components/ExerciseCard.vue";
import ModifyNavDrawer from "../components/ModifyNavDrawer.vue";

import { mapActions } from "vuex";

export default {
  name: "AllYourR&E",

  data: () => ({
    excercises: [1,2,3,4,5,6,7,8,8,8,8,8],
    result: null, 
    controller: null, 
    userRoutines: [],
  }),
  components: {
    NewExercise,
    ExerciseCard,
    Routine,
    ModifyNavDrawer
  },

  created() {
    this.getUserRoutines();
  },

  methods: {
    ...mapActions('routine', {
      $getUserRoutines: 'getUserRoutines'
    }),

    setResult(result){
      this.result = result;
    },

    mapIntensity(intensity) {
      switch (intensity) {
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

    mapScore(score) {
      return score / 2;
    },

    setRoutines() {
      for (let i = 0; i < this.result.content.length; i++) {
        const r = this.result.content[i];
        this.userRoutines.push({
          id: r.id,
          name: r.name,
          detail: r.detail,
          intensity: this.mapIntensity(r.difficulty),
          score: this.mapScore(r.score),
        });
      }
    },

    async getUserRoutines(){
      try{
        //this.controller = new AbortController();
        const userRoutines = await this.$getUserRoutines(this.controller);
        //this.controller = null;
        this.setResult(userRoutines);
        this.setRoutines();
      } catch (e) {
        this.setResult(e);
      }
    },

    routerPush() {
      this.$router.push({
        name: "Home",
      });
    },
  },

};
</script>