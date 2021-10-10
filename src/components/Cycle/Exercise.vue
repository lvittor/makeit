<template>
  <v-container>
    <v-row>
      <v-col
        class="pa-0"
      >
        <v-card 
          tile
          elevation="0"
        >
          <v-divider/>
          <v-container>
            <v-row align="center"> 
              <v-col>
                <SearchExercise :actual="actual" :id="id"/>
              </v-col>
            </v-row>
            <v-row align="center" justify-md="center">
              <v-col
                cols="1"
              >
                <v-checkbox
                  v-model="enabled1"
                  hide-details
                  class="shrink mr-2 mt-0"
                  @change="setEnabled1($event)"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-select
                  :v-model="reps"
                  :items="items"
                  label="Repeticiones"
                  hide-details
                  :disabled="!enabled1"
                  outlined
                  @change="setReps($event)"
                ></v-select>
              </v-col>
              <v-col
                cols="1"
              >
                <v-checkbox
                  v-model="enabled2"
                  hide-details
                  class="shrink mr-2 mt-0"
                  @change="setEnabled2($event)"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="dur"
                  background-color="white"
                  outlined
                  type="time"
                  label="Duracion"
                  suffix="hh:mm:ss"
                  value="00:00:00"
                  hide-details="auto"
                  :disabled="!enabled2"
                  step="1"
                  @change="setDur($event)"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-divider/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SearchExercise from "./SearchExercise.vue"

  export default {
    data: () => ({
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    }),

    props: {
      id: {
        type: Number,
      },
      enabled1: {
        type: Boolean,
        default: false,
      },
      enabled2: {
        type: Boolean,
        default: false,
      },
      actual: {
        type: String,
        default: '',
      },
      reps: {
        type: String,
      },
      dur: {
        type: String,
      }
    },

    methods: {
      setActual(text, id) {
        if (this.id == id){
          this.actual = text;
          this.$root.$emit('updateText', text, this.id);
        }
        
      },
      setReps(text) {
        this.reps = text;
        this.$root.$emit('updateReps', text, this.id);
      },
      setDur(text) {
        this.dur = text;
        this.$root.$emit('updateDur', text, this.id);
      },
      setEnabled1(value){
        this.enabled1 = value;
        this.$root.$emit('updateEnable1', value, this.id);
      },
      setEnabled2(value){
        this.enabled2 = value;
        this.$root.$emit('updateEnable2', value, this.id);
      },
    },

    mounted() {
      this.$root.$on('setter', (text, id) => {
        this.setActual(text, id);
      })
    },

    components: {
      SearchExercise,
    },
  }
</script>
