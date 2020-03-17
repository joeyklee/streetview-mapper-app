<template>
  <div id="StreetViewComponent">
    <div class="sidebar">
      <input
        class="sidebar__search"
        type="search"
        placeholder="🔎search for a location"
      />
      <div ref="gmap" id="MapView"></div>
      <div class="meta">
        <p>
          lat/lon: {{ currentLocation.latitude }},{{
            currentLocation.longitude
          }}
        </p>
        <p>heading: {{ currentLocation.pov_heading }}</p>
        <p>pitch: {{ currentLocation.pov_pitch }}</p>
      </div>
      <button class="submit-btn" @click.prevent="createLocation">
        Save to database
      </button>
    </div>
    <div ref="panorama" id="StreetView"></div>
  </div>
</template>

<script>
export default {
  name: "StreetViewComponent",
  computed: {
    currentLocation() {
      return this.$store.state.currentLocation;
    }
  },
  methods: {
    createLocation() {
      this.$store.dispatch("createLocation");
    }
  },
  async mounted() {
    await this.$store.dispatch("initMap", {
      mapRef: this.$refs.gmap,
      panoRef: this.$refs.panorama
    });
  }
};
</script>

<style lang="scss" scoped>
#StreetViewComponent {
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__search {
    height: 3rem;
    padding: 0 0 0 0.25rem;
  }

  #MapView {
    width: 100%;
    flex-basis: 50%;
    flex-grow: 2;
  }

  .meta {
    flex-basis: 50%;
    flex-grow: 1;
  }

  .submit-btn {
    width: 100%;
    height: 3rem;
    background-color: #ffd700;
    font-size: 1.6rem;
    font-weight: bold;
    border: 2px solid black;
    outline: none;
    align-self: flex-end;
  }
}

#StreetView {
  width: 100%;
  height: 100%;
}
</style>
