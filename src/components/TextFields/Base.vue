<template>
  <v-text-field
    ref="input"
    :label="label"
    name="login"
    type="text"
    hide-details="auto"
    outlined
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
  },
};
</script>
