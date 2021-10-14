<template>
  <v-navigation-drawer
    v-model="drawer"
    app
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
        </v-col>
      </v-row>
      <v-row justify="center">
          
          <v-col cols=2>
            <FavIconB :routineID="this.routineid" ref="fav"/>
          </v-col>
            <v-col v-if="editable" cols=2>
            <EditIconB/>
          </v-col>
          <v-col v-if="editable" cols=2>
            <RemoveIconB :routineID="this.routineid" />
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>{{ this.desc }}</p>
          <v-row v-for="cycleandexercise in cyclesAndExercises" :key="cycleandexercise.cycle.id">
            <v-col>
              <h2 class="pl-1" v-if="cycleandexercise.cycle.repetitions > 1">{{ cycleandexercise.cycle.name }} - {{ cycleandexercise.cycle.repetitions }} series </h2>
              <h2 class="pl-1" v-else>{{ cycleandexercise.cycle.name }} - {{ cycleandexercise.cycle.repetitions }} serie </h2>
              <ul>
                <li v-for="exercise in cycleandexercise.exercises" :key="exercise.id">
                  <h3 class="text--secondary" >{{ exercise.description }} </h3>
                </li> 
              </ul>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<style>
.RoutineTitle {
  font-size: 50px;
}
.cicle{
  font-size: 40px;
}
.exercise{
  font-size: 30px;
}
</style>

<script>
import { mapActions } from 'vuex'
import FavIconB from './Buttons/FavIconB.vue' 
import EditIconB from './Buttons/EditIconB.vue'
import RemoveIconB from './Buttons/RemoveIconB.vue'
export default {
  
  props: {
      editable: {
          type: Boolean
      }
    },

  data: () => ({
    drawer: false,
    group: null,
    score: null,
    difficulty: null,
    title: null,
    desc: null,
    routineid: null,
    cycles: [],
    cyclesAndExercises: [],
  }),

  components: {
    FavIconB,
    EditIconB,
    RemoveIconB
  },

  mounted(){
    this.$root.$on('update', () => {
      this.drawer = false
    })
  },

  methods: {

    ...mapActions('routine', {
      $getAllCycles: 'getAllCycles',
    }),

    ...mapActions('cycleexercise', {
      $getAllCycleExcercises: 'getAll',
    }),

    getString(duration, repetitions){
      const connector = " en "

      if(repetitions > 0 && duration > 0){
        return repetitions + " repeticiones" + connector + duration + "s"
      }else if(repetitions > 0){
        if(repetitions == 1){
          return "1 repetición"
        }else{
          return repetitions + " repeticiones"
        }
      }else{
        return duration + "s"
      }
    },

    toggleDrawer(diff, score, title, desc, id) {
      this.drawer = !this.drawer;
      this.score = score;
      this.difficulty = diff;
      this.title = title;
      this.desc = desc;
      this.routineid = id
      this.getAllCycles()
      this.$refs.fav.isRoutineFavourite(this.routineid)
    },

    async getAllCycles() {
      try {
        this.controller = new AbortController();
        const pickedCycles = await this.$getAllCycles({routineid: this.routineid, controller: this.controller});
        this.controller = null;
        this.cycles = pickedCycles.content
        this.cyclesAndExercises = []
        for(let i=0 ; i<this.cycles.length ; ++i){
          const exercisesData = await this.getAllCycleExcercises(this.cycles[i].id)
          let ex = []
          for(let j=0 ; j<exercisesData.content.length ; ++j){
            const s = exercisesData.content[j].exercise.name +" - "+ this.getString(exercisesData.content[j].duration,  exercisesData.content[j].repetitions )
            ex.push({ id: exercisesData.content[j].exercise.id, description: s })
          }
          this.cyclesAndExercises.push({ cycle: this.cycles[i], exercises:  ex})
        }
      } catch(e){
        //this.setResult(e);
      }
    },

    async getAllCycleExcercises(cycleId){
      try {
        this.controller = new AbortController();
        const pickedExercises = await this.$getAllCycleExcercises(cycleId);
        this.controller = null;
        return pickedExercises
      } catch(e){
        //this.setResult(e);
      }
    }
    
  },
};
</script>
