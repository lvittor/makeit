<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    bottom
    temporary
    width=500px
  >
    <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>
    <v-container>
        <v-row>
            <v-col>
                <h1>Titulo</h1>
                <h5>Desc</h5>
            </v-col>
            <v-col>
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
                >
                </v-rating>
                <v-rating
                :value="score"
                dense
                color="orange"
                background-color="grey"
                hover
                class="mr-2"
                readonly
                >
                </v-rating>
            </v-col>
        </v-row>       
    </v-container>

  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  },
}
</script>