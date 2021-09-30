<template>
  <div>
    <v-container class="vertical-center" align-center fluid>
      <v-row class="signin primary lighten-5">
        <v-col cols="8" class="left">
          <div class="d-flex align-center ma-16 pt-6 pl-6">
            <v-img
              alt="Home Title"
              class="shrink mr-2"
              contain
              src="../assets/HomeTitle.svg"
              transition="scale-transition"
              width="400"
            />
          </div>
        </v-col>
        <v-col cols="4" class="right">
          <div class="d-flex align-center pa-16 ma-10">
            <v-img
              alt="MakeIt Logo"
              class="shrink mr-2"
              contain
              src="../assets/colorLogo.svg"
              transition="scale-transition"
              width="380"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <HomeButtonBar class="vertical-down-pos" />
  </div>
</template>

<style>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 45%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.vertical-down-pos {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  min-height: 73vh;
}
</style>

<script>
import HomeButtonBar from "../components/Buttons/HomeButtonBar";
export default {
  name: "Home",
  components: {
    HomeButtonBar,
  },
};
</script>
