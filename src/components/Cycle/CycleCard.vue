<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0"
      >
        <Header :value="title" :readonly="readonly"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        class="pa-0"
      >
        <v-card
          tile
          elevation="1"
        >
          <v-container>
            <v-row justify="center" align="center">
              <v-col
                cols="2"
              >
                <v-select
                  v-model="series"
                  class="pa-0 ma-0"
                  :items="items"
                  hide-details="auto"
                  solo
                  flat
                  reverse
                  outlined
                ></v-select>
              </v-col>
              <v-col
                cols="2"
              >
                <h3 class="primary--text"> SERIES </h3>
              </v-col>
            </v-row>
          </v-container>
          
          <v-container>
            <v-row justify="center">
              <v-col
                class="pa-0"
              >
                <v-list>
                  <template v-for="(exercise, index) in exercises">
                    <v-list-item class="pa-0" :key="index">
                      <v-list-item-content class="pa-0">
                        <Exercise :id="exercise.id" :enabled1="exercise.enabled1" :enabled2="exercise.enabled2" :actual="exercise.actual" :reps="exercise.reps" :dur="exercise.dur"/>
                      </v-list-item-content>
                      <v-list-tile-action>
                        <v-btn color="red" icon @click="removeExercise(index)">
                          <v-icon>
                            mdi-trash-can-outline
                          </v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-item>
                  </template>
                </v-list>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="mt-10">
            <v-row justify="center">
              <v-col
                cols="4"
              >
                <div class="d-flex justify-center">
                  <v-btn
                    elevation="2"
                    color="primary"
                    width="210"
                    @click="addExercise()"
                  >
                    <v-icon>
                      mdi-plus
                    </v-icon>
                    AGREGAR EJERCICIO
                  </v-btn>
                </div>
              </v-col>
              <v-col
                cols="4"
              >
                <div class="d-flex justify-center">
                  <v-btn
                    elevation="2"
                    color="primary"
                    outlined
                    width="210"
                    @click="caller()"
                  >
                    FIN DE CICLO
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>

        </v-card>
      </v-col>
    </v-row>
        
  </v-container>
</template>

<script>
  import Header from './Header.vue';
  import Exercise from './Exercise.vue'

  export default {
    data() {
      return {
        items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        id: 0,
      }
    },

    props: {
      exercises: {
        type: Array,
        default() {
          return [];
        }
      },
      serie: {
        type: Number,
      },
      title: {
        type: String,
      },
      readonly: {
        type: Boolean
      },
      cycle: {
        type: Number,
      }
    },

    methods: {
      caller() {
        alert(this.title)
        this.$root.$emit('updatecycle', this.exercises, this.cycle, this.serie, this.title);
        this.$root.$emit('routinestepper');
      },

      addExercise(){
        this.exercises.push({
          id: this.id++,
          enabled1: false,
          enabled2: false,
          actual: '',
          reps: '',
          dur: '00:00:00',
        });
      },

      removeExercise(index){
        this.exercises.splice(index, 1);
      },

      updateText(text, id){
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id) {
            this.exercises[i].actual = text;
            break;
          }
        }
      },
      updateReps(text, id){
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id) {
            this.exercises[i].reps = text;
            break;
          }
        }
      },
      updateDur(text, id){
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id) {
            this.exercises[i].dur = text;
            break;
          }
        }
      },
      updateEnable1(value, id){
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id) {
            this.exercises[i].enabled1 = value;
            break;
          }
        }
      },
      updateEnable2(value, id){
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id) {
            this.exercises[i].enabled2 = value;
            break;
          }
        }
      },
      updateTitle(text){
        this.title = text;
      }

    },

    mounted() {
      this.$root.$on('updateText', (text, id) => {
        this.updateText(text, id);
      }),
      this.$root.$on('updateReps', (text, id) => {
        this.updateReps(text, id);
      }),
      this.$root.$on('updateDur', (text, id) => {
        this.updateDur(text, id);
      }),
      this.$root.$on('updateEnable1', (value, id) => {
        this.updateEnable1(value, id);
      }),
      this.$root.$on('updateEnable2', (value, id) => {
        this.updateEnable2(value, id);
      }),
      this.$root.$on('updateTitle', (text) => {
        this.updateTitle(text);
      })
    },

    components: {
      Header,
      Exercise,
    },
  
  }
</script>

<style scoped>
  .ashee {
    background: yellow;
  }
  .centered-input >>> input {
    text-align: center
  }
</style>