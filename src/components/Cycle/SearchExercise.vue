<template>
  <v-autocomplete
    :items="items"
    hide-details
    hide-selected
    label="Busca un ejercicio..."
    solo
    outlined
    prepend-inner-icon="mdi-magnify"
    flat
  />
</template>

<script>
  export default {
    data: () => ({
      items: ['Jumping Jacks', 'Abs', 'Papafrita', 'Zaramamba', 'FIUUUUUUUMBA'],
    }),
  }
</script>