<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" class="pa-0 mt-1">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header
              expand-icon="mdi-filter"
              disable-icon-rotate
              class="pa-0 grey lighten-2"
            >
              <v-text-field
                label="Busca"
                solo
                @click.native.stop
                @input="setSearch($event)"
                @keyup.enter="pushFound()"
                hide-details="auto"
                class="mr-2 ml-4"
              />
            </v-expansion-panel-header>
            <v-expansion-panel-content class="grey lighten-2">
              <Filters />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Filters from "./Filters.vue";

export default {
  data() {
    return {
      search: "",
    };
  },

  components: {
    Filters,
  },

  methods: {
    setSearch(text) {
      this.search = text;
      this.$root.$emit("search", text);
    },

    pushFound() {
      this.$router.push({
        name: "Found",
        params: { value: this.search },
      });
    },
  },
};
</script>
