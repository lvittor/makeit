<<<<<<< HEAD:src/components/TextFields/Password.vue
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
=======
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
>>>>>>> fb728ad998c249d2849233adab770627b6658cd5:src/components/TextFields/PassTF.vue
