<template>
  <v-app-bar app color="primary" dark>
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

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
      to="/profile"
    >
      <span class="mr-2">{{ user }}</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  data: () => {
    return {
      firstName: '',
      lastName: '',
      user: '',
    }
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
</script>>