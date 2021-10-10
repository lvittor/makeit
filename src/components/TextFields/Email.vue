<template>
  <v-text-field
    placeholder="E-mail"
    outlined
    v-model="computedEmail"
    :rules="emailRules"
    :label="label"
    required
    hide-details="auto"
    dense
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  data: () => ({
    emailRules: [
      (v) => !!v || "El Email es obligatorio",
      (v) => /.+@.+/.test(v) || "El Email ingresado no es válido",
    ],
  }),
  computed: {
    computedEmail: {
      get() { return this.email },
      set(value){ this.$emit('update:email', value) },
    }
  }
};
</script>
