<template>
  <span class="go-back">
    <v-btn @click="goBack" class="btn" icon x-large><v-icon>mdi-arrow-left-thick</v-icon>Volver</v-btn>
  </span>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.go-back {
  display: flex;
  cursor: pointer;
}
button {
  border: 0;
}
</style>