<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="6"
      >
        <v-card>
          <!-- <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title> -->
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
                full-icon="mdi-star"
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

export default {
  data() {
    return {
      sort: 'fecha',
      desc: true,
      search: '',
      filterRating: 1,
      filterIntensity: 1, 
      headers: [
        {
          text: 'Rutina',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Creador',
          value: 'creador',
          filterable: false,
        },
        {
          text: 'Categoria',
          value: 'categoria',
          filterable: false,
        },
        {
          text: 'Intensidad',
          value: 'intensidad',
        },
        {
          text: 'Puntuacion',
          value: 'puntuacion',
        },
        {
          text: 'Fecha',
          value: 'fecha',
          filterable: false,
        },
      ],
      routines: [
        {
          name: 'Rutina de Toro',
          creador: 'Camila Di Toro',
          categoria: 'Hiit',
          intensidad: '5',
          puntuacion: '4',
          fecha: new Date('10-04-2021').toISOString().split('T')[0],
        }, 
        {
          name: 'Picadillo de Carne',
          creador: 'Maru Botana',
          categoria: 'Cocina',
          intensidad: '1',
          puntuacion: '3',
          fecha: new Date('02-30-2020').toISOString().split('T')[0],
        }, 
        {
          name: 'Como conquistar menores',
          creador: 'Ezequiel Rodriguez',
          categoria: 'Violinista',
          intensidad: '3',
          puntuacion: '1',
          fecha: new Date('05-02-2021').toISOString().split('T')[0],
        }, 
        {
          name: 'Picante en 10 minutos',
          creador: 'Kako',
          categoria: 'Ashtex',
          intensidad: '4',
          puntuacion: '5',
          fecha: new Date('04-15-2021').toISOString().split('T')[0],
        }, 
        {
          name: 'Rutina de Toro',
          creador: 'Camila Di Toro',
          categoria: 'Hiit',
          intensidad: '5',
          puntuacion: '4',
          fecha: new Date('02-09-2021').toISOString().split('T')[0],
        }, 
      ]
    }
  },

  methods: {
    setFilterable(n) {
      for (var i = 0; i < 3; i++){
        if (i == n)
          this.headers[i].filterable = true;
        else
          this.headers[i].filterable = false;
      }
    },

    setOrder(n) {
      switch(n) {
        case 0:
          this.sort = 'fecha';
          this.desc = true;
          break;
        case 1:
          this.sort = 'puntuacion';
          this.desc = true;
          break;
        case 2:
          this.sort = 'intensidad';
          this.desc = true;
          break;
        case 3:
          this.sort = 'categoria';
          this.desc = false;
          break;
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
    }
  }, 

  mounted() {
    this.$root.$on('filtertable', (n) => {
      this.setFilterable(n);
    }),
    this.$root.$on('orderable', (n) => {
      this.setOrder(n);
    }),
    this.$root.$on('rating', (n) => {
      this.setRating(n);
    }),
    this.$root.$on('intensity', (n) => {
      this.setIntensity(n);
    }),
    this.$root.$on('search', (text) => {
      this.setSearch(text);
    })
  },

  computed: {
    filteredItems() {
      return this.routines.filter((i) => {
        return i.puntuacion >= this.filterRating && i.intensidad >= this.filterIntensity
      })
    }
  }
}
</script>