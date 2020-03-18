<template>
  <div class="login">
    <div class="auth">
      <section class="auth__notice">
        <p>
          Need an account? → <router-link to="/signup">Sign Up</router-link>
        </p>
      </section>
      <h2 class="auth__title">login</h2>
      <form @submit.prevent="handleSubmit" class="auth__form">
        <!-- <section class="auth__form-section">
        <label class="auth__form-label">username</label>
        <input class="auth__form-input" type="text" name="username" id="" />
      </section> -->
        <section class="auth__form-section">
          <label class="auth__form-label">email</label>
          <input
            class="auth__form-input"
            v-model="email"
            type="email"
            name="email"
            id="email"
          />
        </section>
        <section class="auth__form-section">
          <!-- <label class="auth__form-label">password | <router-link to="/reset_password">I forgot</router-link> </label> -->
          <label class="auth__form-label">password</label>
          <input
            class="auth__form-input"
            v-model="password"
            type="password"
            name="password"
            id="password"
          />
        </section>
        <section class="auth__form-section">
          <input class="auth__form-submit" type="submit" value="log in" />
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import Router from "../router";
import UserService from "@/services/UserService";
export default {
  name: "Login",
  data() {
    return {
      username: null,
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
          email: this.email
        };

        const result = await UserService.login(credentials);

        if (result) {
          this.$store.dispatch("setUserDetails", result);

          Router.push({
            path: "/"
          });

          return result;
        }
        throw new Error("uh-oh! Error with log in.");
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
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
