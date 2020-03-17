<template>
  <div class="home">
    <StreetViewComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import StreetViewComponent from "@/components/StreetViewComponent.vue";

export default {
  name: "Home",
  components: {
    StreetViewComponent
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
