<template>
  <v-text-field
    placeholder="E-mail"
    outlined
    v-model="email"
    :rules="emailRules"
    :label="label"
    required
    dense
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
  data: () => ({
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
};
</script>
