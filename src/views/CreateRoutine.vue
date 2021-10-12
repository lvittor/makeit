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
          v-model="name"
          label="Nombre de la rutina"
          outlined
          hide-details="auto"
          class="pb-4"
          background-color="white"
        ></v-text-field>
        <v-textarea
          v-model="desc"
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
          :items="items"
          hide-details
          hide-selected
          label="Seleccione una categoria..."
          solo
          outlined
          flat
        >
        </v-autocomplete>
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
                  v-model="intensity"
                  color="red"
                  background-color="grey"
                  empty-icon="mdi-fire"
                  full-icon="mdi-fire"
                  length="5"
                  size="25"
                  dense
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
        <RoutineStepper :id="id"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <div class="d-flex justify-center">
          <v-btn 
            x-large
            color="primary"
            @click="createRoutine()"
            :disabled="!validate()"
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
import { Routine } from "../../api/routine"
import { Cycle } from "../../api/routine"
import { Category } from "../../api/category"
import { CycleExercise } from "../../api/cycleexercise"

export default {
  data () {
    return {
      name: '',
      desc: '',
      intensity: 0,
      controller: null,
      result: null,
      selected: '',
      categories: [],
      items: [],
      switch1: false,
      routine: [],
      created: null,
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

    ...mapActions('routine', {
      $createRoutine: 'create',
      $createCycle: 'createCycle',
    }),

    ...mapActions('cycleexercise', {
      $createCycleExercise: 'create',
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

    validate() {
      if (this.name && this.desc && this.selected && this.intensity != 0) {
        if (this.routine.length > 0) {
          return true;
        } 
        return false;
      } 
      return false;
    },

    setResult(result) {
      this.result = result;
    },

    setCategories() {
      for (let i = 0; i < this.result.content.length; i++){
        this.categories.push({
          name: this.result.content[i].name,
          id: this.result.content[i].id
        });
        this.items.push(this.categories[i].name)
      }
    },

    getCycles(cycles, series, titles, finished) {
      if (!finished){
        for (let i = 0; i < cycles.length; i++) {
          this.routine.push({
            title: titles[i],
            serie: series[i],
            cycle: cycles[i],
          })
        }
      }
    },

    async createRoutine() {
      const id = this.getId(this.selected);
      const category = new Category(id, this.categories[id - 1].name, this.categories[id - 1].name);
      const routine = new Routine(null, this.name, this.desc, true, category, this.mapDifficulty(this.intensity))
      try {
        this.created = await this.$createRoutine(routine)
        this.createCycles()
      } catch (e) {
        alert(e)
      }
      alert('Su rutina ha sido creada!')
      this.$router.push('/');
    },

    async createCycles() {
      const id = this.created.id;
      for (let i = 0; i < this.routine.length; i++){
        const cycle = new Cycle(null, this.routine[i].title, "", this.getType(i), i + 1, parseInt(this.routine[i].serie, 10))
        try {
          const req = {cycle: cycle, id: id}
          const createdCycle = await this.$createCycle(req)
          this.createExcercises(createdCycle.id, i)
        } catch (e) {
          alert(e)
        }
      }
    },

    async createExcercises(id, index){
      for (let i = 0; i < this.routine[index].cycle.length; i++){
        let exid = this.getExercise(this.routine[index].cycle[i].actual)
        const reqs = {order: i + 1, duration: this.routine[index].cycle[i].enabled2 ? this.getDuration(this.routine[index].cycle[i].dur):0, repetitions: this.routine[index].cycle[i].enabled1 ? parseInt(this.routine[index].cycle[i].reps, 10) : 0}
        const req = new CycleExercise(null, id, exid, reqs)
        try {
          await this.$createCycleExercise(req)
        } catch (e) {
          alert(e)
        }
      }
    },

    getDuration(text) {
      var a = text.split(':'); // split it at the colons
      var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
      return seconds;
    },

    getExercise(name) {
      for (let i = 0; i < this.result.content.length; i++) {
        if (this.result.content[i].name == name)
          return this.result.content[i].id
      }
      return -1
    },

    getType(cycle) {
      switch(cycle){
        case 0:
          return 'warmup'
        case this.routine.length - 1:
          return 'cooldown'
        default:
          return 'exercise'
      }
    },

    getId(name) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name == name)
          return i + 1
      }
      return -1;
    },

    mapDifficulty(intensity) {
      switch(intensity) {
        case 1:
          return 'rookie'
        case 2:
          return 'beginner'
        case 3:
          return 'intermediate'
        case 4:
          return 'advanced'
        case 5:
          return 'expert'
      }
    }
  },

  mounted() {
    this.$root.$once('getCycles', (cycles, series, titles, finished) => {
      this.getCycles(cycles, series, titles, finished);
    })
  },

  components: {
    RoutineStepper,
  },
}
</script>
