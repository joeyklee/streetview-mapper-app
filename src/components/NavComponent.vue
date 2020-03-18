<template>
  <div id="nav">
    <div class="nav__list">
      <router-link class="nav__item nav__logo" to="/"
        >Streetview Mapper</router-link
      >
    </div>
    <div class="nav__list">
      <router-link
        v-if="credentials === null || credentials === undefined"
        class="nav__item nav__link"
        to="/login"
        >login</router-link
      >
      <p v-else class="nav__item nav__link" to="/login">
        Hi, {{ credentials }}! |
        <button class="logout-btn" @click.prevent="handleLogout">logout</button>
      </p>
      <!-- <router-link class="nav__item nav__link" to="/dashboard">Dashboard</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  computed: {
    credentials() {
      return this.$store.state.username;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("handleLogout");
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  // box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  background-color: #f4f4f4;
  justify-content: space-between;

  .nav__list {
    align-items: baseline;
    padding: 0.5rem;

    .nav__item:not(:last-child) {
      margin-right: 0.5rem;
    }

    .nav__logo {
      font-size: 2rem;
      font-weight: 900;
    }
  }
}

.logout-btn {
  outline: none;
  border: none;
  font-size: 1rem;
  background: none;
}
</style>
