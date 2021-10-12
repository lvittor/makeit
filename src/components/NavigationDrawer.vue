<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    bottom
    temporary
    width="700px"
    right
  >
    <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>
    <v-container>
      <v-row align="center">
        <v-col>
          <h1 class="primary--text h-6 RoutineTitle">{{ this.title }}</h1>
        </v-col>
        <v-col>
          <v-rating
            :value="score"
            dense
            large
            align="right"
            color="orange"
            background-color="grey"
            hover
            class="mr-2"
            readonly
          >
          </v-rating>
          <v-rating
            :value="difficulty"
            dense
            large
            color="red"
            align="right"
            background-color="grey"
            empty-icon="mdi-fire"
            full-icon="mdi-fire"
            hover
            readonly
            class="mr-2"
          >
          </v-rating>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h5>{{ this.desc }}</h5>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<style>
.RoutineTitle {
  font-size: 50px;
}
</style>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    score: null,
    difficulty: null,
    title: null,
    desc: null,
  }),
  methods: {
    toggleDrawer(diff, score, title, desc) {
      this.drawer = !this.drawer;
      this.score = score;
      this.difficulty = diff;
      this.title = title;
      this.desc = desc;
    },
  },
};
</script>
