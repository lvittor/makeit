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
              <v-text-field
                    :value="user.firstName"
                    label="Regular"
                    solo
                ></v-text-field>
            </v-col> 
          </v-row>
          
          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >{{textfields.lastName}}</h3>
            </v-col>
            <v-col>
                <v-text-field
                    :value="user.lastName"
                    label="Regular"
                    solo
                ></v-text-field>
            </v-col> 
          </v-row>
          
          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >{{textfields.username}}</h3>
            </v-col>
            <v-col>
                <v-text-field
                    :value="user.username"
                    label="Regular"
                    solo
                    disabled
                    readonly
                ></v-text-field>
            </v-col> 
          </v-row>

          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >{{textfields.email}}</h3>
            </v-col>
            <v-col>
              <v-text-field
                :value="user.email"
                label="Regular"
                solo
                disabled
                readonly
                
            ></v-text-field>
            </v-col> 
          </v-row>

          <v-row align="center" justify="space-around" class="mt-10">
              <v-btn
                depressed
                outlined
                color="primary"
                x-large
                :to="buttons[1].route"
              >
                {{ buttons[1].text }}
              </v-btn>
          </v-row>
            
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
   
  name: "UserProfileEdit",
  components: {
  },

  props: {
  },

  data(){
       return {
            
            user: {
              id: 1,
              username: "johndoe",
              firstName: "John",
              lastName: "Doe",
              gender: "male",
              birthdate: 284007600000,
              email: "johndoe@email.com",
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
              { text: "Guardar cambios", route: "/" },
            ],
            
            overlay: false,
       }
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