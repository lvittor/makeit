<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0"
      >
        <Header />
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
                        <Exercise />
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
        exercises: [],
      }
    },

    methods: {
      caller() {
        this.$root.$emit('routinestepper');
      },

      addExercise(){
        this.exercises.push({
          value: this.exercises.length
        });
      },

      showAlert(message){
        alert(message)
      },

      removeExercise(index){
        this.showAlert(JSON.stringify(index))
        this.showAlert(JSON.stringify(this.exercises))
        this.exercises.splice(index, 1);
        this.showAlert(JSON.stringify(this.exercises))
      },

      
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