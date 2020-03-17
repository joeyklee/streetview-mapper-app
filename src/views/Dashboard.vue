<template>
  <div class="dashboard-container">
    <DashboardComponent />
  </div>
</template>

<script>
import DashboardComponent from "@/components/DashboardComponent";
export default {
  name: "Dashboard",
  components: {
    DashboardComponent
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
}
</style>
