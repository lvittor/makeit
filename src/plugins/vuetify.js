import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
import es from "../locale/es";

Vue.use(Vuetify);

Vue.component("signin", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "es";
    },
  },
});

export default new Vuetify({
  lang: {
    locales: { es },
    current: "es",
  },
  theme: {
    themes: {
      light: {
        primary: colors.deepPurple,
        secondary: colors.cyan,
        accent: colors.green,
        error: colors.red.accent3,
      },
    },
  },
});
