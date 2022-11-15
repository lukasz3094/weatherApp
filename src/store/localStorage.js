export default {
  actions: {
    updateStorage(context, data) {
      localStorage.setItem("watchedCities", JSON.stringify(data));
    },
  },
};
