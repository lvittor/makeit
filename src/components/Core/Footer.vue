<template>
  <v-footer color="primary" padless :value="['signin', 'signup'].indexOf($route.name) <= -1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        :to="link.route"
        class="my-2"
      >
        {{ link.text }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Makeit</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [{text: "Inicio", route: "/"},
            {text: "Buscar rutina", route: "/find-routine"},
            {text: "Crear rutina", route: "/create-routine"},
            {text: "Tus rutinas y ejercicios", route: "/all-your-routines-and-exercises"}],
  }),
};
</script>
