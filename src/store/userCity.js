export default {
  state: {
    watchedCities: [],
  },
  getters: {
    watchedCities: (state) => state.watchedCities,
  },
  mutations: {
    SET_WATCHED_CITIES(state, data) {
      state.watchedCities = data;
    },
    ADD_WATCHED_CITY(state, cityName) {
      state.watchedCities.unshift(cityName);
    },
    REMOVE_WATCHED_CITY(state, cityName) {
      state.watchedCities = state.watchedCities.filter(
        (c) => !c.includes(cityName)
      );
    },
  },
  actions: {
    loadStorageAndUpdateState({ commit }) {
      const storageData = JSON.parse(localStorage.getItem("watchedCities"));
      if (storageData) {
        commit("SET_WATCHED_CITIES", storageData);
      } else {
        commit("SET_WATCHED_CITIES", ["Dodaj miasto"]);
      }
    },
    addCityToWatched({ commit, dispatch, state }, cityName) {
      commit("ADD_WATCHED_CITY", cityName);
      const stateAsArray = Object.values(state.watchedCities);
      dispatch("updateStorage", stateAsArray);
    },
    removeCityFromWatched({ commit, dispatch, state }, cityName) {
      commit("REMOVE_WATCHED_CITY", cityName);
      const stateAsArray = Object.values(state.watchedCities);
      dispatch("updateStorage", stateAsArray);
    },
  },
};
