<template>
  <div class="d-flex justify-center">
    <v-dialog transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" x-large color="primary" fab>
          <v-icon>mdi-delete</v-icon>
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
          ¿Está seguro que desea eliminar la rutina?
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
              @click="deleteRoutine(routineID), (dialog.value = false)"
            >
              CONFIRMAR
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    routineID: {
      type: Number,
    },
  },
  methods: {
    ...mapActions("routine", {
      $delete: "delete",
    }),

    async deleteRoutine(routineID) {
      await this.$delete({ id: routineID });

      this.$root.$emit("update");
    },
  },
};
</script>
