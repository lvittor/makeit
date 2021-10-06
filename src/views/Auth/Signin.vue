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
          />
          <PasswordTF
            :label="$vuetify.lang.t('$vuetify.auth.sign-up.password')"
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
            @click="wip"
          >
            {{ $vuetify.lang.t("$vuetify.auth.sign-in.signin") }}
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { wip } from "@/helpers.js";

export default {
  components: {
    PasswordTF: () => import("../../components/TextFields/Password"),
    EmailTF: () => import("../../components/TextFields/Email"),
  },

  methods: {
    wip,
  },
};
</script>
