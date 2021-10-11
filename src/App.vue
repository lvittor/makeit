<template>
  <v-app>
    <AppBar />

    <v-main>
      <router-view :key="$route.path"/>
    </v-main>

    <div v-if="['signin', 'signup'].indexOf($route.name) <= -1">
      <Footer />
    </div>
    
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
