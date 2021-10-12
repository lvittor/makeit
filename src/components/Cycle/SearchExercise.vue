<template>
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
</template>

<script>
import { mapState } from 'vuex'

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
    }
  },

  computed: {
    ...mapState('exercise', {
      $exercises: state => state.items,
    }),
  },

  created() {
    this.setExercises()
  },

  methods: {    

    setResult(result){
      this.result = result;
    },

    setExercises(){
      const pickedExercises = this.$exercises
      this.setResult(pickedExercises);
      for (let i = 0; i < this.result.content.length; i++){
        this.exercises.push(this.result.content[i].name)
      }
    },

    changeActual(text) {
      this.actual = text;
      this.$root.$emit('setter', text, this.id, this.cycle);
    }
  }
}
</script>