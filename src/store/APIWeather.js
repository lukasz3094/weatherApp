import Axios from "axios";
const API_KEY = "18cfc7effe21da12cbecd55f5053074d";
const SERVER_URL = "http://localhost:3500";
export default {
  state: {
    citiesWeatherData: [],
    cityWeatherInfo: "",
  },
  getters: {
    citiesWeatherData: (state) => state.citiesWeatherData,
    cityWeatherInfo: (state) => state.cityWeatherInfo,
  },
  mutations: {
    setWeatherData(state, data) {
      state.citiesWeatherData = data;
    },
    setCityWeatherInfo(state, data) {
      state.cityWeatherInfo = data;
    },
  },
  actions: {
    // get data with cities IDs from API
    async loadWeatherDataById({ commit, dispatch }, ids) {
      const ID = JSON.stringify(ids).replace(/['[\]']+/g, "");
      const API_URL = `https://api.openweathermap.org/data/2.5/group?id=${ID}&appid=${API_KEY}&units=metric`;
      let data = (await Axios.get(API_URL)).data.list;
      commit("setWeatherData", data);
      dispatch("updateServerData", data);
    },
    async loadCityInfo({ commit }, cityId) {
      const response = await Axios.get(`${SERVER_URL}/${cityId}`);
      commit("setCityWeatherInfo", response);
    },
  },
};
