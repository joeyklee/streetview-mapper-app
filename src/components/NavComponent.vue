<template>
  <div id="nav">
    <div class="nav__list">
      <router-link class="nav__item nav__logo" to="/"
        >Streetview Mapper</router-link
      >
    </div>
    <div class="nav__list">
      <router-link class="nav__item nav__link" to="/login">Login</router-link>
      <!-- <router-link class="nav__item nav__link" to="/dashboard">Dashboard</router-link> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.5);
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
</style>
