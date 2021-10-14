<template>
  <v-container class="pa-0">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          expand-icon="mdi-filter"
          disable-icon-rotate
          class="pa-0 grey lighten-2"
        >
          <v-text-field
            label="Buscar"
            solo
            @click.native.stop
            @input="setSearch($event)"
            @keyup.enter="pushFound()"
            hide-details="auto"
            class="mr-2 ml-4"
          />
        </v-expansion-panel-header>
        <v-expansion-panel-content class="grey lighten-2">
          <Filters />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
      >
        INGRESAR AL MENOS 3 CARACTERES
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            CERRAR
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<script>
import Filters from "./Filters.vue";

export default {
  data() {
    return {
      search: "",
      intensity: 0,
      rating: 0,
      searchType: 0,
      sort: 'fecha',
      desc: true,
      snackbar: false
    };
  },

  components: {
    Filters,
  },

  methods: {
    setSearch(text) {
      this.search = text;
    },

    setRating(n) {
      this.rating = n;
    },

    setIntensity(n) {
      this.intensity = n;
    },

    setType(n) {
      this.searchType = n
    },

    setOrder(n) {
      switch (n) {
        case 0:
          this.sort = "fecha";
          this.desc = true;
          break;
        case 1:
          this.sort = "puntuacion";
          this.desc = true;
          break;
        case 2:
          this.sort = "intensidad";
          this.desc = true;
          break;
        case 3:
          this.sort = "categoria";
          this.desc = false;
          break;
      }
    },

    pushFound() {
      if (this.search.length < 3) {
        //this.$root.$emit('snackbar')
        this.snackbar = true
      } else {
        if (this.$route.name === "Found"){
          this.$root.$emit('refresh', this.rating, this.intensity, this.searchType, this.sort, this.desc, this.search)
        } else {
          this.$router.push({
            name: "Found",
            params: {rating: this.rating, intensity: this.intensity, value: this.search, type: this.searchType, sort: this.sort, desc: this.desc},
          });
        }
      }
      
      
    },
  },

  mounted() {
    this.$root.$on("rating", (n) => {
      this.setRating(n);
    }),
    this.$root.$on("intensity", (n) => {
      this.setIntensity(n);
    }),
    this.$root.$on("orderable", (n) => {
      this.setOrder(n);
    }),
    this.$root.$on("type", (n) => {
      this.setType(n);
    })
  },
};
</script>

