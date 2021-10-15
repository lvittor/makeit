<template>
  <v-container class="grey lighten-5" fluid>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="8">
        <span class="titulazos">Crear rutina</span>
      </v-col>
      <v-col cols="1" align-self="start">
        <GoBack class="go-back-position" />
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-10" align="center">
      <v-col cols="3" sm="2" md="3">
        <v-img
          contain
          height="400"
          width="400"
          src="https://media.gettyimages.com/vectors/dumbbell-weight-loss-flat-design-icon-vector-id1078218468?k=20&m=1078218468&s=612x612&w=0&h=x5CP96gF-RWE-QnulkzAfsSsm1B8x6xyHaCIczaDGak="
        ></v-img>
      </v-col>
      <v-col cols="3" sm="2" md="3">
        <v-text-field
          v-model="name"
          label="Nombre de la rutina"
          outlined
          hide-details="auto"
          class="pb-4"
          background-color="white"
        ></v-text-field>
        <v-textarea
          v-model="desc"
          label="Descripción"
          outlined
          hide-details="auto"
          class="pb-4"
          background-color="white"
          rows="3"
        ></v-textarea>
        <v-autocomplete
          v-model="selected"
          class="pb-4"
          :items="items"
          hide-details
          hide-selected
          label="Seleccione una categoria..."
          solo
          outlined
          flat
        >
        </v-autocomplete>
        <v-card>
          <v-container>
            <v-row align="center">
              <v-col cols="8"> ¿Cuál es la intensidad de tu rutina? </v-col>
              <v-col class="pa-0" cols="4">
                <v-rating
                  v-model="intensity"
                  color="red"
                  background-color="grey"
                  empty-icon="mdi-fire"
                  full-icon="mdi-fire"
                  length="5"
                  size="25"
                  dense
                ></v-rating>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" sm="4" md="6" class="pa-0">
        <RoutineStepper
          v-show="done == true"
          :steps="titles.length > 0 ? titles.length : 3"
          :cycles="cyclesToSend"
          :series="series"
          :titles="titles"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <div class="d-flex justify-center">
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                x-large
                color="primary"
                @click="alert = true"
                :disabled="!validate()"
              >
                Guardar rutina
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-alert
                type="info"
                icon="mdi-information-outline"
                class="ma-0"
                color="secondary"
                prominent
                border="left"
              >
                ¿Está seguro que desea guardar la rutina? Podrá modificarla
                posteriormente.
              </v-alert>
              <v-row class="ma-0">
                <v-col class="pa-0">
                  <v-btn
                    color="black"
                    class="white--text"
                    block
                    @click="dialog.value = false"
                  >
                    CANCELAR
                  </v-btn>
                </v-col>
                <v-col class="pa-0">
                  <v-btn
                    color="black"
                    class="white--text"
                    block
                    @click="method(), (dialog.value = false)"
                  >
                    CONFIRMAR
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.go-back-position {
  position: relative;
  top: 5px;
}

.titulazos {
  font-size: 80px;
  vertical-align: bottom;
}

.alertita {
  z-index: 1;
}
</style>

<script>
import { mapActions } from "vuex";
import GoBack from "../components/Buttons/GoBack";
import RoutineStepper from "../components/Cycle/RoutineStepper.vue";
import { Routine } from "../../api/routine";
import { Cycle } from "../../api/routine";
import { Category } from "../../api/category";
import { CycleExercise } from "../../api/cycleexercise";

export default {
  data() {
    return {
      resultText: "",
      alert: false,
      controller: null,
      done: true,
      edit: false,
      routineData: [], // TIPO ROUTINETEST
      cycles: [], // TIPO CYCLESTEST
      exercises: [], // TIPO EXCERCISES TEST
      series: [],
      titles: [],
      routineid: 0,

      cyclesToSend: [],
      routine: [], // ESTO SERIAN LOS CICLOS QUE LLEGAN AL CREAR

      name: "",
      desc: "",
      intensity: 0,
      result: null,
      selected: "",
      categories: [],
      allExercises: [],
      items: [],
      switch1: false,
      created: null,
    };
  },

  created() {
    this.edit = this.$route.params.edit;
    this.routineid = this.$route.params.routineid;

    if (!this.edit) {
      this.edit = false;
      this.resultText = "¡Su rutina ha sido creada!";
    }

    if (this.edit) {
      this.resultText = "¡Su rutina ha sido guardada!";
      this.done = false;
      this.loadAll();
    }
    this.getAllCategories();
    this.getAllExercises();
  },

  methods: {
    ...mapActions("category", {
      $getAllCategories: "getAll",
    }),

    ...mapActions("exercise", {
      $getAllExercises: "getAll",
    }),

    ...mapActions("routine", {
      $getRoutine: "getRoutine",
      $createRoutine: "create",
      $putRoutine: "modify",
      $createCycle: "createCycle",
      $putCycle: "modifyCycle",
      $deleteCycle: "deleteCycle",
      $getAllCycles: "getAllCycles",
    }),

    ...mapActions("cycleexercise", {
      $createCycleExercise: "create",
      $getAllCycleExercises: "getAll",
      $deleteExercise: "delete",
      $putExercise: "modify",
    }),

    async loadAll() {
      await this.getRoutine(this.routineid);
      this.name = this.routineData.name;
      this.desc = this.routineData.detail;
      this.intensity = this.reverseMapDifficulty(this.routineData.difficulty);
      this.selected = this.routineData.category.name;
      this.setupRoutine(this.cycles, this.exercises);
    },

    async getRoutine(id) {
      try {
        this.controller = new AbortController();
        const pickedRoutine = await this.$getRoutine(id);
        this.controller = null;
        this.routineData = pickedRoutine;
        await this.getRealCycles(id);
      } catch (e) {
        alert(e);
      }
    },

    async getRealCycles(routineid) {
      try {
        this.controller = new AbortController();
        const pickedCycles = await this.$getAllCycles(routineid);
        this.controller = null;
        this.cycles = pickedCycles.content;
        await this.getExercises(this.cycles);
      } catch (e) {
        alert(e);
      }
    },

    async getExercises(cycles) {
      try {
        for (let i = 0; i < cycles.length; i++) {
          this.controller = new AbortController();
          const req = { cycleid: cycles[i].id, size: cycles[i].metadata };
          const pickedExercises = await this.$getAllCycleExercises(req);
          this.controller = null;
          this.exercises.push(pickedExercises.content);
        }
      } catch (e) {
        alert(JSON.stringify(e));
      }
    },

    setupRoutine(cycles, exercises) {
      for (let i = 0; i < cycles.length; i++) {
        this.titles[i] = cycles[i].name;
        this.series[i] = cycles[i].repetitions.toString();
        const temp = [];
        for (let j = 0; j < exercises[i].length; j++) {
          temp.push({
            id: j,
            enabled1: exercises[i][j].repetitions > 0 ? true : false,
            enabled2: exercises[i][j].duration > 0 ? true : false,
            actual: exercises[i][j].exercise.name,
            reps:
              exercises[i][j].repetitions > 0
                ? exercises[i][j].repetitions.toString()
                : "",
            dur:
              exercises[i][j].duration > 0
                ? this.reverseGetDuration(exercises[i][j].duration.toString())
                : "00:00:00",
          });
        }
        this.cyclesToSend.push(temp);
      }
      this.done = true;
      this.$root.$emit("updateSteps", this.titles.length);
    },

    reverseGetDuration(seconds) {
      const ans = new Date(seconds * 1000).toISOString().substr(11, 8);
      return ans;
    },

    reverseMapDifficulty(text) {
      switch (text) {
        case "rookie":
          return 1;
        case "beginner":
          return 2;
        case "intermediate":
          return 3;
        case "advanced":
          return 4;
        case "expert":
          return 5;
      }
    },

    async getAllExercises() {
      try {
        this.controller = new AbortController();
        const pickedExercises = await this.$getAllExercises(this.controller);
        this.controller = null;
        this.setResult(pickedExercises);
        this.setExercises();
      } catch (e) {
        this.setResult(e);
      }
    },

    async getAllCategories() {
      try {
        this.controller = new AbortController();
        let pickedCategories = await this.$getAllCategories();
        this.controller = null;
        let left = pickedCategories.totalCount - 10;
        let page = 1;
        this.setResult(pickedCategories);
        this.setCategories();
        while (left > 0) {
          let filter = "?page=" + page;
          this.controller = new AbortController();
          pickedCategories = await this.$getAllCategories(filter);
          this.controller = null;
          left -= 10;
          page++;
          this.setResult(pickedCategories);
          this.setCategories();
        }
      } catch (e) {
        this.setResult(e);
      }
    },

    validate() {
      if (this.name && this.desc && this.selected && this.intensity != 0) {
        if (this.routine.length > 0) {
          return true;
        }
        return false;
      }
      return false;
    },

    setResult(result) {
      this.result = result;
    },

    setExercises() {
      for (let i = 0; i < this.result.content.length; i++) {
        this.allExercises.push(this.result.content[i]);
      }
    },

    setCategories() {
      for (let i = 0; i < this.result.content.length; i++) {
        this.categories.push({
          name: this.result.content[i].name,
          id: this.result.content[i].id,
        });
        this.items.push(this.result.content[i].name);
      }
    },

    getCycles(cycles, series, titles, finished, size) {
      if (!finished) {
        for (let i = 0; i < size; i++) {
          this.routine.push({
            title: titles[i],
            serie: series[i],
            cycle: cycles[i],
          });
        }
      }
    },

    method() {
      this.alert = false;
      if (this.edit) {
        this.edit = false;
        this.putRoutine();
      } else {
        this.createRoutine();
      }
    },

    needEditRoutine() {
      const data = this.routineData;
      if (
        data.name !== this.name ||
        data.detail !== this.desc ||
        data.difficulty !== this.mapDifficulty(this.intensity) ||
        data.category.name !== this.selected
      )
        return true;
      return false;
    },

    async putRoutine() {
      if (this.needEditRoutine()) {
        const cat = this.getId(this.selected);
        const category = new Category(cat.id, cat.name, cat.name);
        const routine = new Routine(
          null,
          this.name,
          this.desc,
          true,
          category,
          this.mapDifficulty(this.intensity)
        );
        const req = { routineid: this.routineid, routine: routine };
        try {
          this.created = await this.$putRoutine(req);
          await this.putCycles();
        } catch (e) {
          alert(e);
        }
      } else {
        try {
          await this.putCycles();
        } catch (e) {
          alert(e);
        }
      }
      this.$router.push({
        name: "Home",
        params: { saved: true },
      });
    },

    async createRoutine() {
      const obj = this.getId(this.selected);
      const category = new Category(obj.id, obj.name, obj.name);
      const routine = new Routine(
        null,
        this.name,
        this.desc,
        true,
        category,
        this.mapDifficulty(this.intensity)
      );
      try {
        this.created = await this.$createRoutine(routine);
        this.createCycles();
      } catch (e) {
        alert(e);
      }
      this.$router.push({
        name: "Home",
        params: { created: true },
      });
    },

    needEditCycle(cycle, idx) {
      const oldCycle = this.cycles[idx];
      if (
        oldCycle.name != cycle.name ||
        oldCycle.repetitions != cycle.repetitions ||
        oldCycle.metadata != cycle.amount
      )
        return true;
      return false;
    },

    async putCycles() {
      const newCycles = this.routine.length;
      const oldCycles = this.cycles.length;
      let limit = oldCycles - newCycles;
      const sub = limit < 0 ? -limit : 0;
      let now = 0;
      let createdCycle = null;
      for (; now < newCycles - sub; now++) {
        if (
          this.needEditCycle(
            {
              name: this.routine[now].title,
              repetitions: this.routine[now].serie,
              amount: this.routine[now].cycle.length,
            },
            now
          )
        ) {
          const cycle = new Cycle(
            null,
            this.routine[now].title,
            "",
            this.getType(now),
            now + 1,
            parseInt(this.routine[now].serie, 10),
            this.routine[now].cycle.length
          );
          try {
            const req = {
              routineid: this.routineid,
              cycle: { id: this.cycles[now].id, cycle: cycle },
            };
            createdCycle = await this.$putCycle(req);
            await this.putExercises(createdCycle.id, now);
          } catch (e) {
            alert(e);
          }
        } else {
          try {
            await this.putExercises(this.cycles[now].id, now);
          } catch (e) {
            alert(e);
          }
        }
      }
      if (limit > 0) {
        for (; limit > 0; limit--) {
          try {
            const req = {
              routineid: this.routineid,
              cycleid: this.cycles[now].id,
            };
            await this.$deleteCycle(req);
            now++;
          } catch (e) {
            alert(e);
          }
        }
      } else {
        limit *= -1;
        for (; limit > 0; limit--) {
          const cycle = new Cycle(
            null,
            this.routine[now].title,
            "",
            this.getType(now),
            now + 1,
            parseInt(this.routine[now].serie, 10),
            this.routine[now].cycle.length
          );
          try {
            const req = { cycle: cycle, id: this.routineid };
            const createdCycle = await this.$createCycle(req);
            await this.createExcercises(createdCycle.id, now);
          } catch (e) {
            alert(e);
          }
          now++;
        }
      }
    },

    async notSameExercise(cycleid, cycleidx, idx, exid, available) {
      const otherex = this.exercises[cycleidx][idx];
      if (otherex.exercise.id != exid) {
        if (!available.includes(idx)) {
          try {
            await this.$deleteExercise({
              cycleid: cycleid,
              exerciseid: otherex.exercise.id,
            });
          } catch (e) {
            alert(e);
          }
          return true;
        }
        return true;
      }
      return false;
    },

    needEditExercise(cycleidx, idx, exid) {
      for (let i = idx; i < this.exercises[cycleidx].length; i++) {
        if (this.exercises[cycleidx][i].exercise.id == exid) {
          return i;
        }
      }
      return -1;
    },

    async putExercises(cycleid, index) {
      let put = [];
      let available = [];
      const actualCycle = this.routine[index].cycle;
      const actualLen = actualCycle.length;
      const oldLen = this.exercises[index].length;
      let limit = oldLen - actualLen;
      const sub = limit < 0 ? -limit : 0;
      let now = 0;
      for (; now < actualLen - sub; now++) {
        const exid = this.getExercise(actualCycle[now].actual);
        const reqs = {
          order: now + 1,
          duration: actualCycle[now].enabled2
            ? this.getDuration(actualCycle[now].dur)
            : 0,
          repetitions: actualCycle[now].enabled1
            ? parseInt(actualCycle[now].reps, 10)
            : 0,
        };
        const req = new CycleExercise(null, cycleid, exid, reqs);
        try {
          if (
            await this.notSameExercise(cycleid, index, now, exid, available)
          ) {
            let ans = this.needEditExercise(index, now + 1, exid);
            if (ans > 0) {
              available.push(ans);
              put.push(exid);
              await this.$putExercise(req);
            } else {
              await this.$createCycleExercise(req); // NO ESTA EN LA LISTA VIEJA, PUSH Y AL PINGO
            }
          } else {
            if (
              this.exercises[index][now].duration != req.reqs.duration ||
              this.exercises[index][now].repetitions != req.reqs.repetitions
            ) {
              // VER SI HAY Q HACER PUT O DEJARLO
              try {
                await this.$putExercise(req);
              } catch (e) {
                alert(e);
              }
            }
          }
        } catch (e) {
          alert(e);
        }
      }
      if (limit > 0) {
        for (; now < oldLen; now++) {
          const exid = this.exercises[index][now].exercise.id;
          if (!put.includes(exid)) {
            try {
              await this.$deleteExercise({
                cycleid: cycleid,
                exerciseid: exid,
              });
            } catch (e) {
              alert(e);
            }
          }
        }
      } else {
        limit *= -1;
        for (; now < actualLen; now++) {
          const exid = this.getExercise(actualCycle[now].actual);
          const reqs = {
            order: now + 1,
            duration: actualCycle[now].enabled2
              ? this.getDuration(actualCycle[now].dur)
              : 0,
            repetitions: actualCycle[now].enabled1
              ? parseInt(actualCycle[now].reps, 10)
              : 0,
          };
          const req = new CycleExercise(null, cycleid, exid, reqs);
          try {
            await this.$createCycleExercise(req);
          } catch (e) {
            alert(e);
          }
        }
      }
    },

    async createCycles() {
      const id = this.created.id;
      for (let i = 0; i < this.routine.length; i++) {
        const cycle = new Cycle(
          null,
          this.routine[i].title,
          "",
          this.getType(i),
          i + 1,
          parseInt(this.routine[i].serie, 10),
          this.routine[i].cycle.length
        );
        try {
          const req = { cycle: cycle, id: id };
          const createdCycle = await this.$createCycle(req);
          this.createExcercises(createdCycle.id, i);
        } catch (e) {
          alert(e);
        }
      }
    },

    async createExcercises(id, index) {
      for (let i = 0; i < this.routine[index].cycle.length; i++) {
        let exid = this.getExercise(this.routine[index].cycle[i].actual);
        const reqs = {
          order: i + 1,
          duration: this.routine[index].cycle[i].enabled2
            ? this.getDuration(this.routine[index].cycle[i].dur)
            : 0,
          repetitions: this.routine[index].cycle[i].enabled1
            ? parseInt(this.routine[index].cycle[i].reps, 10)
            : 0,
        };
        const req = new CycleExercise(null, id, exid, reqs);
        try {
          await this.$createCycleExercise(req);
        } catch (e) {
          alert(e);
        }
      }
    },

    getDuration(text) {
      var a = text.split(":"); // split it at the colons
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      return seconds;
    },

    getExercise(name) {
      for (let i = 0; i < this.allExercises.length; i++) {
        if (this.allExercises[i].name === name) return this.allExercises[i].id;
      }
      return -1;
    },

    getType(cycle) {
      switch (cycle) {
        case 0:
          return "warmup";
        case this.routine.length - 1:
          return "cooldown";
        default:
          return "exercise";
      }
    },

    getId(name) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name === name)
          return { id: this.categories[i].id, name: this.categories[i].name };
      }
      return -1;
    },

    mapDifficulty(intensity) {
      switch (intensity) {
        case 1:
          return "rookie";
        case 2:
          return "beginner";
        case 3:
          return "intermediate";
        case 4:
          return "advanced";
        case 5:
          return "expert";
      }
    },
  },

  mounted() {
    this.$root.$once("getCycles", (cycles, series, titles, finished, size) => {
      this.getCycles(cycles, series, titles, finished, size);
    });
  },

  components: {
    RoutineStepper,
    GoBack,
  },
};
</script>
