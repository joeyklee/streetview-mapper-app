<template>
  <div id="app">
    <NavComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import NavComponent from "@/components/NavComponent.vue";
// import UserService from "@/services/UserService";
export default {
  name: "App",
  components: { NavComponent, FooterComponent }
  // async mounted(){
  //   try{
  //     const authData = await UserService.checkAuth();
  //     this.$store.dispatch('setUserDetails', authData);
  //   }catch(err){
  //     alert(err);
  //   }
  // }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 16px;
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
  font-family: "Montserrat", sans-serif;
}

#app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4rem 1fr 4rem;
}

a,
a:link,
a:visited {
  color: black;
  text-decoration: none;
}
</style>
