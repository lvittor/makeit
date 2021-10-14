<template>
  <v-container fluid>
    <v-row align="end">
      <v-col cols=3 />
      <v-col cols=8>
        <span class="titulazos">Rutinas encontradas</span>
      </v-col>
      <v-col cols=1 align-self="start">
         <GoBack class="go-back-position"/>
      </v-col>
    </v-row>
    <v-container class="pt-16" fluid>
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
.go-back-position {
   position: relative;
   top: 5px;
}
</style>


<script>
import FilterTable from "../components/FilterSearch/FilterTable.vue";
import GoBack from "../components/Buttons/GoBack"

export default {
  name: "FindRoutine",

  components: {
    FilterTable,GoBack,
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
