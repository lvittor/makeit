<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="filteredItems"
            :search="search"
            :sort-by="sort"
            :sort-desc="desc"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.puntuacion="{ item }">
              <v-rating
                color="orange"
                background-color="grey"
                empty-icon="mdi-star-outline"
                half-icon="mdi-star-half-full"
                full-icon="mdi-star"
                half-increments
                length="5"
                size="15"
                dense
                readonly
                :value="item.puntuacion"
              ></v-rating>
            </template>

            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.intensidad="{ item }">
              <v-rating
                color="red"
                background-color="grey"
                empty-icon="mdi-fire"
                full-icon="mdi-fire"
                length="5"
                size="15"
                readonly
                dense
                :value="item.intensidad"
              ></v-rating>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      result: null,
      controller: null,
      sort: "fecha",
      desc: true,
      search: {
        type: String,
      },
      filterRating: 1,
      filterIntensity: 1,
      headers: [
        {
          text: "Rutina",
          align: "start",
          value: "name",
        },
        {
          text: "Creador",
          value: "creador",
          filterable: false,
        },
        {
          text: "Categoria",
          value: "categoria",
          filterable: false,
        },
        {
          text: "Intensidad",
          value: "intensidad",
        },
        {
          text: "Puntuacion",
          value: "puntuacion",
        },
        {
          text: "Fecha",
          value: "fecha",
          filterable: false,
        },
      ],
      routines: [],
    };
  },

  created() {
    this.getAllRoutines();
  },

  methods: {
    ...mapActions("routine", {
      $getAllRoutines: "getAll",
    }),

    setRoutines() {
      for (let i = 0; i < this.result.content.length; i++) {
        const r = this.result.content[i];
        this.routines.push({
          name: r.name,
          creador: r.user.username,
          categoria: r.category.name,
          intensidad: this.mapIntensity(r.difficulty),
          puntuacion: this.mapScore(r.score),
          fecha: new Date(r.date).toISOString().split("T")[0],
        });
      }
    },

    mapIntensity(intensity) {
      switch (intensity) {
        case "rookie":
          return 1;
        case "beginner":
          return 2;
        case "intermediate":
          return 3;
        case "advanced":
          return 4;
        case "expert":
          return 5;
      }
    },

    mapScore(score) {
      return score / 2;
    },

    setResult(result) {
      this.result = result;
    },

    setFilterable(n) {
      for (var i = 0; i < 3; i++) {
        if (i == n) this.headers[i].filterable = true;
        else this.headers[i].filterable = false;
      }
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
          this.desc = false;
          break;
        case 3:
          this.sort = "categoria";
          this.desc = false;
          break;
      }
    },

    async getAllRoutines() {
      try {
        this.controller = new AbortController();
        const pickedRoutines = await this.$getAllRoutines(this.controller);
        this.controller = null;
        this.setResult(pickedRoutines);
        this.setRoutines();
      } catch (e) {
        this.setResult(e);
      }
    },

    setRating(n) {
      this.filterRating = n;
    },

    setIntensity(n) {
      this.filterIntensity = n;
    },

    setSearch(text) {
      this.search = text;
    },
  },

  beforeMount() {
    this.search = this.$route.params.value;
  },

  mounted() {
    this.$root.$on("filtertable", (n) => {
      this.setFilterable(n);
    }),
      this.$root.$on("orderable", (n) => {
        this.setOrder(n);
      }),
      this.$root.$on("rating", (n) => {
        this.setRating(n);
      }),
      this.$root.$on("intensity", (n) => {
        this.setIntensity(n);
      }),
      this.$root.$on("search", (text) => {
        this.setSearch(text);
      });
  },

  computed: {
    filteredItems() {
      return this.routines.filter((i) => {
        return (
          i.puntuacion >= this.filterRating &&
          i.intensidad >= this.filterIntensity
        );
      });
    },
  },
};
</script>
