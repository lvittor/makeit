<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <div>
          <v-card-title>
            <v-container>
              <v-row class="pa-0">
                <v-col>
                  <slot><h2 class="h6">{{ namep }}</h2></slot>
                </v-col>
              </v-row>
                <slot><textovich class="desc">{{ desc }}</textovich></slot>
            </v-container>
          </v-card-title>
        </div>
        <v-container >
          <v-row >
            <v-img
                :src="img"
            ></v-img>
          </v-row>
        </v-container>
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <div class="pa-2" align="center"> <!-- @click="getEditableRoutine(/*id de la rutina*/1)" -->
              <v-btn>Editar</v-btn>
            </div>
            <div class="pa-2" align="center">
              <v-btn>Eliminar</v-btn>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<style>

.desc{
  font-size: 20px
}

</style>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: require("@/assets/defaultImage.png"),
    },
    namep: {
      type: String,
    },
    desc: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    
  }),
};
</script>