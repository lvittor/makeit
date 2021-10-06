<template>
  <v-data-table
    :headers="headers"
    :items="workouts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Rutina",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Autor", value: "author" },
        { text: "Intensidad", value: "intensity" },
        { text: "Puntuacion", value: "stars" },
        { text: "Equipamiento", value: "equipment" },
        { text: "Duracion", value: "duration" },
      ],
      workouts: [
        {
          name: "Rutina de toro",
          author: "Ezequiel Rodriguez",
          intensity: 5,
          stars: 4,
          equipment: "Si",
          duration: "40min",
        },
        {
          name: "Rutina de toro",
          author: "Ezequiel Rodriguez",
          intensity: 5,
          stars: 4,
          equipment: "Si",
          duration: "40min",
        },
      ],
    };
  },
};
</script>
