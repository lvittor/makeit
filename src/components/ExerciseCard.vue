<template>
    <v-card class="mx-auto" max-width="344">
        <div>
          <v-card-title>
            <v-container>
              <v-row class="pa-0">
                <v-col md="8">
                  <slot><h2 class="h6">{{ namep }}</h2></slot>
                </v-col>
                <v-col md="2">
                  <v-btn icon align="right">
                    <v-icon> mdi-pencil </v-icon>
                  </v-btn>
                </v-col>
                <v-col md="2">
                  <v-btn icon align="right">
                    <v-icon> mdi-trash-can-outline </v-icon>
                  </v-btn>
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
      </v-card>
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