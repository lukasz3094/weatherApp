<template>
  <div class="flex-row flex-nowrap frame mx-2 row">
    <div
      class="bg-light bg-opacity-50 btn card col-6 col-md-3 me-2 px-3 py-4"
      v-for="city in watchedCities"
      :key="city"
      @click="changeVisibility()"
    >
      <div v-if="city === 'Dodaj miasto'">
        <router-link
          class="text-decoration-none text-dark"
          :to="{ name: 'cityadd' }"
        >
          <font-awesome-icon class="mt-4" icon="fa-plus" size="xl" />
          <h5 class="mt-2">{{ city }}</h5>
        </router-link>
      </div>
      <router-link
        :to="{
          name: 'cityshortview',
          params: { name: city },
        }"
        v-else
        class="text-decoration-none text-dark"
      >
        <h6 class="m-2 text-center">{{ city }}</h6>
        <button
          @click="removeCityFromWatched(city)"
          class="btn mt-5 p-1 row"
          style="color: rgba(255, 80, 80)"
        >
          Usuń
        </button>
      </router-link>
    </div>
  </div>
  <div v-if="visibility" class="h3 mt-5">
    Kliknij w kafelek wybierając miasto, dla którego chcesz wyświetlić pogodę
  </div>
  <router-view v-else></router-view>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      citySearch: "",
      visibility: true,
    };
  },
  computed: {
    ...mapGetters({
      citiesNamesIds: "allCitiesNamesIds",
      watchedCities: "watchedCities",
    }),
    watchedCitiesId() {
      return this.citiesNamesIds
        .filter((c) => this.watchedCities.includes(c.name))
        .map((e) => e.id);
    },
  },
  methods: {
    ...mapActions({
      loadCitiesData: "loadCitiesData",
      loadStorageAndUpdateState: "loadStorageAndUpdateState",
      removeCityFromWatched: "removeCityFromWatched",
      loadWeatherDataById: "loadWeatherDataById",
    }),
    changeVisibility() {
      this.visibility = false;
    },
  },
  async created() {
    await this.loadCitiesData();
    await this.loadStorageAndUpdateState();
    await this.loadWeatherDataById(this.watchedCitiesId).then(() => {
      setInterval(
        async () => await this.loadWeatherDataById(this.watchedCitiesId),
        60000
      );
    });
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
