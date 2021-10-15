<template>
  <div>
    <v-btn
      x-large
      v-bind:color="isFavourite == true ? 'secondary' : 'primary'"
      fab
      @click="changeFavourite()"
    >
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    controller: null,
    isFavourite: false,
    favourites: [],
  }),

  props: {
    routineID: {
      type: Number,
    },
  },

  created() {
    this.setFavourites();
  },

  methods: {
    ...mapActions("routine", {
      $setFavourite: "setFavourite",
      $getFavourites: "getFavourites",
      $getFavouritesPage: "getFavouritesPage",
      $deleteFavourite: "deleteFavourite",
    }),

    async setFavourites() {
      let isLastPage = false;
      let i = 0;
      this.favourites = [];
      while (!isLastPage) {
        const pickedFavourites = await this.$getFavouritesPage({
          page: i,
          size: 10,
        });
        i = i + 1;
        isLastPage = pickedFavourites.isLastPage;

        for (const fav of pickedFavourites.content)
          this.favourites.push(fav.id);
      }
    },

    isRoutineFavourite(id) {
      this.isFavourite = this.favourites.includes(id);
    },

    async changeFavourite() {
      if (this.isFavourite) {
        await this.$deleteFavourite(this.routineID);
        this.favourites.splice(this.favourites.indexOf(this.routineID), 1);
        this.isFavourite = false;
      } else {
        await this.$setFavourite(this.routineID);
        this.favourites.push(this.routineID);
        this.isFavourite = true;
      }
      this.$root.$emit("updateFavs");
    },
  },
};
</script>
