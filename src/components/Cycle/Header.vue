<template>
  <v-toolbar
    dense
    color="primary"
  >
    <v-text-field
      v-model="value"
      hide-details
      color="white"
      background-color="primary"
      dark
      :readonly="readonly"
      @change="sendText($event)"
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
  props: {
    value: {
      type: String,
    },
    readonly: {
      type: Boolean,
    }
  },

  methods: {
    caller() {
      alert(this.value);
    },

    sendText(text) {
      this.$root.$emit('updateTitle', text);
    }
  }
}
</script>
