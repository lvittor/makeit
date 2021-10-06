<template>
  <v-container
    class="fill-height justify-center"
    :class="{ 'align-start': $vuetify.breakpoint.xsOnly }"
    fluid
  >
    <login-card :loading="loading" :disabled="disabled">
      <router-view />
    </login-card>
  </v-container>
</template>

<script>
import LoginCard from "@/components/LoginCard/LoginCard";

export default {
  components: { LoginCard },
};
</script>
