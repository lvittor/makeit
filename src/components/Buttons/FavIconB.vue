<template>
  <div>
    <v-btn v-bind:color="isFavourite == true ? 'secondary' : 'primary'" fab @click="changeFavourite()">
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
      favourites: []
    }),

    props: {
        routineID: {
            type: Number
        }
    },

    created () {
      this.setFavourites()
    },

    methods: {
        ...mapActions('routine', {
            $setFavourite: 'setFavourite',
            $getFavourites: 'getFavourites',
            $deleteFavourite: 'deleteFavourite'
        
        }),

        async setFavourites(){
          const pickedFavourites = await this.$getFavourites();
          this.favourites = []
          for(const fav of pickedFavourites.content)
            this.favourites.push(fav.id)
        },

        isRoutineFavourite(id) {
          this.isFavourite = this.favourites.includes(id)
        },

        async changeFavourite(){
          if (this.isFavourite){
            await this.$deleteFavourite(this.routineID);
            this.favourites.splice(this.favourites.indexOf(this.routineID), 1)
            this.isFavourite = false
          }
          else{
            await this.$setFavourite(this.routineID);
            this.favourites.push(this.routineID)
            this.isFavourite = true
          }
        },
    }
}

</script>