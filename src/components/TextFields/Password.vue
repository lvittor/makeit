<template>
  <v-text-field
    :label="label"
    v-model="password"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[rules.Required, rules.min]"
    :type="show ? 'text' : 'password'"
    name="Password"
    :height="height"
    outlined
    dense
    @click:append="show = !show"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
};
</script>
