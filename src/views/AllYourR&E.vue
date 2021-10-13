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
              color="primary"
              dark
              x-large
              append
              @click="routerPush()"
              >
              <h3>Agregar nueva rutina</h3></v-btn
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
      <div class="text-center">
        <v-pagination
          v-model="routinepage"
          :length="routinetotalPages"
          :total-visible="7"
          class="my-4"
          @input="changeRoutinePage()"
        ></v-pagination>
      </div>
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
                  <v-col md="3" v-for="exc in userExercises" v-bind:key="exc.id">
                    <ExerciseCard :id="exc.id" :namep="exc.name" :desc="exc.detail"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          class="my-4"
          @input="changeExercisePage()"
        ></v-pagination>
      </div>
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
    routinepage: 1,
    routinetotalPages: 2,
    page: 1,
    totalPages: 2,
    result: null, 
    controller: null, 
    userRoutines: [],
    userExercises: [],
    creationEx: 0,
  }),
  components: {
    NewExercise,
    ExerciseCard,
    Routine,
    ModifyNavDrawer,
  },

  created() {

    this.loadRoutineData();
    //this.getUserRoutines();
    //this.getAllUserExercises();
    this.loadExerciseData()
  },

  mounted(){
    this.$root.$on('update', () => {
       if (this.userRoutines.length == 1 && this.routinepage!=0){
        this.routinepage = this.routinepage-1
      }
      this.loadRoutineData();
    })
    this.$root.$on('exerciseCreated', () => {
      this.loadExerciseData();
    })
    this.$root.$on('exerciseDeleted', ()=> {
      if (this.userExercises.length == 0 && this.page!=0){
        this.page = this.page-1
      }
      this.loadExerciseData();
    })
    this.$root.$on('updateExercise', ()=> {
      this.loadExerciseData();
    })
  },

  methods: {
    ...mapActions('routine', {
      $getRoutinePage: 'getRoutinePage',
    }),
    ...mapActions('exercise', {
      $getAllUserExercises: 'getAll',
      $getExercisePage: 'getExercisesPage'
    }),

    async loadExerciseData(){
      this.userExercises = await this.getExercisePage(this.page-1)
      this.totalPages = Math.ceil((this.userExercises.totalCount)/12)
      this.userExercises = this.userExercises.content
    },

    async loadRoutineData(){
      const userRoutines = await this.$getRoutinePage(this.routinepage-1);
      this.routinetotalPages = Math.ceil((userRoutines.totalCount)/12)
      this.setResult(userRoutines)
      this.setRoutines();
    },

    setResult(result){
      this.result = result;
    },
    async changeExercisePage(){
      this.userExercises = await this.getExercisePage(this.page-1)
      this.userExercises = this.userExercises.content
    },

    async changeRoutinePage(){
      const userRoutines = await this.$getRoutinePage(this.routinepage-1);
      this.setResult(userRoutines)
      this.setRoutines();
    },


    async getExercisePage(page) {
      try {
        const exercises = await this.$getExercisePage(page);
        return exercises 
      } catch (e) {
        alert("ERROR")
        this.setResult(e);
      }
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
      this.userRoutines = []
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
        const userRoutines = await this.$getUserRoutines(this.controller);
        this.setResult(userRoutines);
        this.setRoutines();
      } catch (e) {
        alert("ERROR getUserRoutines");
        this.setResult(e);
      }
    },

    setExercises(exercises){
      this.userExercises = exercises.content;
    },

    async getAllUserExercises(){
      try{
        const exercises = await this.$getAllUserExercises(this.controller);
        this.setExercises(exercises);
      } catch(e){
        alert("ERROR getAllUserExercises");
        this.setResult(e)
      }
    },
    routerPush() {
      this.$router.push({
        name: "CreateRoutine",
      });
    },
  },

};
</script>