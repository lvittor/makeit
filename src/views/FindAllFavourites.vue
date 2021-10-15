<template>
  <div>
    <v-container class="primary lighten-5" fluid>
      <NavDrawer :editable="false" ref="nav" />

      <v-row align="end">
        <v-col cols="2" />
        <v-col cols="9" class="left">
          <span class="titulazos">Favoritas</span>
        </v-col>
        <v-col cols="1" align-self="start"><GoBack /></v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="8">
          <v-row>
            <v-col
              md="3"
              v-for="eachroutine in routines"
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
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          class="my-4"
          @input="changePage()"
        ></v-pagination>
      </div>
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
import RoutineHelper from "@/RoutineHelper.js";
import { mapActions } from "vuex";
import GoBack from "../components/Buttons/GoBack";
export default {
  name: "FindRoutine",

  data: () => ({
    page: 1,
    totalPages: 1,
    routines: [],
  }),

  created() {
    this.loadData();
  },

  mounted() {
    this.$root.$on("updateFavs", () => {
      this.loadData();
    });
  },

  methods: {
    async changePage() {
      this.routines = await this.getFavouritesPage({
        page: this.page - 1,
        size: 12,
      });
      this.routines = this.routines.content;
    },

    async loadData() {
      this.routines = await this.getFavouritesPage({
        page: this.page - 1,
        size: 12,
      });
      this.totalPages = Math.ceil(this.routines.totalCount / 12);
      this.routines = this.routines.content;
    },

    ...mapActions("routine", {
      $getFavouritesPage: "getFavouritesPage",
    }),

    async getFavouritesPage(page) {
      try {
        const routines = await this.$getFavouritesPage(page);
        return routines;
      } catch (e) {
        this.setResult(e);
      }
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
