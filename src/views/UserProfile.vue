<template>
  <div class="back primary lighten-5">
    <v-container class="profile white">
      <v-row justify="center">
        <v-col cols="8">
          <v-row>
            <span class="titulazos">Perfil</span>
          </v-row>
          <v-row>
            <v-divider></v-divider>
          </v-row>
          <v-row justify="center">
            <v-avatar class="mt-16 mb-5" size="280" color="secondary">
              <span class="white--text text-h1">{{
                this.$user.firstName.charAt(0).toUpperCase() +
                this.$user.lastName.charAt(0).toUpperCase()
              }}</span>
            </v-avatar>
          </v-row>

          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light">{{ textfields.firstName }}</h3>
            </v-col>
            <v-col>
              <div v-if="!editionMode">
                <h3>{{ this.$user.firstName }}</h3>
              </div>
              <div v-else>
                <v-text-field
                  v-model="editedData.firstName"
                  label="Empty"
                  solo
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-divider />
          </v-row>

          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light">{{ textfields.lastName }}</h3>
            </v-col>
            <v-col>
              <div v-if="!editionMode">
                <h3>{{ this.$user.lastName }}</h3>
              </div>
              <div v-else>
                <v-text-field
                  v-model="editedData.lastName"
                  label="Empty"
                  solo
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-divider />
          </v-row>

          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light">{{ textfields.username }}</h3>
            </v-col>
            <v-col>
              <div v-if="!editionMode">
                <h3>{{ this.$user.avatarUrl }}</h3>
              </div>
              <div v-else>
                <v-text-field
                  :value="$user.avatarUrl"
                  label="Empty"
                  solo
                  disabled
                  readonly
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-divider />
          </v-row>

          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light">{{ textfields.email }}</h3>
            </v-col>
            <v-col>
              <div v-if="!editionMode">
                <h3>{{ this.$user.email }}</h3>
              </div>
              <div v-else>
                <v-text-field
                  :value="this.$user.email"
                  label="Empty"
                  solo
                  disabled
                  readonly
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-divider />
          </v-row>
          <!-- <div v-if="editionMode">
          <v-row justify="center">
            <v-col>
              <h3 class="font-weight-light" >Contraseña</h3>
            </v-col>
            <v-col>
              
                <PasswordTF
                label="Nueva contraseña"
                :password.sync="editedData.password"
                />
                
            </v-col> 
            <h1> {{ editedData.password }} </h1>
          </v-row>
          </div>
          <v-row>
            <v-divider/>
          </v-row> -->

          <div v-if="!editionMode">
            <v-row align="center" justify="space-around" class="mt-10">
              <v-btn
                depressed
                color="primary"
                x-large
                class="mb-10"
                @click="editionMode = true"
              >
                {{ buttons[1].text }}
              </v-btn>

              <v-btn
                depressed
                outlined
                color="primary"
                x-large
                class="mb-10"
                @click="logout()"
              >
                {{ buttons[2].text }}
              </v-btn>
            </v-row>
          </div>
          <div v-else>
            <v-row align="center" justify="space-around" class="mt-10">
              <v-btn
                depressed
                color="primary"
                x-large
                class="mb-10"
                @click="cancelEdition()"
              >
                {{ buttons[3].text }}
              </v-btn>
              <v-btn
                depressed
                outlined
                color="primary"
                class="mb-10"
                x-large
                @click="changeUserData()"
              >
                {{ buttons[4].text }}
              </v-btn>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Helper } from "@/helpers.js";
import { User } from "@/../api/user";

export default {
  name: "UserProfile",
  components: {
    //PasswordTF: () => import("@/components/TextFields/Password"),
  },

  props: {},

  data() {
    return {
      editionMode: false,
      waitData: null,
      currUser: " null",

      editedData: {
        firstName: "",
        lastName: "",
        // password: '',
        // confirmpassword: '',
        avatarUrl: "",
      },

      textfields: {
        firstName: "Nombre",
        lastName: "Apellido",
        username: "Nombre de Usuario",
        email: "Mail",
      },

      buttons: [
        { text: "Editar", route: "/" },
        { text: "Editar perfil", route: "/profile" },
        { text: "Cerrar sesion", route: "/welcome" },
        { text: "Cancelar", route: "/" },
        { text: "Guardar cambios", route: "/" },
      ],

      overlay: false,
    };
  },

  computed: {
    ...mapState("security", {
      $user: (state) => state.user,
    }),
    ...mapGetters("security", {
      $isLoggedIn: "isLoggedIn",
    }),
  },

  created() {
    this.getCurrentUser().then(() => {
      this.cleanEditedData();
    });
  },

  methods: {
    ...mapActions("security", {
      $getCurrentUser: "getCurrentUser",
      $logout: "logout",
      $modifyUser: "modifyUser",
    }),

    async logout() {
      this.$router.push("/welcome");
      await this.$logout();
      Helper.clearResult();
    },

    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },

    cleanEditedData() {
      this.editedData.firstName = this.$user.firstName;
      this.editedData.lastName = this.$user.lastName;
      this.editedData.avatarUrl = this.$user.avatarUrl;
    },

    cancelEdition() {
      this.editionMode = false;
      this.cleanEditedData();
    },

    async getCurrentUser() {
      await this.$getCurrentUser();
      this.setResult(this.$user);
    },

    async changeUserData() {
      const modified = new User(
        this.$user.email,
        this.editedData.password,
        this.editedData.firstName,
        this.editedData.lastName,
        this.$user.username
      );
      await this.$modifyUser(modified);
      this.setResult(this.$user);
      this.cleanEditedData();
      this.editionMode = false;
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
.titulazos {
  font-size: 80px;
  vertical-align: bottom;
}
</style>
