<template>
    <v-container fluid class="pa-0">     
        <v-row justify="end">
            <v-col md="4"/>
            <v-col md="4">
                <v-btn
                    x-large
                    color="primary"
                    dark
                    rounded
                    width="400"
                    height="100"
                    outlined
                    to="/auth/signup"
                    class="register"
                ><h1>Registrarse</h1>
                </v-btn>
            </v-col>
            <v-col md="4" right>
                <v-btn
                    x-large
                    color="primary"
                    dark
                    rounded
                    width="400"
                    height="100"
                    to="/auth/signin"
                    class="login"
                ><h1>Iniciar sesion</h1>
                </v-btn>
            </v-col>
        </v-row>
        <div align="center" class="pa-0 action bg-shape" fluid>
            <v-img
                lazy-src="https://p4.wallpaperbetter.com/wallpaper/609/842/406/training-hd-wallpaper-wallpaper-preview.jpg"
                max-height="800"
                max-width="1960"
                src="https://p4.wallpaperbetter.com/wallpaper/609/842/406/training-hd-wallpaper-wallpaper-preview.jpg"
                class="pa-0 faded"
            />
            <v-img
            alt="Home Title"
            class="shrink mr-2 bg-shape overlay2"
            contain
            src="../assets/HomeTitle.svg"
            transition="scale-transition"
            width="900"
            />
            <v-img
            alt="MakeIt Logo"
            class="shrink mr-2 d-flex pa-16 ma-10 overlay bg-shape2"
            contain
            src="../assets/colorLogo.svg"
            transition="scale-transition"
            width="380"
            />
        </div>
    </v-container>
</template>
<style>
.action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}
.faded{
    opacity: 0.3;
}
.overlay {
      z-index: 1;
      position: absolute;
      left:67%;
}
.overlay2 {
      z-index: 1;
      position: absolute;
      left:4%;
      top: 35%;
}
.bg-shape>.v-image__image {
  background-size: 800px 1960px;
  background-repeat: no-repeat;
}
.bg-shape2>.v-image__image {
  background-size: 380px 380px;
  background-repeat: no-repeat;
}
.login{
    right:-30%;
    top: 40%;
}
.register{
    right:-63%;
    top: 40%;
}

</style>
<script>
export default {
    data: () => ({
    //
    }),
}
</script>