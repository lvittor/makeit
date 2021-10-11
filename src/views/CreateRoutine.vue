<template>
  <v-container class="grey lighten-5" fluid>
    <v-row justify="center" class="mb-10" align="center">
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
          rows="3"
        ></v-textarea>
        <v-autocomplete
          v-model="selected"
          class="pb-4"
          :items="categories"
          hide-details
          hide-selected
          label="Seleccione una categoria..."
          solo
          outlined
          flat
        >
        </v-autocomplete>
        <v-text-field
          class="pb-4"
          background-color="white"
          outlined
          type="time"
          label="DURACION"
          suffix="hh:mm"
          value="00:00"
          hide-details="auto"
        />
        <v-card class="mb-4">
          <v-container>
            <v-row align="center">
              <v-col
                cols="8"
              >
                ¿La rutina requiere equipamiento?
              </v-col>
              <v-col
                class="pa-0"
                cols="4"
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
          </v-container>
        </v-card>  
        <v-card>
          <v-container>
            <v-row align="center">
              <v-col
                cols="8"
              >
                ¿Cuál es la intensidad de tu rutina?
              </v-col>
              <v-col
                class="pa-0"
                cols="4"
              >
                <v-rating
                  color="red"
                  background-color="grey"
                  empty-icon="mdi-fire"
                  full-icon="mdi-fire"
                  length="5"
                  size="25"
                  dense
                  value="1"
                ></v-rating>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
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
import { mapActions } from 'vuex'
import RoutineStepper from "../components/Cycle/RoutineStepper.vue"

export default {
  data () {
    return {
      controller: null,
      result: null,
      selected: '',
      categories: [],
      switch1: false,
    }
  },

  created() {
    this.getAllCategories();
    this.getAllExercises();
  },

  methods: {
    ...mapActions('category', {
      $getAllCategories: "getAll"
    }),

    ...mapActions('exercise', {
      $getAllExercises: 'getAll',
    }), 

    async getAllExercises() {
      try {
        this.controller = new AbortController();
        const pickedExercises = await this.$getAllExercises(this.controller);
        this.controller = null;
        this.setResult(pickedExercises);
      } catch(e) {
        this.setResult(e);
      }
    },

    async getAllCategories() {
      try {
        this.controller = new AbortController();
        const pickedCategories = await this.$getAllCategories(this.controller);
        this.controller = null;
        this.setResult(pickedCategories);
        this.setCategories()
      } catch(e){
        this.setResult(e);
      }
    },

    setResult(result) {
      this.result = result;
    },

    setCategories() {
      for (let i = 0; i < this.result.content.length; i++){
        this.categories.push(this.result.content[i].name);
      }
    },

    
  },

  components: {
    RoutineStepper,
  },
}
</script>
