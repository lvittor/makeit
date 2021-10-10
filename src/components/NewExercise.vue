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
        Open Dialog
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
            ></v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              label="Descripción"
              auto-grow
              outlined
              rows="1"
              row-height="15"
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
          @click="dialog = false"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Media from '@dongido/vue-viaudio'
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
  }
}
</script>