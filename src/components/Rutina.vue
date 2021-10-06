<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        ></v-img>

        <v-card-text>
          <h2 class="text-h6 primary--text">Rutina de Toro</h2>
          Rutina para quedar mas ancho que el placard de tu cuarto
        </v-card-text>

        <v-card-title>
          <v-rating
            :value="4"
            dense
            color="red"
            background-color="red"
            hover
            class="mr-2"
          ></v-rating>
          <span class="primary--text text-subtitle-2"
            >Dificultad</span
          >
          <v-rating
            :value="4"
            dense
            color="orange"
            background-color="orange"
            hover
            class="mr-2"
          ></v-rating>
          <span class="primary--text text-subtitle-2"
            >{{ reviews }} votos</span
          >
        </v-card-title>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <v-btn>See more info</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    reviews: 64,
  }),
};
</script>
