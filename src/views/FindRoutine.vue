<template>
  <div>
    <v-container fluid>
      <v-row class="primary lighten-5">
        <v-col cols="2"></v-col>
        <v-col cols="9">
          <span class="titulazos">Rutinas por categoría</span>
        </v-col>
        <v-col cols="1" align-self="start">
          <GoBack class="go-back-position" />
        </v-col>
      </v-row>
      <v-row>
        <v-divider></v-divider>
      </v-row>
    </v-container>
    <!-- -------------------------------------- -->
    <v-container v-if="foundFavourite == true" class="pa-0" fluid>
      <v-container class="primary lighten-5 pa-0" fluid>
        <v-row align="end">
          <v-col md="2" />
          <v-col md="6" class="left">
            <span class="titulazos2">Favoritas</span>
          </v-col>
          <v-col md="4">
            <v-btn text color="primary" x-large append @click="routerPushFav()"
              ><h3>Ver más</h3></v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="2" v-for="fav in favourites.content" v-bind:key="fav.id">
            <div
              @click="
                $refs.nav.toggleDrawer(
                  getDifficulty(fav.difficulty),
                  normalizeScore(fav.score),
                  fav.name,
                  fav.detail,
                  fav.id
                )
              "
            >
              <Routine
                :namep="fav.name"
                :desc="fav.detail"
                :difficulty="getDifficulty(fav.difficulty)"
                :score="normalizeScore(fav.score)"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <!-- -------------------------------------- -->
    <v-container
      v-for="cat in routinesByCat"
      v-bind:key="cat.category.id"
      fluid
      class="pa-0"
    >
      <v-container class="primary lighten-5" fluid>
        <v-row align="end">
          <v-col md="2" />
          <v-col md="6" class="left">
            <span class="titulazos2">{{ cat.category.name }}</span>
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
    <NavDrawer :editable="false" ref="nav" />
  </div>
</template>

<style>
.titulazos {
  font-size: 80px;
  vertical-align: bottom;
}

.titulazos2 {
  font-size: 70px;
  vertical-align: bottom;
  font-weight: lighter;
}

.view-more {
  font-size: 25px;
  color: #6200ee;
  vertical-align: middle;
}
.go-back-position {
  position: relative;
  top: 5px;
}
</style>

<script>
import Routine from "../components/Routine.vue";
import NavDrawer from "../components/NavigationDrawer.vue";
import { mapActions } from "vuex";
import RoutineHelper from "@/RoutineHelper.js";
import GoBack from "../components/Buttons/GoBack";

export default {
  name: "FindRoutine",

  data: () => ({
    controller: null,
    categories2: null,
    routinesByCat: [],
    routiness: [],
    favourites: [],
    foundFavourite: false,
  }),

  created() {
    this.loadData();
    this.foundFavourite = false;
    this.getAllFavourites();
  },

  mounted() {
    this.$root.$on("updateFavs", () => {
      this.getAllFavourites();
    });
  },

  methods: {
    async loadData() {
      await this.getAllCategories();
      for (var i = 0; i < this.categories2.length; ++i) {
        const fourRoutines = await this.getFourRoutines(this.categories2[i].id);
        if (fourRoutines.totalCount > 0) {
          this.routinesByCat.push({
            category: this.categories2[i],
            routines: fourRoutines.content,
          });
        }
      }
    },

    async getFourRoutines(cat) {
      try {
        const fourRoutines = await this.$getFourRoutines(cat);
        return fourRoutines;
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

    routerPushFav() {
      this.$router.push({
        name: "FindAllFavourites",
      });
    },

    ...mapActions("category", {
      $getAllCategories: "getAll",
    }),

    ...mapActions("routine", {
      //$createRoutine: 'create',
      //$modifyRoutine: 'modify',
      //$deleteRoutine: 'delete',
      //$getRoutine: 'get',
      $getAllFavourites: "getFavouritesPage",
      $getAllRoutines: "getAll",
      $getFourRoutines: "getFour",
    }),

    async getAllFavourites() {
      try {
        const favs = await this.$getAllFavourites({ page: 0, size: 4 });
        this.foundFavourite = false;
        if (favs.totalCount != 0) this.foundFavourite = !this.foundFavourite;
        this.favourites = favs;
        return favs;
      } catch (e) {
        alert("Problemas");
      }
    },

    async getAllCategories() {
      try {
        const cat = await this.$getAllCategories();
        this.categories2 = cat.content;
        //this.setCategories(categories)
      } catch (e) {
        this.clearCateogries(e);
      }
    },

    async getAllRoutines() {
      try {
        this.controller = new AbortController(); //???
        const routines = await this.$getAllRoutines();
        this.controller = null;
        this.setResult(routines);
      } catch (e) {
        this.clearResult(e);
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
      return RoutineHelper.getDifficulty(difficultyString);
    },
    normalizeScore(score010) {
      return RoutineHelper.normalizeScore(score010);
    },
  },
  components: {
    Routine,
    NavDrawer,
    GoBack,
  },
};
</script>
