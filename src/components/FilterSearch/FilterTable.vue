<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="routines"
            :sort-by="sort"
            :sort-desc="desc"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.puntuacion="{ item }">
              <v-rating
                color="orange"
                background-color="grey"
                empty-icon="mdi-star-outline"
                half-icon="mdi-star-half-full"
                full-icon="mdi-star"
                half-increments
                length="5"
                size="15"
                dense
                readonly
                :value="item.puntuacion"
              ></v-rating>
            </template>

            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.intensidad="{ item }">
              <v-rating
                color="red"
                background-color="grey"
                empty-icon="mdi-fire"
                full-icon="mdi-fire"
                length="5"
                size="15"
                readonly
                dense
                :value="item.intensidad"
              ></v-rating>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchType: 0, 
      result: null,
      controller: null,
      sort: "fecha",
      desc: true,
      search: {
        type: String,
      },
      test: '',
      filterRating: 0,
      filterIntensity: 0,
      headers: [
        {
          text: "Rutina",
          align: "start",
          value: "name",
        },
        {
          text: "Creador",
          value: "creador",
          filterable: false,
        },
        {
          text: "Categoria",
          value: "categoria",
          filterable: false,
        },
        {
          text: "Intensidad",
          value: "intensidad",
        },
        {
          text: "Puntuacion",
          value: "puntuacion",
        },
        {
          text: "Fecha",
          value: "fecha",
          filterable: false,
        },
      ],
      routines: [],
      categories: [],
      users: [],
    };
  },

  created() {
    this.filterIntensity = this.$route.params.intensity
    this.filterRating = this.$route.params.rating
    this.search = this.$route.params.value
    this.sort = this.$route.params.sort
    this.desc = this.$route.params.desc
    this.searchType = this.$route.params.type
    this.getSearchType()
  },

  methods: {
    ...mapActions("routine", {
      $getFiltered: "getFiltered",
    }),

    ...mapActions("category", {
      $getAllCategories: "getAll",
      $getCatFiltered: "getFiltered"
    }),

    ...mapActions("user", {
      $getUsers: "get",
      $getUserRoutines: "getUserRoutines",
    }),

    getSearchType(){
      switch (this.searchType) {
        case 0: // POR RUTINA
          this.getFilteredRoutine()
          break;
        case 1: // POR USUARIO
          this.getFilteredUser()
          break;
        case 2: // POR CATEGORIA
          this.getFilteredCategory()
          break;
      }
    },

    setUpRefresh(rating, intensity, searchType, sort, desc, search){
      this.routines = []
      this.filterRating = rating
      this.filterIntensity = intensity
      this.searchType = searchType
      this.sort = sort
      this.desc = desc
      this.search = search
      this.getSearchType()
    },

    setRoutines(username) {
      for (let i = 0; i < this.result.content.length; i++) {
        const r = this.result.content[i];
        if (r.user != null) {
          username = r.user.name
        }
        this.routines.push({
          name: r.name,
          creador: username,
          categoria: r.category.name,
          intensidad: this.mapIntensity(r.difficulty),
          puntuacion: this.mapScore(r.score),
          fecha: new Date(r.date).toISOString().split("T")[0],
        });
      }
    },

    setUsers() {
      for (let i = 0; i < this.result.content.length; i++) {
        this.users.push({id: this.result.content[i].id, username: this.result.content[i].username})
      }
    },

    setCategories() {
      for (let i = 0; i < this.result.content.length; i++) {
        this.categories.push({id: this.result.content[i].id})
      }
    },

    reverseMapIntensity(intensity) {
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

    mapIntensity(intensity) {
      switch (intensity) {
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

    mapScore(score) {
      return score / 2;
    },

    setResult(result) {
      this.result = result;
    },

    setOrder(n) {
      switch (n) {
        case 0:
          this.sort = "fecha";
          this.desc = true;
          break;
        case 1:
          this.sort = "puntuacion";
          this.desc = true;
          break;
        case 2:
          this.sort = "intensidad";
          this.desc = true;
          break;
        case 3:
          this.sort = "categoria";
          this.desc = false;
          break;
      }
    },

    async getFilteredCategory() {
      let page = 0
      try {
        this.controller = new AbortController();
        let pickedCategories = await this.$getCatFiltered(this.search);
        this.controller = null;
        let left = pickedCategories.totalCount - 10;
        page++
        this.setResult(pickedCategories);
        this.setCategories();
        while (left > 0) {
          this.controller = new AbortController();
          pickedCategories = await this.$getCatFiltered(this.search + '&page=' + page);
          this.controller = null;
          this.setResult(pickedCategories);
          this.setCategories();
          left -= 10
          page++
        }
      } catch (e) {
        alert(e)
      }
      await this.getCategoryRoutines()
    },

    async getCategoryRoutines() {
      const categories = this.categories
      for (let i = 0; i < categories.length; i++) {
        let page = 0
        const pre = 'categoryId=' + categories[i].id
        const filters = pre.concat('&' + this.getCatFilters())
        try {
          this.controller = new AbortController()
          let pickedRoutines = await this.$getFiltered(filters)
          this.controller = null
          let left = pickedRoutines.totalCount - 10
          page++
          this.setResult(pickedRoutines)
          this.setRoutines()
          while (left > 0) {
            this.controller = new AbortController()
            const newFilters = filters.concat("&page=" + page)
            const pickedRoutines = await this.$getFiltered(newFilters)
            this.controller = null
            left =- 10
            page++
            this.setResult(pickedRoutines)
            this.setRoutines()
          }
        } catch(e) {
          alert(e)
        }
      }
      this.categories = []
    },

    async getFilteredRoutine() {
      let page = 0
      const filters = this.getFilters()
      try {
        this.controller = new AbortController();
        let pickedRoutines = await this.$getFiltered(filters);
        this.controller = null;
        let left = pickedRoutines.totalCount - 10;
        page++
        this.setResult(pickedRoutines);
        this.setRoutines();
        while (left > 0) {
          this.controller = new AbortController();
          pickedRoutines = await this.$getFiltered(filters === '' ? '':filters + '&' + 'page=' + page);
          this.controller = null;
          this.setResult(pickedRoutines);
          this.setRoutines();
          left -= 10
          page++
        }
      } catch (e) {
        alert(e)
      }
    },

    async getFilteredUser() {
      let page = 0
      let text = this.search
      try {
        this.controller = new AbortController()
        let pickedUsers = await this.$getUsers(text)
        this.controller = null
        let left = pickedUsers.totalCount - 10;
        page++
        this.setResult(pickedUsers);
        this.setUsers();
        while (left > 0) {
          this.controller = new AbortController()
          pickedUsers = await this.$getUsers(text + '&page=' + page)
          this.controller = null
          this.setResult(pickedUsers);
          this.setUsers();
          left -= 10
          page++
        }
      } catch (e) {
        alert(e)
      }
      await this.getUserRoutines()
    },

    async getUserRoutines() {
      const users = this.users
      for (let i = 0; i < users.length; i++) {
        let page = 0
        const filters = this.getUserFilters(users[i].username)
        let req = {id: users[i].id, filters: '?' + filters}
        try {
          this.controller = new AbortController()
          let pickedRoutines = await this.$getUserRoutines(req)
          this.controller = null
          let left = pickedRoutines.totalCount - 10
          page++
          this.setResult(pickedRoutines)
          this.setRoutines(users[i].username)
          while (left > 0) {
            this.controller = new AbortController()
            req.filters = '?' + filters + '&page=' + page
            pickedRoutines = await this.$getUserRoutines(req)
            this.controller = null
            left -= 10
            page++
            this.setResult(pickedRoutines)
            this.setRoutines(users[i].username)
          }
        } catch(e) {
          alert(e)
        }
      }
      this.users = []
    },

    getCatFilters() {
      let bool = false
      let ans = ''
      if (this.filterIntensity != 0) {
        ans = ans.concat('difficulty=' + this.reverseMapIntensity(this.filterIntensity))
        bool = true;
      }
      if (this.filterRating != 0) {
        ans = ans.concat(bool == true ? '&':'' + 'score=' + this.filterRating)
        bool = true
      }
      return ans
    },

    getUserFilters() {
      let ans = ''
      if (this.filterIntensity != 0) {
        ans = ans.concat('difficulty=' + this.reverseMapIntensity(this.filterIntensity))
      }
      return ans
    },

    getFilters(){
      let bool = false
      let ans = ''
      if (this.filterIntensity != 0) {
        ans = ans.concat('difficulty=' + this.reverseMapIntensity(this.filterIntensity))
        bool = true;
      }
      if (this.filterRating != 0) {
        ans = ans.concat(bool == true ? '&':'' + 'score=' + this.filterRating)
        bool = true
      }
      ans = ans.concat(bool == true ? '&':'' + "search=" + this.search)
      return ans
    },

    setRating(n) {
      this.filterRating = n;
    },

    setIntensity(n) {
      this.filterIntensity = n;
    },

    setSearch(text) {
      this.search = text;
    },

    setType(n) {
      this.searchType = n
    },
  },

  mounted() {
    this.$root.$on("getOrder", (n) => {
      this.setOrder(n);
    }),
    this.$root.$on("refresh", (rating, intensity, searchType, sort, desc, search) => {
      this.setUpRefresh(rating, intensity, searchType, sort, desc, search)
    })
  },
};
</script>
