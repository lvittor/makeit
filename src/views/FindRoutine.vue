<template>
  <div>
    <v-container v-for="cat in categories2" v-bind:key="cat" fluid>
      <v-container class="primary lighten-5" fluid>
        <v-row align="end">
          <v-col md="2" />
          <v-col md="6" class="left">
            <tit class="titulazos">{{ cat.name }}</tit>
          </v-col>
          <v-col md="4">
            <v-btn
              text
              color="primary"
              x-large
              append
              @click="routerPush(cat.name)"
              ><h3>Ver más</h3></v-btn
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
        </v-row>
      </v-container>
    </v-container>
    <h1>{{ routiness[0] }}</h1> 
    <NavDrawer ref="nav" />
    <v-btn>HolaHola</v-btn>
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
import { mapActions } from "vuex";
//import {Routine} from "../api/routine";

export default {
  name: "FindRoutine",

  data: () => ({
    categories: [
      {
        name: "Favoritas",
        list: [
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
        ],
        route: "/find-all-routines",
      },
      {
        name: "Funcional",
        list: [
          {
            title: "Me",
            desc: "Rutina para gente que arranca a entrenar",
            score: 9,
            diff: "rookie",
          },
          {
            title: "quiero",
            desc: "Rutina para gente que lleva un tiempo entrenando",
            score: 8,
            diff: "intermediate",
          },
          {
            title: "pegar",
            desc: "Rutina excigente para deportistas experimentados",
            score: 10,
            diff: "expert",
          },
          {
            title: "un",
            desc: "Para quedar más duro que cachetazo de padrastro",
            score: 4,
            diff: "advanced",
          },
        ],
      },
      {
        name: "Aeróbico",
        list: [
          {
            title: "tiro",
            desc: "Rutina para gente que arranca a entrenar",
            score: 9,
            diff: "rookie",
          },
          {
            title: "en",
            desc: "Rutina para gente que lleva un tiempo entrenando",
            score: 8,
            diff: "intermediate",
          },
          {
            title: "la",
            desc: "Rutina excigente para deportistas experimentados",
            score: 10,
            diff: "expert",
          },
          {
            title: "frente",
            desc: "Para quedar más duro que cachetazo de padrastro",
            score: 4,
            diff: "advanced",
          },
        ],
      },
    ],

    Funcional: null,
    Aerobico: null,
    Hitt: null,
    Elongación: null,
    result: null,
    controller: null,
    categories2: null,

    routiness: [],

    //... y los vectores de 4 ids dependiendo las categoría
  }),

  created(){
    alert('Llamo al metodo created')
    this.getAllCategories().then(
      () => {
        for (let i = 0; i < this.categories2.length ; i++) {
          alert("Categoría a parsear: "+ JSON.stringify(this.categories2[i]))
          this.routiness[i] = this.getFourRoutinesPicado(this.categories2[i].id);
          alert("Vector de 4 rutinas: "+ JSON.stringify(this.routiness[i]))
        } 
      }
    )
  },

  methods: {
    routerPush(categoryName) {
      this.$router.push({
        name: "FindAllRoutines",
        params: { category: categoryName },
      });
    },
    ...mapActions('category', {
      $getAllCategories: 'getAll',
    }),
    ...mapActions('routine', {
      //$createRoutine: 'create',
      //$modifyRoutine: 'modify',
      //$deleteRoutine: 'delete',
      //$getRoutine: 'get',
      $getAllRoutines: 'getAll',
      $getFourRoutines: 'getFour',
    }),
    async getAllCategories() {
      alert("Cargo categories2 con todas las categorias")
      try {
        const cat = await this.$getAllCategories();
        this.categories2 = cat.content
        alert("Categorias: " + JSON.stringify(this.categories2))
        //this.setCategories(categories)
      } catch(e) {
        this.clearCateogries(e)
      }
    },
    async getAllRoutines() {
      try {
        this.controller = new AbortController() //???
        const routines = await this.$getAllRoutines();
        this.controller = null
        this.setResult(routines)
      } catch(e) {
        this.clearResult(e)
      }
    },
    /* async createRoutine() {
      const index = Math.floor(Math.random() * (999 - 1) + 1)
      const routine = new Routine(null, `sport ${index}`, `sport ${index}`);
      try {
        this.sport = await this.$createRoutine(routine);
        this.setResult(this.routine)
      } catch (e) {
        this.setResult(e)
      }
    }, */
    setResult(result) {
      this.result = JSON.parse(result, null, 2);
    },
    clearResult() {
      this.result = null;
    },
    setCategories(cat) {
      this.categories2 = JSON.parse(cat, null, 2);
    },
    clearCateogries() {
      this.categories2 = null;
    },
    async getFourRoutinesPicado(cat) {
      try {
        alert("Entré")
        const routine = await this.$getFourRoutines(cat);
        alert("Salí: " + JSON.stringify(routine))
        //this.setResult(routine);
        return routine
      } catch (e) {
        this.setResult(e);
      }
    },
    //getCatRoutines(categoryName){

    //},
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
