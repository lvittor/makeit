<template>
  <v-app-bar app color="primary" :value="['signin', 'signup'].indexOf($route.name) <= -1" height="75px">
    <v-container class="dim d-flex align-self-stretch" fluid>
      <v-row justify="space-between">
        <v-col md="2">
            <div class="d-flex align-center dim" >
                  <v-img
                    alt="MakeIt Logo"
                    class="shrink mr-2"
                    contain
                    src="../../assets/M.svg"
                    transition="scale-transition"
                    width="110"
                  />
            </div>
        </v-col>
        <v-col md="5">
          <div v-if="$isLoggedIn">
            <SearchBar  class="dim d-flex align-self-stretch"/>
          </div>
        </v-col>
        <v-col md="2">
          <v-btn
            text
            absolute
            right
            dark
            to="/profile"
          >
            <span class="mr-2 ">{{ user }}</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    
  </v-app-bar>
</template>

<script>
import SearchBar from "../FilterSearch/SearchBar.vue";
import {mapState, mapGetters, mapActions} from 'vuex'



export default {
  data: () => {
    return {
      firstName: '',
      lastName: '',
      user: '',
    }
  },

  created(){
    this.getFirstAndLastName()
  },

  components: {
    SearchBar,
  },
  computed: {
    ...mapState('security', {
      $user: state => state.user,
    }),
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn'
    }),
  },
  methods: {
    ...mapActions('security', {
      $getCurrentUser: 'getCurrentUser',
    }),
    async getFirstAndLastName(){
      if (this.$isLoggedIn){
        
        
        await this.$getCurrentUser()
        this.user = this.$user.firstName + ' ' + this.$user.lastName
        
      }else{
        this.user = ''
      }
    }
  }

}

</script>

<style scoped>
.fixeado {
  position: fixed;
}

.dim{
  height: 50px;
}
</style>