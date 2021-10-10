<template>
  <v-text-field
    ref="input"
    :label="label"
    name="login"
    type="text"
    hide-details="auto"
    outlined
    v-model="computedName"
    :error-messages="error"
    dense
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    name:{
      type: String,
    }
  },

  computed: {
    computedName: {
      get() { return this.name },
      set(value){ this.$emit('update:name', value) },
    }
  }
};
</script>
