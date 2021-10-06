<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="MakeIt Logo"
        class="shrink mr-2"
        contain
        src="../../assets/M.svg"
        transition="scale-transition"
        width="120"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Nombre de usuario</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>
