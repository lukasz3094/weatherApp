import Axios from "axios";
const CITY_URL = "http://localhost:3501/data";
export default {
  state: {
    citiesData: [],
    watchedCities: [],
    citiesId: [],
  },
  getters: {
    citiesData: (state) => state.citiesData,
    citiesName: (state) => state.citiesData.map((c) => c.name).reverse(),
    watchedCities: (state) =>
      state.watchedCities.length < 11
        ? [...state.watchedCities, "Dodaj miasto"]
        : state.watchedCities,
    // list of cities that are not watched for adding cities functionality
    citiesWithoutWatched: (state, getters) =>
      getters.citiesName.filter((c) => !state.watchedCities.includes(c)),
    // city id with name
    citiesId: (state) => state.citiesId,
  },
  mutations: {
    setCitiesData(state, cities) {
      state.citiesData = cities;
    },
    setWatchedCities(state, watchedCities) {
      watchedCities === "Dodaj miasto"
        ? state.watchedCities.push(watchedCities)
        : (state.watchedCities = watchedCities);
    },
    // adding new added city name to start of array
    setCity(state, cityName) {
      state.watchedCities.unshift(cityName);
    },
    removeWatchedCity(state, cityName) {
      state.watchedCities = state.watchedCities.filter((c) => c !== cityName);
    },
    setCitiesId(state, nameWithId) {
      state.citiesId.push(nameWithId);
    },
  },
  actions: {
    async getCitiesData({ commit }) {
      let cityData = (await Axios.get(CITY_URL)).data;
      commit("setCitiesData", cityData);
    },
    addCity({ commit, dispatch }, cityName) {
      if (cityName) {
        commit("setCity", cityName);
        dispatch("setLocalStorageWatchedCities");
      }
    },
    getWatchedCitiesData({ commit }) {
      let watchedCities = localStorage.getItem("watchedCities");
      if (
        watchedCities !== "undefined" &&
        watchedCities !== "" &&
        watchedCities !== "null"
      )
        commit("setWatchedCities", JSON.parse(localStorage.watchedCities));
    },
    setLocalStorageWatchedCities({ state }) {
      localStorage.setItem(
        "watchedCities",
        JSON.stringify(state.watchedCities)
      );
    },
    initStorage() {
      if (localStorage.getItem("watchedCities") === "undefined")
        localStorage.setItem("watchedCities", "");
    },
    removeCity({ commit, dispatch }, cityName) {
      if (cityName) {
        commit("removeWatchedCity", cityName);
        dispatch("setLocalStorageWatchedCities");
      }
    },
    async getCitiesId({ commit, state }) {
      const cNames = Object.values(state.watchedCities);
      Array.prototype.forEach.call(cNames, (name) => {
        const id = state.citiesData.find((city) => city.name === name).id;
        commit("setCitiesId", id);
      });
    },
  },
};
