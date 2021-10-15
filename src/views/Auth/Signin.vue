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
            <a
              class="pa-0 text-none red--text"
              text
              color="red"
              max-height="19"
            >
              {{ errMessage }}
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
      </div>
      <div class="transition-wrapper" v-if="verificationError">
        <div class="d-flex justify-space-between mt-8">
          <v-btn
            block
            style="min-width: 88px"
            color="primary"
            depressed
            text
            @click="resendVerificationEmail()"
            :loading="resendingEmail"
          >
            Reenviar email de verificación
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Credentials } from "@/../api/user.js";

export default {
  components: {
    PasswordTF: () => import("../../components/TextFields/Password"),
    EmailTF: () => import("../../components/TextFields/Email"),
  },
  data() {
    return {
      email: "",
      verificationError: false,
      resendingEmail: false,
      password: "",
      result: null,
      controller: null,
      errMessage: "",
    };
  },
  computed: {
    ...mapState("security", {
      $user: (state) => state.user,
    }),
    ...mapGetters("security", {
      $isLoggedIn: "isLoggedIn",
    }),
    canAbort() {
      return this.$isLoggedIn && this.controller;
    },
  },
  methods: {
    ...mapActions("security", {
      $getCurrentUser: "getCurrentUser",
      $login: "login",
      $logout: "logout",
      $resendVerify: "resendVerify",
    }),

    async resendVerificationEmail() {
      this.resendingEmail = true;
      await this.$resendVerify({ email: this.email });
      this.resendingEmail = false;
      this.snackbar = true;
    },

    async login(username, password) {
      try {
        const credentials = new Credentials(username, password);
        this.$root.$emit("updateAppbar");
        await this.$login({ credentials, rememberMe: true });
        this.$router.push({
          name: "Home",
        });
        this.$emit("updateAppbar");
      } catch (e) {
        if (e.code == 4) {
          this.errMessage = "Contraseña o usuario inválidos";
        } else if (e.code == 8) {
          this.errMessage = "El email ingresado no se encuentra verificado";
          this.verificationError = true;
        }
      }
    },
  },
};
</script>
