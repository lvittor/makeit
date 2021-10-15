<template>
  <v-text-field
    :label="label"
    v-model="computedPassword"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[rules.Required, rules.min]"
    :type="show ? 'text' : 'password'"
    name="Password"
    :height="height"
    outlined
    hide-details="auto"
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
    password: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  computed: {
    computedPassword: {
      get() {
        return this.password;
      },
      set(value) {
        this.$emit("update:password", value);
      },
    },
  },
};
</script>
