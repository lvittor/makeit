<template>
  <v-autocomplete
    v-model="actual"
    :items="items"
    hide-details
    hide-selected
    label="Busca un ejercicio..."
    solo
    outlined
    prepend-inner-icon="mdi-magnify"
    flat
    @change="changeActual($event)"
  />
</template>

<script>
  export default {
    data: () => ({
      items: ['Jumping Jacks', 'Abs', 'Papafrita', 'Zaramamba', 'FIUUUUUUUMBA'],
    }),

    props: {
      actual: {
        type: String,
      },
      id: {
        type: Number,
      }
    },

    methods: {
      changeActual(text) {
        this.actual = text;
        this.$root.$emit('setter', text, this.id);
      }
    }
  }
</script>