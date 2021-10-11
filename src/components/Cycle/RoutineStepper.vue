<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-select
          v-model="steps"
          :items="[3, 4, 5, 6, 7, 8, 9, 10]"
          label="Cantidad de ciclos"
          :disabled="e1 > steps"
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
            :rules="[() => getStatus(n-1)]"
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
          <CycleCard :exercises="cycles[n-1]" :serie="series[n-1]" :title="getTitle()" :readonly="getReadonly()" :cycle="n" :max="steps"/>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-btn @click="printealo()">
      HOLIS
    </v-btn>
  </div>
</template>

<script>
import CycleCard from "./CycleCard.vue"

export default {
  data () {
    return {
      e1: 1,
      steps: 3,
      cycles: [],
      series: [],
      titles: [],
      status: [true, true, true, true, true, true, true, true, true, true],
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
    printealo(){
      alert('CICLOS: ' + JSON.stringify(this.cycles))
      alert('TITULOS: ' + JSON.stringify(this.titles))
      alert('SERIES: ' + JSON.stringify(this.series))
    },

    getTitle() {
      switch(this.e1) {
        case 1:
          return "Calentamiento";
        case this.steps:
          return "Enfriamiento";
        default:
          return this.titles[this.e1-1];
      }
    },

    getReadonly() {
      if (this.e1 == 1 || this.e1 == this.steps )
        return true;
      return false;
    },

    nextStep () {
        this.e1++;
    },

    prevStep () {
      if (this.e1 != 1)
        this.e1--;
    },

    getStatus(n) {
      return this.status[n];
    },

    updateCycles(object, cycle, serie, title) {
      if (cycle == this.e1) {
        this.cycles[cycle-1] = object;
        this.series[cycle-1] = serie;
        this.titles[cycle-1] = title;
      }
    }
  },

  mounted() {
    this.$root.$on('routinestepper', () => {
      this.nextStep();
    }),
    this.$root.$on('routineprevstepper', () => {
      this.prevStep();
    }),
    this.$root.$on('updatecycle', (object, cycle, serie, title) => {
      this.updateCycles(object, cycle, serie, title);
    })
  },

  components: {
    CycleCard,
  }
}
</script>