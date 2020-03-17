<template>
  <div class="home">
    <HelloWorld msg="Streetview Mapper" />
    <div class="map">
      <StreetViewComponent />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import StreetViewComponent from "@/components/StreetViewComponent.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    StreetViewComponent
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: 500px;
  width: 500px;
}
</style>
