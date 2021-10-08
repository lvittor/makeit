<template>
  <v-toolbar
    dense
    color="primary"
  >
    <v-btn icon
      color="white"
    >
      <v-icon dark>
        mdi-close
      </v-icon>
    </v-btn>

    <v-text-field
      hide-details
      color="white"
      background-color="primary"
      dark
    >
    </v-text-field>

    <v-btn icon
      color="white"
      @click="caller()"
    >
      <v-icon dark>
        mdi-check
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>

export default {
  methods: {
    caller() {
      this.$root.$emit('routinestepper');
    }
  }
}
</script>
