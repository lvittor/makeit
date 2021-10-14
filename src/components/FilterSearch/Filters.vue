<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="grey lighten-2 pa-2" tile flat>
          <v-card class="pa-3 mb-2" tile>
            <v-container>
              <v-row>
                <h5>Ordenar por</h5>
              </v-row>
              <v-row
                class="mt-5"
                @click="setOrdenar(0)"
                justify="space-between"
              >
                <h4>Fecha</h4>
                <v-icon v-if="ordenar == 0"> mdi-check </v-icon>
              </v-row>
              <v-row
                class="mt-5"
                @click="setOrdenar(1)"
                justify="space-between"
              >
                <h4>Puntuacion</h4>
                <v-icon v-if="ordenar == 1"> mdi-check </v-icon>
              </v-row>
              <v-row
                class="mt-5"
                @click="setOrdenar(2)"
                justify="space-between"
              >
                <h4>Intensidad</h4>
                <v-icon v-if="ordenar == 2"> mdi-check </v-icon>
              </v-row>
              <v-row
                class="mt-5"
                @click="setOrdenar(3)"
                justify="space-between"
              >
                <h4>Categoria</h4>
                <v-icon v-if="ordenar == 3"> mdi-check </v-icon>
              </v-row>
            </v-container>
          </v-card>
          <v-card class="pa-3 mb-2" tile>
            <v-container>
              <v-row>
                <h5>Filtro</h5>
              </v-row>
              <v-row class="mt-5" justify="space-between">
                <h4>Puntuacion</h4>
                <v-rating
                  color="orange"
                  background-color="grey"
                  empty-icon="mdi-star-outline"
                  half-icon="mdi-star-half-full"
                  full-icon="mdi-star"
                  half-increments
                  length="5"
                  size="20"
                  dense
                  clearable
                  :value="rating"
                  @input="setRating($event)"
                ></v-rating>
              </v-row>
              <v-row class="mt-5" justify="space-between">
                <h4>Intensidad</h4>
                <v-rating
                  color="red"
                  background-color="grey"
                  empty-icon="mdi-fire"
                  full-icon="mdi-fire"
                  length="5"
                  size="20"
                  dense
                  clearable
                  :value="intensity"
                  @input="setIntensity($event)"
                ></v-rating>
              </v-row>
            </v-container>
          </v-card>
          <v-card class="pa-3" tile>
            <v-container>
              <v-row>
                <h5>Tipo</h5>
              </v-row>
              <v-row class="mt-5" @click="setTipo(0)" justify="space-between">
                <h4>Rutina</h4>
                <v-icon v-if="tipo == 0"> mdi-check </v-icon>
              </v-row>
              <v-row class="mt-5" @click="setTipo(1)" justify="space-between">
                <h4>Creador</h4>
                <v-icon v-if="tipo == 1"> mdi-check </v-icon>
              </v-row>
              <v-row class="mt-5" @click="setTipo(2)" justify="space-between">
                <h4>Categoria</h4>
                <v-icon v-if="tipo == 2"> mdi-check </v-icon>
              </v-row>
            </v-container>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ordenar: 0,
      tipo: 0,
      rating: 0,
      intensity: 0,
    };
  },
  methods: {
    getIntensity() {
      return this.intensity
    },

    getRating() {
      return this.rating
    },

    setOrdenar(n) {
      this.ordenar = n;
      this.$root.$emit("orderable", n);
      this.$root.$emit("getOrder", n)
    },
    setRating(n) {
      this.rating = n;
      this.$root.$emit("rating", n);
    },
    setIntensity(n) {
      this.intensity = n;
      this.$root.$emit("intensity", n);
    },
    setTipo(n) {
      this.tipo = n;
      this.$root.$emit("type", n);
    }
  },
};
</script>
