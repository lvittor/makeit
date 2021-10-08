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
              />
            </v-col>
            <v-col cols="12" md="6">
              <BaseTF
                class="mb-0"
                :label="$vuetify.lang.t('$vuetify.auth.sign-up.lastname')"
              />
            </v-col>
          </v-row>
          <BaseTF
            class="my-3"
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.username')"
          />
          <EmailTF
            class="mb-3"
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.email')"
          />
          <v-row>
            <v-col cols="12" md="6">
              <PasswordTF
                :label="$vuetify.lang.t('$vuetify.auth.sign-up.password')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <PasswordTF
                :label="
                  $vuetify.lang.t('$vuetify.auth.sign-up.confirmpassword')
                "
              />
            </v-col>
          </v-row>
          <div class="body-2">
            {{ $vuetify.lang.t("$vuetify.auth.sign-up.password-props") }}
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
            @click="Helper.login"
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

export default {
  components: {
    PasswordTF: () => import("../../components/TextFields/Password"),
    BaseTF: () => import("../../components/TextFields/Base"),
    EmailTF: () => import("../../components/TextFields/Email"),
  },

  methods: {
    Helper,
  },
};
</script>
