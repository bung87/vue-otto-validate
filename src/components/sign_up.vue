<script>
const Vue =  require('vue');
const Validator = require( "@/directives/index.ts")

Vue.use(Validator.default, { className: "text-danger" });

exports.default = {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  updated() {
    Validator.showError({
            "email":["Email already been taken"]
    })
  }
};
</script>
<template>
  <form action="#">
    <fieldset disabled>
      <legend>Disabled fieldset</legend>
      <div>
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          v-validate:test.className1="{leftOffset:100,topOffset:8}"
          v-model="email"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-validate:test.className1.className2="{leftOffset:100,topOffset:8}"
          v-model="password"
        />
      </div>
      <div>
        <label for="password_confirmation">Password Confirmation:</label>
        <input
          type="password_confirmation"
          id="password_confirmation"
          v-validate:test="{leftOffset:100,topOffset:8}"
          v-model="password_confirmation"
        />
      </div>
    </fieldset>
  </form>
</template>
