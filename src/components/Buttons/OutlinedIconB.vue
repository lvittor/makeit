<template>
  <v-btn
    v-bind:color="type === 'guest' ? 'primary' : 'secondary'"
    fab
    outlined
    small
  >
    <v-icon>mdi-star</v-icon>
  </v-btn>
</template>
