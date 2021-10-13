<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Crear nuevo ejercicio
      </v-btn>
    </template>
    <v-card>

      <v-card-title class="text-h5">
        Nuevo ejercicio
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              label="Nombre del Ejercicio"
              outlined
              dense
              required
              class="mt-3"
              v-model="name"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              label="Descripción"
              auto-grow
              outlined
              rows="1"
              row-height="15"
              v-model="detail"
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
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="dark purple"
          text
          @click="creation()"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Media from '@dongido/vue-viaudio';
import {Exercise} from "../../api/exercise";
import { mapActions } from "vuex";

export default {
  name: "NewExercise",
  components: {
    Media,
  },
  data() {
    return {
      dialog: false,
      videoLoaded: false,
      srcVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
    }
  },
  props: {
    name: {
      type: String,
    },
    detail: {
      type: String,
    },
  },
  methods:{
    ...mapActions('exercise', {
    $createExerciseNasty: 'create',
    }),

    async creation(){
      if(this.name && this.detail){
        try {
          const ans = new Exercise(null, this.name, this.detail, "exercise");
          await this.createExerciseNasty(ans);
          this.dialog = false
          this.$root.$emit("exerciseCreated")
        } catch(e){
          alert("UPS")
        }
      } else {
        alert("no entendiste nada pa")
      }
    },
    /* async creation(){
      let val = this.validate()
      switch(val){
        case 0:
          alert("ejercicio ya existente. Cambie el título")
          break
        case 1:
          alert("ejercicio creado con exito")
          this.dialog = false
          break
        case -1:
          alert("Completa todos los campos")
          break
      }
    }, */
    /* async validate(){
      if(this.detail && this.name){
        const exerciseTest = new Exercise(null, this.name, this.detail, "exercise");
        alert('Ejercicio de prueba ' + JSON.stringify(exerciseTest));
        const answer = await this.$getExerciseNasty(exerciseTest);
        alert('Answer ' + JSON.stringify(answer));
        if(answer.description == "Data constraint"){
          return 0
        }
        if(this.name != answer.name){
          await this.$createExerciseNasty(exerciseTest)
          return 1;
        }
      }
      return -1;
    }, */

    async createExerciseNasty(ex){
      try{
        await this.$createExerciseNasty(ex);
        //this.userExercises.push(exercise);
        //alert("Creado... " + JSON.stringify(this.userExercises))
      } catch(e){
        alert("ERROR createExerciseNasty");
        this.setResult(e)
      }
    },
  },
  mounted:{

  },
}
</script>