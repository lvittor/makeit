<template>
  <v-btn x-large  color="primary" fab @click="deleteRoutine(routineID)">
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: {
        routineID: {
            type: Number
        }
    },
    methods: {
        ...mapActions('routine', {
            $delete: 'delete'
        }),

        async deleteRoutine(routineID){
            alert("Estas seguro de borrar la rutina con id: " + routineID)
            await this.$delete({id: routineID});
            this.$root.$emit("update")
        }
    }
}

</script>