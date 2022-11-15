import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";
import dataStore from "../store";
import LoginView from "../views/LoginView";
import WeatherForecastView from "../views/WeatherForecastView";
import CityWeatherInfoView from "../views/CityInfoView";
import CityAddView from "../views/CityAddView";
import CityShortView from "../views/CityShortView";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    beforeEnter(to, from, next) {
      if (dataStore.state.auth.authenticated) {
        next();
      } else {
        next("/login");
      }
    },
    children: [
      {
        path: "/weatherforecast",
        name: "weatherforecast",
        component: WeatherForecastView,
        children: [
          {
            path: "/cityshortview/:name",
            name: "cityshortview",
            component: CityShortView,
          },
          {
            path: "",
            name: "defaultcityshort",
            component: CityShortView,
          },
        ],
      },
      {
        path: "/cityweatherinfo/:id",
        name: "cityweatherinfo",
        component: CityWeatherInfoView,
      },
      {
        path: "/cityadd",
        name: "cityadd",
        component: CityAddView,
      },
      {
        path: "",
        name: "defaultcitiesinfo",
        component: WeatherForecastView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter(to, from, next) {
      if (dataStore.state.auth.authenticated) {
        next("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
