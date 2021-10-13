<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <div>
          <v-card-title>
            <v-container>
              <v-row class="pa-0">
                <v-col>
                  <slot><h2 class="h6">{{ namep }}</h2></slot>
                </v-col>
              </v-row>
                <slot><textovich class="desc">{{ desc }}</textovich></slot>
            </v-container>
          </v-card-title>
        </div>
        <v-container >
          <v-row >
            <v-img
                :src="img"
            ></v-img>
          </v-row>
        </v-container>
        <v-fade-transition>
          <v-overlay v-show="hover" absolute color="#036358">
            <div class="pa-2" align="center"> <!-- @click="getEditableRoutine(/*id de la rutina*/1)" -->
              <v-btn>Editar</v-btn>
            </div>
            <!-- 

            <div class="pa-2" align="center" >
              <v-btn @click="showMessage()">Eliminar</v-btn>
            </div>

            -->

            <div class="pa-2 d-flex justify-center" align="center">
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    v-bind="attrs"
                    v-on="on"
                  >Eliminar</v-btn>
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
                    ¿Estás seguro desea eliminar el ejercicio?
                  </v-alert>
                  <v-row class="ma-0">
                    <v-col
                      class="pa-0"
                    >
                      <v-btn color="black" class="white--text" block @click="dialog.value = false">
                        CANCELAR
                      </v-btn>
                    </v-col>
                    <v-col
                      class="pa-0"
                    >
                      <v-btn color="black" class="white--text" block @click="removeExercise(id), dialog.value = false">
                        CONFIRMAR
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
              </v-dialog>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<style>

.desc{
  font-size: 20px
}

</style>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: {
      type: Number,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: require("@/assets/defaultImage.png"),
    },
    namep: {
      type: String,
    },
    desc: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    message: false,
  }),
  methods: {
    ...mapActions('exercise', {
      $removeExercise: 'delete',
    }),
    showMessage(){
      this.message = !this.message
    },
    async removeExercise(exerciseID){
      await this.$removeExercise({id: exerciseID});
      this.$root.$emit("exerciseDeleted");
    }
  }
};
</script>