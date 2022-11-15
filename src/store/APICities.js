import Axios from "axios";
const CITY_URL = "http://localhost:3501/data";
export default {
  state: {
    allCities: [],
  },
  getters: {
    allCitiesRaw: (state) => state.allCities,
    allCitiesNamesIds: (state) =>
      state.allCities.map((city) => {
        return { name: city.name, id: city.id };
      }),
    allCitiesNames: (state) => state.allCities.map((city) => city.name),
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.allCities = cities.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
    },
  },
  actions: {
    async loadCitiesData({ commit }) {
      const cityData = (await Axios.get(CITY_URL)).data;
      commit("SET_CITIES", cityData);
    },
  },
};
