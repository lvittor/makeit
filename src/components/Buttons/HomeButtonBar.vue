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
              width="280px"
              height="150px"
            >
              <v-container>
                <v-row align="start" justify="start" style="height: 100px">
                  <h2 class="font-weight-black align-start">{{ bt.text }}</h2>
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
        { text: "Buscar una rutina", route: "/find-routine" },
        { text: "Crear una rutina", route: "/about" },
        { text: "Tus rutinas", route: "/about" },
      ],
    };
  },
};
</script>
