<template>
  <div class="back grey lighten-5" @click="message()">
    <FilterTable />
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

.ele {
  box-shadow: 0 3px 10px rgb(100, 100, 100);
}
</style>
