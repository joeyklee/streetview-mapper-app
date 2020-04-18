<template>
  <div class="reset-password">
    <div class="auth">
      <h2 class="auth__title">Reset Password</h2>
      <form v-if="token" @submit.prevent="handleResetSubmit" class="auth__form">
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
          <label class="auth__form-label">token</label>
          <input
            class="auth__form-input"
            v-model="token"
            type="token"
            name="token"
            id="token"
          />
        </section>
        <section class="auth__form-section">
          <label class="auth__form-label">new password</label>
          <input
            class="auth__form-input"
            v-model="newPassword"
            type="password"
            name="newPassword"
            id="newPassword"
          />
        </section>
        <section class="auth__form-section">
          <label class="auth__form-label">confirm new password</label>
          <input
            class="auth__form-input"
            v-model="verifyPassword"
            type="password"
            name="verifyPassword"
            id="verifyPassword"
          />
        </section>
        <section class="auth__form-section">
          <input
            class="auth__form-submit"
            type="submit"
            value="Submit Password Reset"
          />
        </section>
      </form>
      <form v-else @submit.prevent="handleForgotSubmit" class="auth__form">
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
          <input
            class="auth__form-submit"
            type="submit"
            value="Request Reset URL"
          />
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import Router from "../router";
import UserService from "@/services/UserService";
export default {
  name: "ResetPassword",
  data() {
    return {
      email: null,
      newPassword: null,
      verifyPassword: null,
      token: this.$route.query.token
    };
  },
  methods: {
    async handleForgotSubmit() {
      try {
        const credentials = {
          email: this.email
        };

        const result = await UserService.forgotPassword(credentials);

        if (result) {
          alert(result.message);
          return result;
        }
        throw new Error(
          "uh-oh! Password reset request went haywire! Please file an issue at: github.com/joeyklee/streetview-mapper-app/issues"
        );
      } catch (err) {
        alert(err);
      }
    },
    async handleResetSubmit() {
      try {
        const credentials = {
          newPassword: this.newPassword,
          verifyPassword: this.verifyPassword,
          email: this.email,
          token: this.token
        };

        const result = await UserService.resetPassword(credentials);

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
.reset-password {
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
    width: auto;
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
