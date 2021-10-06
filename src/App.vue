<template>
  <v-app>
    <AppBar />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  components: {
    Footer: () => import("./components/Core/Footer"),
    AppBar: () => import("./components/Core/AppBar"),
  },
};
</script>
