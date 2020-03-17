<template>
  <footer class="footer">
    <section class="footer__section">
      <p class="footer__attribution">
        Data via
        <a
          href="https://developers.google.com/maps/documentation/javascript/tutorial"
          target="_blank"
          >Google Maps API</a
        >. Built during the 2020 covid-19 pandemic by
        <a href="https://jk-lee.com" target="blank">Joey Lee</a>.
      </p>
    </section>
    <section class="footer__section">
      <router-link class="nav__item nav__link" to="/dashboard"
        >Dashboard</router-link
      >
      <router-link class="nav__item nav__link" to="/about">About</router-link>
      <router-link class="nav__item nav__link" to="/login">Login</router-link>
    </section>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  background-color: #eee;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  box-shadow: 0px -1px -10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;

  .nav__item:not(:last-child) {
    margin-right: 0.5rem;
  }

  &__attribution {
    font-size: 0.8rem;
    font-weight: 300;
  }

  &__section {
  }
}
</style>
