
<!-- 

<div>
    <v-container v-for="cat in categories2" v-bind:key="cat" fluid>


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
              @click="routerPush(cat.name)"
              ><h3>Agregar nueva rutina</h3></v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            md="2"
            v-for="eachroutine in categories"
            v-bind:key="eachroutine"
          >
            <div
              :to='' redirecciono a la página de kako
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
        </v-row>
      </v-container>


    </v-container>
    <h1>{{ routiness[0] }}</h1> 
    <NavDrawer ref="nav" />
    <v-btn>HolaHola</v-btn>
  </div>
-->

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
                  <v-col md="3" v-for="(exc, index) in excercises" v-bind:key="index">
                    <EditRoutine 
                      namep="Piola"
                      desc="Nashe"
                      :reviews="20"
                      :difficulty="5"
                      :score="10"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
    <v-container>


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
import EditRoutine from "../components/EditRoutine.vue";
import NewExercise from "../components/NewExercise.vue";
import ExerciseCard from "../components/ExerciseCard.vue";

export default {
  name: "AllYourR&E",

  data: () => ({
    excercises: [1,2,3,4,5,6,7,8,8,8,8,8]
    // routines: [{}, {}]
  }),
  methods: {
      routerPush() {
      this.$router.push({
        name: "Home",
      });
    },
  },
  components: {
    NewExercise,
    ExerciseCard,
    EditRoutine
  },
};
</script>