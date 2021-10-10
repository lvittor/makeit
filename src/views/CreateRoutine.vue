<template>
  <v-container class="grey lighten-5" fluid>
    <v-row justify="center" class="mb-10">
      <v-col
        cols="3"
        sm="2"
        md="3"
      >
        <v-img
          contain
          height="400"
          width="400"
          lazy-src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
        ></v-img>
      </v-col>
      <v-col
        cols="3"
        sm="2"
        md="3"
      >
        <v-text-field
          label="Nombre de la rutina"
          outlined
          hide-details="auto"
          class="pb-4"
          background-color="white"
        ></v-text-field>
        <v-textarea
          label="Descripcion"
          outlined
          hide-details="auto"
          class="pb-4"
          background-color="white"
        ></v-textarea>
        <v-text-field
          background-color="white"
          outlined
          type="time"
          label="DURACION"
          suffix="hh:mm"
          value="00:00"
          hide-details="auto"
        />
        <v-container class="pt-6 pa-0">
          <v-row
            align="center"
          >
            <v-col
              cols="7"
              md="7"
            >
              ¿La rutina requiere equipamiento?
            </v-col>
            <v-col
              cols="5"
              md="5"
              sm="4"
            >
              <div class="d-flex justify-end">
                <v-switch
                  class="pa-0 ma-0"
                  v-model="switch1"
                  inset
                  hide-details="auto"
                ></v-switch>
              </div>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col
              cols="7"
              md="7"
            >
              ¿Cuál es la intensidad de tu rutina?
            </v-col>
            <v-col
              cols="5"
              md="5"
            >
              <div class="justify-end">
                <v-rating
                  color="red"
                  background-color="grey"
                  empty-icon="mdi-fire"
                  full-icon="mdi-fire"
                  length="5"
                  size="32"
                  dense
                  value="1"
                ></v-rating>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="6"
        sm="4"
        md="6"
        class="pa-0"
      >
        <RoutineStepper />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <div class="d-flex justify-center">
          <v-btn 
            x-large
            color="primary"
          >
            Guardar rutina
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RoutineStepper from "../components/Cycle/RoutineStepper.vue"

  export default {
    data () {
      return {
        switch1: true,
      }
    },

    components: {
      RoutineStepper,
    },
  }
</script>
