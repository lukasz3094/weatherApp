<template>
  <h1 class="m-2">{{ cityName }}</h1>
  <div class="p-2 row">
    <div v-if="loaded" class="col-12 col-md-6">
      <TemperatureChart :values="chartTemperature" :keys="chartHours" />
    </div>
    <div class="col-12 col-md-6">
      <HumidityChart :values="chartHumidity" :keys="chartHours" />
    </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <router-link class="btn btn-lg h4 mt-3 text-primary" to="/">
          <font-awesome-icon icon="fa-arrow-left text-decoration-none" /> Powrót
        </router-link>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TemperatureChart from "@/components/TemperatureChart";
import HumidityChart from "@/components/HumidityChart";
export default {
  data: () => {
    return {
      loaded: false,
    };
  },
  components: {
    TemperatureChart,
    HumidityChart,
  },
  computed: {
    cityId() {
      return this.$route.params.id;
    },
    ...mapGetters({
      weatherInfo: "weatherInfo",
      allCitiesNamesIds: "allCitiesNamesIds",
    }),
    cityName() {
      return this.allCitiesNamesIds.find((e) => e.id === Number(this.cityId))
        .name;
    },
    actualHour() {
      return new Date().getHours();
    },
    sortedWeatherByHour() {
      return [...this.weatherInfo]
        .sort((a, b) => Number(a.hour) - Number(b.hour))
        .filter((e) => Number(e.hour) <= this.actualHour);
    },
    chartHours() {
      return this.sortedWeatherByHour.map((e) => `${e.hour} h`);
    },
    chartTemperature() {
      return this.sortedWeatherByHour.map((e) => e.temperature);
    },
    chartHumidity() {
      return this.sortedWeatherByHour.map((e) => e.humidity);
    },
  },
  methods: {
    ...mapActions({
      loadWeatherById: "loadWeatherById",
    }),
  },
  async created() {
    await this.loadWeatherById(this.cityId).then(() => {
      this.loaded = true;
    });
  },
};
</script>
