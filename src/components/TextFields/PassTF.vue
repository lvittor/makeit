<template>
  <v-text-field
    v-model="password"
    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[rules.Required]"
    :type="show1 ? 'text' : 'password'"
    name="Password"
    label="Contraseña"
    outlined
    counter
    @click:append="show1 = !show1"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
</script>
