<template>
    <v-card class="mx-auto" max-width="344">
        <v-card-title>
            <slot><h2 class="h6">{{ namep }}</h2></slot>
            <slot>{{ desc }}</slot>
            <slot>{{ img }}</slot>
        </v-card-title>

        <v-img
            src="@/assets/defaultImage.png"
        ></v-img>
      </v-card>
    
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "@/assets/defaultImage.png",
    },
    namep: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  data: () => ({
    //
  }),
};
</script>