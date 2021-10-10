<template>
  <div class="pa-3">
    <div>
      <p class="text-center">
        {{ component[0] }}
        <router-link :to="component[2]">{{ component[1] }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
//import { wip } from "@/helpers.js";

export default {
  computed: {
    component() {
      return this.$route.name == "signin"
        ? ["¿Todavía no tenes una cuenta?", "Registrate", "/auth/signup"]
        : ["¿Ya tenes una cuenta?", "Iniciar sesion", "/auth/signin"];
    },
  },
  // methods: {
  //   wip,
  // },
};
</script>
