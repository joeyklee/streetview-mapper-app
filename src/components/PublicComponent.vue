<template>
  <div class="public">
    <ul class="public-snapshots">
      <li
        :id="location._id"
        :ref="location._id"
        class="public-snapshots__item"
        v-for="location in locations"
        :key="location._id"
      >
        <div class="public-snapshots__item-section">
          <p class="public-snapshots__item-content">
            <img
              v-bind:src="location.staticURL"
              class="public-snapshots__item-img"
            />
          </p>
        </div>
        <div class="public-snapshots__item-section">
          <legend class="public-snapshots__item-label">
            {{ location.latitude }}, {{ location.longitude }}
          </legend>
        </div>
        <!-- tags -->
        <div class="public-snapshots__item-section">
          <legend class="public-snapshots__item-label">
            via @{{ location.createdBy_username }}
          </legend>
        </div>
        <div
          v-if="location.snapshot_tags && location.snapshot_tags.length > 0"
          class="public-snapshots__item-section"
        >
          <legend class="public-snapshots__item-label">
            {{ location.snapshot_tags }}
          </legend>
        </div>
        <!-- description -->
        <div
          v-if="location.snapshot_description"
          class="public-snapshots__item-section"
        >
          <legend class="public-snapshots__item-label">
            Description
          </legend>
          <p class="public-snapshots__item-content">
            {{ location.snapshot_description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import LocationService from "@/services/LocationService.js";
export default {
  name: "PublicComponent",
  data() {
    return {
      locations: null
    };
  },
  methods: {
    createStaticUrl(_pano_id, _heading, _pitch) {
      const baseURL = `https://maps.googleapis.com/maps/api/streetview?size=640x640`;
      const pitch = `&pitch=${_pitch}`;
      const heading = `&heading=${_heading}`;
      const pano_id = `&pano=${_pano_id}`;
      const key =
        this.$store.state.googlemaps_apikey !== null
          ? this.$store.state.googlemaps_apikey
          : process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
      const API_KEY = `&key=${key}`;
      const staticURL = `${baseURL}${pitch}${heading}${pano_id}${API_KEY}`;
      return staticURL;
    }
  },
  async mounted() {
    let locations = await LocationService.getLocations();
    locations = locations.map(item => {
      return {
        ...item,
        staticURL: this.createStaticUrl(
          item.pano_id,
          item.pov_heading,
          item.pov_pitch
        )
      };
    });
    this.locations = locations;
  }
};
</script>

<style lang="scss" scoped>
.public {
  width: 100%;
  height: 100%;
  padding: 1rem;
}
.public-snapshots {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  list-style: none;

  &__item {
    width: 100%;

    &-section {
      width: 100%;
    }

    &-content {
      width: 100%;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    &-label {
      font-size: 0.6rem;
    }
    &-img {
      width: 100%;
    }
  }
}
</style>
