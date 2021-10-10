<template>
  <v-app-bar app color="primary">
    <div class="d-flex align-center">
      <v-img
        alt="MakeIt Logo"
        class="shrink mr-2"
        contain
        src="../../assets/M.svg"
        transition="scale-transition"
        width="120"
      />
    </div>

    <SearchBar class="d-flex align-self-stretch ml-16 pl-5" />

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      text
      to="/profile"
    >
      <span class="mr-2">{{ user }}</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
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
        let currUser = await this.$getCurrentUser();
        this.user = currUser.firstName + ' ' + currUser.lastName;
      }
      this.user = ''
    }
  }

}

</script>

<style scoped>
.fixeado {
  position: fixed;
}
</style>