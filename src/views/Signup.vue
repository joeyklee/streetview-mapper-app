<template>
  <div class="signup">
    <div class="auth">
      <section class="auth__notice">
        <p>
          Already have an account? →
          <router-link to="/login">login</router-link>
        </p>
      </section>
      <h2 class="auth__title">sign up</h2>
      <form @submit.prevent="handleSubmit" class="auth__form">
        <section class="auth__form-section">
          <label class="auth__form-label"
            >Google maps API key - be sure to enable: 1) Google Maps JavaScript
            API, 2) Places API, and 3) Street View Static API</label
          >
          <input
            v-model="googlemaps_apikey"
            class="auth__form-input"
            type="text"
            name="apikey"
            id="apikey"
          />
        </section>
        <section class="auth__form-section">
          <label class="auth__form-label">username</label>
          <input
            v-model="username"
            class="auth__form-input"
            type="text"
            name="username"
            id="username"
          />
        </section>
        <section class="auth__form-section">
          <label class="auth__form-label">email</label>
          <input
            v-model="email"
            class="auth__form-input"
            type="email"
            name="email"
            id="email"
          />
        </section>
        <section class="auth__form-section">
          <label class="auth__form-label">password </label>
          <input
            v-model="password"
            class="auth__form-input"
            type="password"
            name="password"
            id="password"
          />
        </section>
        <section class="auth__form-section">
          <input class="auth__form-submit" type="submit" value="signup" />
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import Router from "../router";
import UserService from "@/services/UserService";

export default {
  name: "Signup",
  data() {
    return {
      username: null,
      googlemaps_apikey: null,
      password: null,
      email: null
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          googlemaps_apikey: this.googlemaps_apikey,
          email: this.email
        };

        const result = await UserService.signup(credentials);

        if (result) {
          Router.push({
            path: "/login"
          });
          this.$store.dispatch("setUserDetails", result);
          return result;
        }
        throw new Error("uh-oh! Error with sign up.");
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.signup {
  width: 100%;
  height: 100%;
}

.auth {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 360px;
  margin: 0 auto;

  &__title {
    text-align: left;
    width: 100%;
  }

  &__notice {
    text-align: left;
    width: 100%;
    margin-bottom: 1.6rem;
  }
}

.auth__form {
  max-width: 360px;
  width: 100%;
  // height:100%;

  &-section {
    height: auto;
  }
  &-section:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  &-input {
    width: 100%;
    height: 2rem;
    border: 2px solid black;
    border-radius: 4px;
    padding: 0 0 0 0.5rem;
  }

  &-submit {
    width: 4rem;
    height: 2rem;
    border: 2px solid black;
    border-radius: 4px;
  }
  &-label {
    font-size: 0.8rem;
    font-weight: 300;
  }
}
</style>
