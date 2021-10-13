<template>
  <div class="back grey lighten-5" @click="message()">
      <FilterTable class="pt-16"/>
  </div>
</template>

<script>
import FilterTable from "../components/FilterSearch/FilterTable.vue";

export default {
  name: "FindRoutine",

  components: {
    FilterTable,
  },
};
</script>

<style scoped>
.back {
  height: 100%;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 45%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

</style>
