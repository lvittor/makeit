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
          
          <v-btn
            block
            style="min-width: 88px"
            color="primary"
            depressed
            @click="createUser(email, password, confirmpassword, firstName, lastName, username)"
          >
            {{ $vuetify.lang.t("$vuetify.auth.sign-up.signup") }}
          </v-btn>
        </div>
      </div>
    </v-container>
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
      user: null,
      email: '',
      password: '',
      confirmpassword: '',
      firstName: '',
      lastName: '',
      username: '',
    }
  },

  methods: {
    ...mapActions('security', {
      $createUser: 'createUser',
    }),

    async createUser(mail, password, confirmpassword, firstName, lastName, username) {
      if(password == confirmpassword){
        const user = new User(mail, password, firstName, lastName, username + "@gmail.com"  );
        try {
          this.user = await this.$createUser(user);
          Helper.setResult(this.user)
        } catch (e) {
          Helper.setResult(e)
        }
      }
    },
  },
};
</script>
