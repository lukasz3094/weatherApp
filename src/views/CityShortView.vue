<template>
  <div class="bg-opacity-25 bg-white container mt-3 p-4 rounded">
    <div class="row">
      <div class="col-0 col-sm-1"></div>
      <div class="col-12 col-sm-10">
        <span class="h2">
          <b>{{ cityName }}</b>
        </span>
        <img :src="weatherFilteredData.icon" style="transform: scale(1.5)" />
      </div>
      <div class="col-0 col-sm-1"></div>
    </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <router-link
          :to="{ name: 'cityweatherinfo', params: { id: cityId.id } }"
          class="h5 text-decoration-none text-primary"
        >
          Więcej
        </router-link>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="mt-4 row">
      <div class="col-6">
        <h4>
          Temperatura
          <font-awesome-icon class="text-danger" icon="fa-temperature-half" />
        </h4>
        <span class="h4">
          <b> {{ weatherFilteredData.temp }} <sup>o</sup>C</b>
        </span>
      </div>
      <div class="col-6">
        <h4>
          Wilgotność
          <font-awesome-icon class="text-primary" icon="fa-droplet" />
        </h4>
        <span class="h4">
          <b>{{ weatherFilteredData.humidity }} %</b>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      citiesWeatherData: "citiesWeatherData",
      citiesNamesIds: "allCitiesNamesIds",
    }),
    cityName() {
      return this.$route.params.name;
    },
    cityId() {
      return this.citiesNamesIds.find((c) => c.name === this.cityName);
    },
    weatherFilteredData() {
      return this.citiesWeatherData
        .map((c) => {
          return {
            id: c.id,
            temp: c.main.temp,
            humidity: c.main.humidity,
            icon: `http://openweathermap.org/img/w/${c.weather[0].icon}.png`,
          };
        })
        .find((e) => e.id === this.cityId.id);
    },
  },
};
</script>
