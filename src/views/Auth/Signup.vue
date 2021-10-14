<template>
  <div>
    <v-container class="pa-0">
      <div class="mb-4 d-flex justify-center">
        <b style="font-size: 3em">Make</b><i style="font-size: 3em">it</i>
      </div>
      <h1 class="text-h5 mb-6">
        {{ $vuetify.lang.t("$vuetify.auth.sign-up.create") }}
      </h1>
      <v-form>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" md="6">
              <BaseTF
                class="mb-0"
                :label="$vuetify.lang.t('$vuetify.auth.sign-up.firstname')"
                :name.sync="firstName"
              />
            </v-col>
            <v-col cols="12" md="6">
              <BaseTF
                class="mb-0"
                :label="$vuetify.lang.t('$vuetify.auth.sign-up.lastname')"
                :name.sync="lastName"
              />
            </v-col>
          </v-row>
          <BaseTF
            class="my-3"
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.username')"
            :name.sync="username"
          />
          <EmailTF
            class="mb-3"
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.email')"
            :email.sync="email"
          />
          <v-row>
            <v-col cols="12" md="6">
              <PasswordTF
                :label="$vuetify.lang.t('$vuetify.auth.sign-up.password')"
                :password.sync="password"
              />
            </v-col>
            <v-col cols="12" md="6">
              <PasswordTF
                :label="
                  $vuetify.lang.t('$vuetify.auth.sign-up.confirmpassword')
                "
                :password.sync="confirmpassword"
              />
            </v-col>
          </v-row>
          <div class="body-2">
            {{ $vuetify.lang.t("$vuetify.auth.sign-up.password-props") }}
          </div>
        </v-container>
      </v-form>
      <div v-if="password != confirmpassword">
          <span>Las contraseñas no coinciden</span>
      </div>
      <div class="transition-wrapper">
        <div class="d-flex justify-space-between mt-8">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
          >
          <template v-slot:activator="{  attrs }">
          <v-btn
            block
            style="min-width: 88px"
            color="primary"
            depressed
            v-bind="attrs"
            :loading="tryingtoRegister"
            @click="createUser(email, password, confirmpassword, firstName, lastName, username)"
          >
            {{ $vuetify.lang.t("$vuetify.auth.sign-up.signup") }}
          </v-btn>
          </template>
              <v-card>
              <v-card-title class="text-h5">
                {{dialogData.header}}
              </v-card-title>
              <v-card-text>{{dialogData.detail}}</v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="registered"
                  color="primary"
                  text
                  :loading="resendingEmail"
                  @click="resendVerificationEmail()"
                >
                  Reenviar el mail
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  :to="dialogData.button.route"
                  @click="dialog = false"
                >
                  {{dialogData.button.text}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
    <v-snackbar
      v-model="snackbar"
    >
      El mail ha sido reenviado
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { Helper } from "@/helpers.js";
import { User } from "@/../api/user";
import { mapActions } from 'vuex'
 
export default {
  components: {
    PasswordTF: () => import("../../components/TextFields/Password"),
    BaseTF: () => import("../../components/TextFields/Base"),
    EmailTF: () => import("../../components/TextFields/Email"),
  },
  data: () => {
    return {
      registered: false,
      tryingtoRegister: false,
      resendingEmail: false,
      dialog: false,
      snackbar: false,
      user: null,
      email: '',
      password: '',
      confirmpassword: '',
      firstName: '',
      lastName: '',
      username: '',
      dialogData: {
        header: "Se ha registrado exitosamente",
        detail: "En breve podrá ver un mail en su casilla de correo electrónico. Presione el link que se encuentra en el mismo para confirmar su cuenta",
        button: {
          text: "OK",
          route: "/auth/signin"
        }
      },
      success: {
        header: "Se ha registrado exitosamente",
        detail: "En breve podrá ver un mail en su casilla de correo electrónico. Presione el link que se encuentra en el mismo para confirmar su cuenta",
        button: {
          text: "OK",
          route: "/auth/signin"
        }
      },
      error: {
        header: "Ha ocurrido un error",
        detail: "Los datos ingresados no son válidos",
        button: {
          text: "reintentar",
          route: "/auth/signup"
        }
      },
  
    }
  },

  methods: {
    ...mapActions('security', {
      $createUser: 'createUser',
      $resendVerify: 'resendVerify',
    }),

    async resendVerificationEmail(){
        this.resendingEmail = true
        const user = new User(this.email, this.password, this.firstName, this.lastName, this.username  );
        await this.$resendVerify(user);
        this.resendingEmail = false
        this.snackbar = true         
    },

    async createUser(mail, password, confirmpassword, firstName, lastName, username) {
      if(password == confirmpassword){
        this.tryingtoRegister = true
        const user = new User(mail, password, firstName, lastName, username  );
        try {
          this.user = await this.$createUser(user);
          this.tryingtoRegister = false
          this.dialogData = this.success
          this.registered = true
          this.dialog = true          
        } catch (e) {
          this.tryingtoRegister = false
          this.dialogData = this.error
          this.registered = false
          this.dialog = true
          Helper.setResult(e)
        }
      }
    },
  },
};
</script>
