import { createStore } from "vuex";
import AuthModule from "./auth";
import APIWeatherModule from "./APIWeather";
import APICitiesModule from "./APICities";
import localStorageModule from "./localStorage";
import userCityModule from "./userCity";
import dataServerModule from "./dataServer";

export default createStore({
  modules: {
    auth: AuthModule,
    APIWeather: APIWeatherModule,
    APICities: APICitiesModule,
    localStorage: localStorageModule,
    userCity: userCityModule,
    dataServer: dataServerModule,
  },
});
