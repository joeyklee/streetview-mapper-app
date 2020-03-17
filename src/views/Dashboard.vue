<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <LocationListComponent />
  </div>
</template>

<script>
import LocationListComponent from "@/components/LocationListComponent";
export default {
  name: "Dashboard",
  components: {
    LocationListComponent
  }
};
</script>
