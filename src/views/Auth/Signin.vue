<template>
  <div>
    <v-container class="pa-0">
      <div class="mb-4 d-flex justify-center">
        <b style="font-size: 3em">Make</b><i style="font-size: 3em">it</i>
      </div>
      <h1 class="text-h5 mb-6">
        {{ $vuetify.lang.t("$vuetify.auth.sign-in.title") }}
      </h1>
      <v-form>
        <v-container class="pa-0">
          <EmailTF
            class="mb-3"
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.email')"
            :email.sync="email"
          />
          <PasswordTF
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.password')"
            :password.sync="password"
          />
          <div class="d-flex justify-end">
            <a class="pa-0 text-none" text color="primary" max-height="19">
              {{ $vuetify.lang.t("$vuetify.auth.sign-in.forgotpassword") }}
            </a>
          </div>
        </v-container>
      </v-form>
      <div class="transition-wrapper">
        <div class="d-flex justify-space-between mt-8">
          <v-btn
            block
            style="min-width: 88px"
            color="primary"
            depressed
            @click="login(email, password)"
            :disabled="$isLoggedIn"
          >
            {{ $vuetify.lang.t("$vuetify.auth.sign-in.signin") }}
          </v-btn>
          
        </div>
        <v-btn @click="logout()">
            logout
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { Helper } from "@/helpers.js";
import {mapState, mapGetters, mapActions} from 'vuex'
import {Credentials} from "@/../api/user.js";


export default {
  components: {
    PasswordTF: () => import("../../components/TextFields/Password"),
    EmailTF: () => import("../../components/TextFields/Email"),
  },
  data() {
    return {
      email: '',
      password: '',
      result: null,
      controller: null
    }
  },
  computed: {
    ...mapState('security', {
      $user: state => state.user,
    }),
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn'
    }),
    canAbort() {
      return this.$isLoggedIn && this.controller
    }
  },
  methods: {
     ...mapActions('security', {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    async login(username, password) {
      try {
        const credentials = new Credentials(username, password)
        await this.$login({credentials, rememberMe: true })
        Helper.clearResult()
      } catch (e) {
        Helper.setResult(e)
      }
    },
    async logout() {
      await this.$logout()
      Helper.clearResult()
    },
  }
};
</script>
