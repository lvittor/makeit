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
                <SearchExercise/>
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
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-select
                  :items="items"
                  label="Repeticiones"
                  hide-details
                  :disabled="!enabled1"
                  outlined
                ></v-select>
              </v-col>
              <v-col
                cols="1"
              >
                <v-checkbox
                  v-model="enabled2"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-text-field
                  background-color="white"
                  outlined
                  type="time"
                  label="Duracion"
                  suffix="hh:mm:ss"
                  value="00:00:00"
                  hide-details="auto"
                  :disabled="!enabled2"
                  step="1"
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
      enabled1: false,
      enabled2: false,
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    }),
    components: {
      SearchExercise,
    },
  }
</script>
