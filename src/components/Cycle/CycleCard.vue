<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0"
      >
        <Header :value="title" :readonly="readonly" :cycle="cycle"/>
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
                  v-model="serie"
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
                        <Exercise :id="exercise.id" :cycle="cycle" :enabled1="exercise.enabled1" :enabled2="exercise.enabled2" :actual="exercise.actual" :reps="exercise.reps" :dur="exercise.dur"/>
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
                <div v-if="cycle < max" class="d-flex justify-center">
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
                <div v-if="cycle == max" class="d-flex justify-center">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        FINALIZAR CICLOS
                      </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                      <v-alert
                        type="info"
                        icon="mdi-information-outline"
                        class="ma-0"
                        color="secondary"
                        prominent
                        border="left"
                      >
                        ¿Estás seguro que quieres finalizar? No podrás editar los ejercicios luego de confirmar.
                      </v-alert>
                      <v-row class="ma-0">
                        <v-col
                          class="pa-0"
                        >
                          <v-btn color="black" class="white--text" block @click="dialog.value = false">
                            CANCELAR
                          </v-btn>
                        </v-col>
                        <v-col
                          class="pa-0"
                        >
                          <v-btn color="black" class="white--text" block @click="caller(), dialog.value = false">
                            CONFIRMAR
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                  </v-dialog>
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
      },
      max: {
        type: Number,
      }
    },

    methods: {
      caller() {
        if (this.validate()){
          this.$root.$emit('updatecycle', this.exercises, this.cycle, this.serie, this.title);
          this.$root.$emit('routinestepper');
        }
      },

      validate() {
        if (this.serie > 0 && this.title){
          const ex = this.exercises;
          if (ex.length > 0) {
            for (let i = 0; i < ex.length; i++) {
              if (!(ex[i].actual != '' && (!ex[i].enabled1 || (ex[i].enabled1 && ex[i].reps != '')) && (!ex[i].enabled2 || (ex[i].enabled2 && ex[i].dur != '00:00:00')))){
                alert('Completar todos los campos')
                return false;
              }
                
            }
            return true;
          }
        }
        alert('Completar todos los campos')
        return false;
      },

      addExercise() {
        this.exercises.push({
          id: this.id++,
          enabled1: false,
          enabled2: false,
          actual: '',
          reps: '',
          dur: '00:00:00',
        });
      },

      removeExercise(index) {
        this.exercises.splice(index, 1);
      },

      updateText(text, id, cycle) {
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id && cycle == this.cycle) {
            this.exercises[i].actual = text;
            break;
          }
        }
      },

      updateReps(text, id, cycle) {
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id && cycle == this.cycle) {
            this.exercises[i].reps = text;
            break;
          }
        }
      },
      updateDur(text, id, cycle) {
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id && cycle == this.cycle) {
            this.exercises[i].dur = text;
            break;
          }
        }
      },
      updateEnable1(value, id, cycle) {
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id && cycle == this.cycle) {
            this.exercises[i].enabled1 = value;
            break;
          }
        }
      },
      updateEnable2(value, id, cycle) {
        for (var i = 0; i < this.exercises.length; i++){
          if (this.exercises[i].id == id && cycle == this.cycle) {
            this.exercises[i].enabled2 = value;
            break;
          }
        }
      },
      updateTitle(text, cycle) {
        if (this.cycle == cycle)
          this.title = text;
      }

    },

    mounted() {
      this.$root.$on('updateText', (text, id, cycle) => {
        this.updateText(text, id, cycle);
      }),
      this.$root.$on('updateReps', (text, id, cycle) => {
        this.updateReps(text, id, cycle);
      }),
      this.$root.$on('updateDur', (text, id, cycle) => {
        this.updateDur(text, id, cycle);
      }),
      this.$root.$on('updateEnable1', (value, id, cycle) => {
        this.updateEnable1(value, id, cycle);
      }),
      this.$root.$on('updateEnable2', (value, id, cycle) => {
        this.updateEnable2(value, id, cycle);
      }),
      this.$root.$on('updateTitle', (text, cycle) => {
        this.updateTitle(text, cycle);
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