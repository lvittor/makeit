<template>
  <div>
    <v-container v-for="cat in routinesByCat" v-bind:key="cat.category.id" fluid>
      <v-container class="primary lighten-5" fluid>
        <v-row align="end">
          <v-col md="2" />
          <v-col md="6" class="left">
            <tit class="titulazos">{{ cat.category.name }}</tit>
          </v-col>
          <v-col md="4">
            <v-btn
              text
              color="primary"
              x-large
              append
              @click="routerPush(cat.category)"
              ><h3>Ver más</h3></v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            md="2"
            v-for="eachroutine in cat.routines"
            v-bind:key="eachroutine.id"
          >
            <div
              @click="
                $refs.nav.toggleDrawer(
                  getDifficulty(eachroutine.difficulty),
                  normalizeScore(eachroutine.score),
                  eachroutine.name,
                  eachroutine.detail,
                  eachroutine.id
                )
              "
            >
              <Routine
                :namep="eachroutine.name"
                :desc="eachroutine.detail"
                :difficulty="getDifficulty(eachroutine.difficulty)"
                :score="normalizeScore(eachroutine.score)"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <NavDrawer ref="nav" />
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
import RoutineHelper from "@/RoutineHelper.js";

export default {
  name: "FindRoutine",

  data: () => ({
    controller: null,
    categories2: null,
    routinesByCat: [],
    routiness: [],

  }),

  created(){
    this.loadData()
  },

  

  methods: {

    async loadData(){
      await this.getAllCategories()
      for(var i = 0 ; i < this.categories2.length ; ++i){
        const fourRoutines = await this.getFourRoutines(this.categories2[i].id)
        if(fourRoutines.totalCount > 0){
          this.routinesByCat.push({ category: this.categories2[i], routines:fourRoutines.content })
        }
       
      }
    },

    async getFourRoutines(cat) {
      try {
        const fourRoutines = await this.$getFourRoutines(cat);
        return fourRoutines 
      } catch (e) {
        this.setResult(e);
      }
    },

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
      try {
        const cat = await this.$getAllCategories();
        this.categories2 = cat.content
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

    getDifficulty(difficultyString) {
      return RoutineHelper.getDifficulty(difficultyString)
    },
    normalizeScore(score010) {
      return RoutineHelper.normalizeScore(score010)
    },



  },
  components: {
    Routine,
    NavDrawer,
  },
};
</script>
