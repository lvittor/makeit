<template>
  <div>
    <v-container class="vertical-center" align-center  fluid>
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
        <v-row
            key="center"
            justify="center"
          >
            <v-col
              key="1"
              md="2"
            >
              <v-btn
                color="primary"
                elevation="6"
                raised
              > Crear una rutina</v-btn>
            </v-col>
            <v-col
              key="2"
              md="2"
            >
              <v-btn
                color="primary"
                elevation="6"
                raised
              > Buscar una rutina</v-btn>
            </v-col>
            <v-col
              key="3"
              md="2"
              height="100"
              width="100"
            >
              <v-btn
                color="primary"
                elevation="6"
                raised
                x-large
              > 
              Tus rutinas
              <v-icon
                right
                
              >
                mdi-arrow-right-thick
              </v-icon>
              </v-btn>
            </v-col>
          </v-row>
      </v-container>
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
</style>

<script>
export default {
  name: "Home",

  components: {
  
  },
};
</script>
