<template>
  <div id="LocationList">
    <button @click.prevent="exportGeojson">Export All to GeoJSON</button>
    <ul class="locations">
      <li
        class="locations__item"
        v-for="location in locations"
        :key="location._id"
      >
        <p>lat/lng: {{ location.latitude }},{{ location.description }}</p>
        <p>lat/lng: {{ location.latitude }},{{ location.longitude }}</p>
        <p>
          {{
            createStaticUrl(
              location.pano_id,
              location.pov_heading,
              location.pov_pitch
            )
          }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LocationListComponent",
  computed: {
    locations() {
      return this.$store.state.locations;
    }
  },
  methods: {
    createStaticUrl(_pano_id, _heading, _pitch) {
      const baseURL = `https://maps.googleapis.com/maps/api/streetview?size=640x640`;
      const pitch = `&pitch=${_pitch}`;
      const heading = `&heading=${_heading}`;
      const pano_id = `&pano=${_pano_id}`;
      const API_KEY = `&key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`;
      const staticURL = `${baseURL}${pitch}${heading}${pano_id}${API_KEY}`;
      return staticURL;
    },
    exportGeojson() {
      this.$store.dispatch("exportGeojson");
    }
  },
  mounted() {
    this.$store.dispatch("getLocations");
  }
};
</script>

<style lang="scss" scoped>
.locations {
  &__item {
    padding: 0.5rem;
    border: 1px solid black;
  }
}
</style>
