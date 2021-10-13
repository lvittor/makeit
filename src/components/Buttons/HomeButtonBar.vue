<template>
  <div class="HomeButtonBar">
    <v-container>
      <v-row justify="center">
        <v-col md="3" v-for="bt in buttons" :key="bt.text">
          <v-layout justify-center>
            <v-btn
              depressed
              :to="bt.route"
              color="primary"
              class="white--text"
              width="300px"
              height="150px"
            >
              <v-container>
                <v-row align="start" justify="start" style="height: 100px">
                  <v-col align="start" justify="start">
                    <div class="text-h6">{{ bt.text1 }}</div> 
                    <div class="text-h6">{{ bt.text2 }}</div>
                  </v-col>
                </v-row>
                <v-row align="end" no-gutters justify="end">
                  <v-icon color="white" x-large right>
                    mdi-arrow-right-thick
                  </v-icon>
                </v-row>
              </v-container>
            </v-btn>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeButtonBar",
  data() {
    return {
      buttons: [
        { text1: "Buscar una rutina", text2: "", route: "/find-routine" },
        { text1: "Crear una rutina", text2: "", route: "/create-routine" },
        { text1: "Tus rutinas y", text2: "ejercicios", route: "/all-your-routines-and-exercises" },
      ],
    };
  },
};
</script>
