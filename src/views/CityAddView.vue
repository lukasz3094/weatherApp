<template>
  <router-link class="btn" to="/home">
    <font-awesome-icon icon="fa-arrow-left text-decoration-none" />
    Powrót
  </router-link>
  <div class="p-2 row">
    <div class="col input-group mb-3">
      <span class="input-group-text">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </span>
      <input
        class="form-control"
        placeholder="Wpisz miasto..."
        v-model="citySearch"
      />
    </div>
    <hr />
  </div>
  <div class="container-fluid">
    <div class="frame overflow-auto" style="max-height: 55vh">
      <div v-for="(city, index) in filteredCities" :key="index">
        <span class="m-2 row">
          <div class="col-6 col-md-4">
            <h4>{{ city }}</h4>
          </div>
          <div class="col-6 col-md-4">
            <button
              v-if="watchedCities.length < 11"
              @click="addCityToWatched(city)"
              class="btn btn-primary mb-2"
            >
              Dodaj
            </button>
            <span v-else>Max</span>
          </div>
          <hr />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      citySearch: "",
    };
  },
  computed: {
    ...mapGetters({
      allCitiesNames: "allCitiesNames",
      watchedCities: "watchedCities",
    }),
    allCitiesWithoutWatched() {
      return this.allCitiesNames
        .filter((c) => !this.watchedCities.includes(c))
        .reverse();
    },
    filteredCities() {
      return this.allCitiesWithoutWatched.filter((p) =>
        p.toLowerCase().includes(this.citySearch.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions({
      updateStorage: "updateStorage",
      addCityToWatched: "addCityToWatched",
    }),
  },
};
</script>
<style scoped>
.frame {
  overflow-x: scroll;
}
.frame::-webkit-scrollbar {
  -webkit-appearance: none;
  appearance: none;
}
.frame::-webkit-scrollbar:vertical {
  width: 11px;
}
.frame::-webkit-scrollbar:horizontal {
  height: 11px;
}
.frame::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 2px solid rgb(222, 222, 222);
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
