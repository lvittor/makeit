<template>
  <div>
    <v-autocomplete
      v-model="actual"
      :items="exercises"
      hide-details
      hide-selected
      label="Busca un ejercicio..."
      solo
      outlined
      prepend-inner-icon="mdi-magnify"
      flat
      @change="changeActual($event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    controller: null,
    result: null,
    exercises: [],
  }),

  props: {
    actual: {
      type: String,
    },
    id: {
      type: Number,
    },
    cycle: {
      type: Number,
    },
  },

  computed: {
    ...mapState("exercise", {
      $exercises: (state) => state.items,
    }),
    ...mapGetters("exercise", {
      $getAll: "getAllExercises",
    }),
  },

  async created() {
    await this.getAllExercises();
    this.setExercises();
  },

  methods: {
    setResult(result) {
      this.result = result;
    },

    async getAllExercises() {
      try {
        const exercises = await this.$getAll;
        this.setResult(exercises);
      } catch (e) {
        alert(e);
      }
    },

    setExercises() {
      for (let i = 0; i < this.result.length; i++) {
        this.exercises.push(this.result[i].name);
      }
    },

    changeActual(text) {
      this.actual = text;
      this.$root.$emit("setter", text, this.id, this.cycle);
    },
  },
};
</script>
