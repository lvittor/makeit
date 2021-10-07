<template>
  <div>
    <v-container fluid class="mt-16">
      <v-row align="end">
        <v-col md="2" />
        <v-col md="6" class="left">
          <tit class="titulazos">Tus Ejercicios</tit>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="2"><NewExercise/></v-col>
        <v-col md="2"><ExerciseCard namep="Estocadas" desc="fortalecimiento"/></v-col>
        <v-col md="2"></v-col>
        <v-col md="2"></v-col>
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
import NewExercise from "../components/NewExercise.vue";
import ExerciseCard from "../components/ExerciseCard.vue";

export default {
  name: "AllYourExercises",

  data: () => ({
    // routines: [{}, {}]
  }),

  components: {
    NewExercise,
    ExerciseCard,
  },
};
</script>