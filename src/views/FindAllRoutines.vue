<template>
  <div>
    <v-container class="primary lighten-5" fluid>
      <NavDrawer ref="nav" />
      
      <v-row align="end">
        <v-col md="2" />
        <v-col md="6" class="left">
          <tit class="titulazos">{{ this.$route.params.category.name }}</tit>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="8">
          <v-row>
            <v-col md="3" v-for="eachroutine in routines" v-bind:key="eachroutine.id">
              <div
                @click="
                  $refs.nav.toggleDrawer(
                    getDifficulty(eachroutine.difficulty),
                    normalizeScore(eachroutine.score),
                    eachroutine.name,
                    eachroutine.detail
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
    <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="7"
      @input="changePage()"
    ></v-pagination>
  </div>
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
import RoutineHelper from "@/RoutineHelper.js";
import { mapActions } from "vuex";
export default {
  name: "FindRoutine",

  data: () => ({
    page: 1,
    totalPages: 1,
    currentCatId: null,
    routines: [],
    
  }),

  created(){
    this.loadData()
  },

  methods: {

    async changePage(){
      this.routines = await this.getCategoryPage(this.currentCatId,this.page-1)
      this.routines = this.routines.content
    },
    
    async loadData(){
      this.currentCatId = this.$route.params.category.id
      this.routines = await this.getCategoryPage(this.currentCatId,0)
      this.totalPages = Math.ceil((this.routines.totalCount)/12)
      this.routines = this.routines.content
    },

    ...mapActions('routine', {
      $getPageByCat: 'getPageByCat',
    }),

    async getCategoryPage(cat, page) {
      try {
        const routines = await this.$getPageByCat({cat: cat, page: page});
        return routines 
      } catch (e) {
        this.setResult(e);
      }
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
