<template>
  <v-hover>
    <!-- <template v-slot:default="{ hover }"> -->
    <template>
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
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
          <span class="primary--text text-subtitle-2">{{ reviews }} votos</span>
        </v-card-title>

        <!-- <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <v-btn>Ver mas</v-btn>
          </v-overlay>
        </v-fade-transition> -->
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: Number,
      default: 0,
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
  },
  data: () => ({
    //
  }),
};
</script>
