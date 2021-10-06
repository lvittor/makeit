import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";

export default new Vuetify({
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
