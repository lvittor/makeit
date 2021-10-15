<template>
  <v-btn x-large color="primary" fab @click="pushEdit()">
    <v-icon>mdi-pencil</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    routineid: {
      type: Number,
    },
  },

  methods: {
    pushEdit() {
      this.$router.push({
        name: "CreateRoutine",
        params: { edit: true, routineid: this.routineid },
      });
    },
  },
};
</script>
