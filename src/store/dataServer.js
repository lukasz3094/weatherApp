import Axios from "axios";
const SERVER = "http://localhost:3500";
export default {
  state: {
    weatherInfo: "",
  },
  getters: {
    weatherInfo: (state) => state.weatherInfo,
  },
  mutations: {
    SET_WEATHER_INFO(state, data) {
      state.weatherInfo = data;
    },
  },
  actions: {
    async loadWeatherById({ commit }, id) {
      const response = (await Axios.get(`${SERVER}/${id}`)).data;
      commit("SET_WEATHER_INFO", response);
    },
    // Sprawdza czy istnieje juz wpis z obecna godzina
    // i na tej podstawie wybiera metode post lub put
    async loadCityData({ dispatch }, { id, weatherData }) {
      const response = (await Axios.get(`${SERVER}/${id}`)).data;
      const item = response.find((r) => r.hour === weatherData.hour);

      if (item != undefined)
        dispatch("putCall", {
          id: id,
          weatherData: weatherData,
          itemId: item.id,
        });
      else dispatch("postCall", { id: id, weatherData: weatherData });
    },
    async postCall(c, { id, weatherData }) {
      await Axios.post(`${SERVER}/${id}`, weatherData);
    },
    async putCall(c, { id, weatherData, itemId }) {
      await Axios.put(`${SERVER}/${id}/${itemId}`, weatherData);
    },
    async updateServerData({ dispatch }, data) {
      data = Array.from(data);
      const hour = String(new Date().getHours());

      Object.values(data).forEach(async (e) => {
        const id = e.id;
        const temperature = e.main.temp;
        const humidity = e.main.humidity;
        const avgTemperature = e.main.temp_max;
        const icon = e.weather[0].icon;
        const dataJSON = {
          temperature: temperature,
          humidity: humidity,
          avgTemperature: avgTemperature,
          icon: icon,
          hour: hour,
        };
        await dispatch("loadCityData", { id: id, weatherData: dataJSON });
      });
    },
  },
};
