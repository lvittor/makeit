<template>
  <v-container class="pt-16">
    <v-row align="end">
      <v-col md="2" />
      <v-col md="6">
        <tit class="titulazos">Rutinas encontradas</tit>
      </v-col>
    </v-row>
    <v-container class="pt-16">
      <div class="back grey lighten-5 align-center fluid" @click="message()">
          <FilterTable class="pa-16"/>
      </div>
    </v-container>
  </v-container>
</template>

<style>
.titulazos {
  font-size: 80px;
  vertical-align: bottom;
}
</style>


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
