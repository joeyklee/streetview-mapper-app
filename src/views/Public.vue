<template>
  <div class="public-container">
    <PublicComponent />
  </div>
</template>

<script>
import PublicComponent from "@/components/PublicComponent";
export default {
  name: "Public",
  components: {
    PublicComponent
  }
};
</script>

<style lang="scss" scoped>
.Public-container {
  width: 100%;
  height: 100%;
}
</style>
