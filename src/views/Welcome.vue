<template>
  <div>
    <v-container align-center fluid class=" py-10" >
        <v-row justify="end">
            <v-col cols="8"/>
            <v-col cols="2">
                <v-btn
                    x-large
                    color="primary"
                    class="px-7 bt"
                    dark
                    rounded 
                    outlined
                    to="/auth/signup" 
                    height="10vh"
                >
                Registrarse
                </v-btn>
            </v-col>
            <v-col cols="2" right>
                <v-btn
                  class="bt"
                    x-large
                    height="10vh"
                    color="primary"
                    dark
                    rounded
                    to="/auth/signin"
                >
                Iniciar sesion
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-container class=" pa-0" align-center fluid>
      <v-row class="signin primary lighten-5">
        <v-col cols="8" class="left">
          <div class="d-flex align-center ma-16 pt-6 pl-6">
            <v-img
              alt="Home Title"
              class="shrink mr-2"
              contain
              src="../assets/HomeTitle.svg"
              transition="scale-transition"
              
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
            />
          </div>
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

.bt {
  width: 100%;
}

.welcome_msg{
  width: 100%;
}
</style>


<script>
export default {
    data: () => ({
    //
    }),
}
</script>