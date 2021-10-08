<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-select
          v-model="steps"
          :items="[2, 3, 4, 5, 6, 7, 8, 9, 10]"
          label="Cantidad de ciclos"
        ></v-select>
      </v-card-text>
    </v-card>

    <v-stepper v-model="e1" class="mb-10">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
          class="pa-0 mt-0"
        >
          <CycleCard />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  import CycleCard from "./CycleCard.vue"

  export default {
    data () {
      return {
        e1: 1,
        steps: 2,
      }
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val;
        }
      },
    },

    methods: {
      nextStep () {
        if (this.e1 === this.steps)
          this.e1 = 1;
        else
          this.e1++;
      },
    },

    mounted() {
      this.$root.$on('routinestepper', () => {
        this.nextStep();
      })
    },

    components: {
      CycleCard,
    }
  }
</script>