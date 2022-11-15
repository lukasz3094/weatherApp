<template>
  <div class="align-items-center d-flex h-100 justify-content-center">
    <div class="container pt-2">
      <div class="row">
        <div class="col-xl-4 col-lg-3 col-md-2 col-sm-0"></div>
        <div
          class="bg-light bg-opacity-75 col-xl-4 col-lg-6 col-md-8 col-sm-12 p-5 rounded shadow"
        >
          <h1 class="mb-5">Login</h1>
          <LoginForm />
        </div>
        <div class="col-xl-4 col-lg-3 col-md-2 col-sm-0"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
};
</script>
