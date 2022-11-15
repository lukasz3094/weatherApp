<template>
  <form>
    <div class="mb-3 row">
      <label class="col-4 col-form-label">Username</label>
      <div class="col-12 col-sm-8">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="v$.username.$model"
        />
      </div>
    </div>
    <div class="mb-5 row">
      <label class="col-4 col-form-label">Password</label>
      <div class="col-12 col-sm-8">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="v$.password.$model"
        />
      </div>
    </div>
    <div class="mb-2 row">
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary px-4"
          @click.prevent="handleAuth"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { required } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import { reactive, computed } from "@vue/reactivity";
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      showFailureMessage: false,
    };
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        username: { required },
        password: { required },
      };
    });

    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  computed: {
    ...mapState({ authenticated: (state) => state.auth.authenticated }),
  },
  methods: {
    ...mapActions(["authenticate"]),
    async handleAuth() {
      const router = this.$router;
      this.v$.$touch();
      if (!this.v$.$invalid) {
        await this.authenticate({
          username: this.state.username,
          password: this.state.password,
        });
      }
      if (this.authenticated) {
        router.push("home");
      } else {
        this.showFailureMessage = true;
      }
    },
  },
};
</script>
