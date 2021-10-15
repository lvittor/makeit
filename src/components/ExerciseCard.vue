<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <div>
          <v-card-title>
            <v-container>
              <v-row class="pa-0">
                <v-col>
                  <slot><h2 class="primary--text h-6">{{ namep }}</h2></slot>
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
                max-height="15vh"
            ></v-img>
          </v-row>
        </v-container>
        <v-fade-transition>
          <v-overlay v-show="hover" z-index="0" absolute color="#036358">
            <div class="pa-2" align="center"> <!-- @click="getEditableRoutine(/*id de la rutina*/1)" -->
              <!-- <v-btn>Editar</v-btn> -->
              <v-dialog
                v-model="dialog"
                persistent
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs}">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="preserveStatus()">
                  Editar
                  </v-btn>
                </template>
                <v-card>

<!-- ------------------------------------------------------ -->
                  <v-card-title class="text-h5">
                    Editar ejercicio
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-text-field
                          label="Nombre"
                          outlined
                          dense
                          required
                          class="mt-3"
                          v-model="namep"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-textarea
                          label="Descripción"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="15"
                          v-model="desc"
                        ></v-textarea>
                      </v-row>
                      <v-row  justify="center">
            <!--            https://vuejsexamples.com/dynamically-reactively-render-videos-and-audios/-->
                        <div v-if="videoLoaded">
                          <Media
                            :kind="'video'"
                            :controls="true"
                            :src=srcVideo
                          >
                          </Media>
                        </div>
                        <div v-else >
                          <v-btn
                            depressed
                            color = "grey"
                            class = "white--text"
                            width="550px"
                            height="150px"
                          >
                            <v-container>
                              <v-row align="center"
                                    justify="center"
                              >
                                Añadir video
                              </v-row>
                            </v-container>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-container>

                  </v-card-text>


                  <v-card-actions>

                    <v-btn
                      color="dark purple"
                      text
                      @click="retrieveName();dialog = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <!--@click="creation()" -->
                    <v-btn
                      color="dark purple"
                      text
                      @click="saveExercise();dialog = false"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

<!-- ------------------------------------------------------ -->
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
                    ¿Está seguro que desea eliminar el ejercicio?
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
//import Exercise from "../../api/exercise.js"
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
      default: "https://media.gettyimages.com/vectors/jump-rope-weight-loss-flat-design-icon-vector-id1078232284?k=20&m=1078232284&s=612x612&w=0&h=LNqFRgHe_LJM4kQiq4xLBX0STGqZjNWBeOwRYjEH0Ps=",
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
    dialog: false,
    auxName: null,
    auxDesc: null,
  }),
  methods: {
    ...mapActions('exercise', {
      $removeExercise: 'delete',
      $saveExercise: 'modify',
    }),
    showMessage(){
      this.message = !this.message
    },
    preserveStatus(){
      this.auxName = this.namep
      this.auxDesc = this.desc
    },
    retrieveName(){
      this.namep = this.auxName 
      this.desc = this.auxDesc
    },
    async removeExercise(exerciseID){
      await this.$removeExercise(exerciseID);
      this.$root.$emit('exerciseDeleted');
    },
    async saveExercise(){
      try{
        const current = {id: this.id, name: this.namep, detail: this.desc, type:"exercise", metadata: null};
        //const current = await new Exercise(this.id, this.namep, this.desc, "exercise");
        const exercise = await this.$saveExercise(current);
        this.$root.$emit('updateExercise');
        this.dialog=false;
        return exercise;
      } catch (e){
        alert(e)
      }
    }
  }
};
</script>