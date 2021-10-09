<template>
  <div class="back primary lighten-5" >
    <v-container class="profile white">
      <v-row justify="center">
        <v-col cols="8">
          
          <v-row justify="center">
            <v-hover>
              <template v-slot:default="{ hover }"> 
                <v-avatar class="mt-16 mb-5" size="300" >
                  <img
                      :src= user.avatarUrl
                      :alt= user.username
                  >
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="#036358"
                    >
                      <v-btn
                        :to="buttons[0].route"
                      >
                      {{buttons[0].text}}
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-avatar>
              </template>
            </v-hover>    
          </v-row>


          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >{{textfields.firstName}}</h3>
            </v-col>
            <v-col>
              <h3>{{user.firstName}}</h3>
            </v-col> 
          </v-row>
          <v-row>
            <v-divider/>
          </v-row>
          
          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >{{textfields.lastName}}</h3>
            </v-col>
            <v-col>
              <h3>{{user.lastName}}</h3>
            </v-col> 
          </v-row>
          <v-row>
            <v-divider/>
          </v-row>
          
          <v-row justify="center" >
            <v-col>
              <h3 class="font-weight-light" >{{textfields.username}}</h3>
            </v-col>
            <v-col>
              <h3>{{user.username}}</h3>
            </v-col> 
          </v-row>
          <v-row>
            <v-divider/>
          </v-row>

          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >{{textfields.email}}</h3>
            </v-col>
            <v-col>
              <h3>{{user.email}}</h3>
            </v-col> 
          </v-row>
          <v-row>
            <v-divider/>
          </v-row>

          <v-row align="center" justify="space-around" class="mt-10">
              <v-btn
                depressed
                color="primary"
                x-large
                :to="buttons[1].route"
              >
                {{ buttons[1].text }}
              </v-btn>   
              <v-btn
                depressed
                outlined
                color="primary"
                x-large
                :to="buttons[2].route"
              >
                {{ buttons[2].text }}
              </v-btn>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
   
  name: "UserProfile",
  components: {
  },

  props: {
  },

  data(){
       return {
            waitData: null,
            currUser:" null",
            user: {
              id: null,
              username: '',
              firstName: '',
              lastName: '',
              gender: "male",
              birthdate: 284007600000,
              email: '',
              phone: "98295822",
              avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
              metadata: null,
              date: 1602139940660,
              lastActivity: 1602483829035,
              verified: true,
            },

            textfields: {
              firstName: "Nombre",
              lastName: "Apellido",
              username: "Nombre de Usuario",
              email: "Mail",
            },
            
            buttons: [
              { text: "Editar", route: "/" },
              { text: "Editar perfil", route: "/profile-edit" },
              { text: "Cerrar sesion", route: "/" },
            ],
            
            overlay: false,
       } 
  },

  

  computed: {
    ...mapState('security', {
      $user: state => state.user,
    }),
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn',
    }),
  },

  created() {
    this.getCurrentUser().then(
      ()=>{
          this.user.email = this.$user.username 
          this.user.username = this.$user.email 
          this.user.firstName = this.$user.firstName 
          this.user.lastName = this.$user.lastName 
      }
    )
    
  },

  methods: {
    ...mapActions('security', {
      $getCurrentUser: 'getCurrentUser',
    }),

    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },

    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },

  },

  
};
</script>

<style scoped>
  .back {
    height: 100%;
  }
  .profile {
    width: 50%;
    height: 100%;
  }
</style>