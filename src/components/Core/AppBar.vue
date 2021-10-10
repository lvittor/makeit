<template>
  <v-app-bar app color="primary">
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

    <SearchBar class="d-flex align-self-stretch ml-16 pl-5" />

    <div class="d-flex justify-end">
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
        to="/profile"
        color="white"
      >
        <span class="mr-2">Nombre de usuario</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import SearchBar from "../FilterSearch/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.fixeado {
  position: fixed;
}
</style>
