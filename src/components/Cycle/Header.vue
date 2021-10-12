<template>
  <v-toolbar
    dense
    color="primary"
  >
    <v-btn icon color="white" @click="prevStep()">
      <v-icon> mdi-arrow-left </v-icon>
    </v-btn>
    <v-text-field
      v-model="value"
      hide-details
      solo
      label="Nombre del ciclo"
      outlined
      color="white"
      background-color="primary"
      dark
      :readonly="readonly"
      @change="sendText($event)"
    >
    </v-text-field>
  </v-toolbar>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
    },
    readonly: {
      type: Boolean,
    },
    cycle: {
      type: Number,
    }
  },

  methods: {
    sendText(text) {
      this.$root.$emit('updateTitle', text, this.cycle);
    },

    prevStep(){
      this.$root.$emit('routineprevstepper');
    },
  }
}
</script>
