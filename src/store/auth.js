import Axios from "axios";
const loginUrl = "http://localhost:3500/login";
export default {
  state: {
    authenticated: false,
    jwt: "",
  },
  getters: {
    authenticatedAxios(state) {
      return Axios.create({
        headers: {
          Authorization: `Bearer<${state.jwt}>`,
        },
      });
    },
  },
  mutations: {
    setAuthenticated(state, header) {
      state.jwt = header;
      state.authenticated = true;
    },
    clearAuthentication(state) {
      state.authenticated = false;
      state.jwt = "";
    },
  },
  actions: {
    async authenticate(context, credentials) {
      let response = await Axios.post(loginUrl, credentials);
      if (response.data.success === true) {
        context.commit("setAuthenticated", response.data.token);
      }
    },
  },
};
