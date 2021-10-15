<template>
  <div>
    <v-hover v-slot="{ hover }">
      <template>
        <!-- <template> -->
        <v-card class="mx-auto" max-width="344">
          <v-img
            max-height="15vh"
            src="https://media.gettyimages.com/vectors/dumbbell-weight-loss-flat-design-icon-vector-id1078218468?k=20&m=1078218468&s=612x612&w=0&h=x5CP96gF-RWE-QnulkzAfsSsm1B8x6xyHaCIczaDGak="
          ></v-img>

          <v-card-text>
            <slot
              ><h2 class="primary--text h-6">{{ namep }}</h2></slot
            >
            <slot>{{ desc }}</slot>
          </v-card-text>

          <v-card-title>
            <v-rating
              :value="difficulty"
              dense
              color="red"
              background-color="grey"
              empty-icon="mdi-fire"
              full-icon="mdi-fire"
              hover
              readonly
              class="mr-2"
            ></v-rating>
            <span class="primary--text text-subtitle-2">Dificultad</span>
            <v-rating
              :value="score"
              dense
              color="orange"
              background-color="grey"
              hover
              class="mr-2"
              readonly
            ></v-rating>
            <span class="primary--text text-subtitle-2">Puntuación</span>
          </v-card-title>

          <v-fade-transition>
            <v-overlay v-if="hover" z-index="0" absolute color="#036358">
              <div class="pa-2" align="center">
                <v-btn>Ver más</v-btn>
              </div>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    namep: {
      type: String,
    },
    desc: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
    },
  },
  data: () => ({
    //
  }),
};
</script>
