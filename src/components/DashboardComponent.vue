<template>
  <div class="dashboard">
    <!-- export button -->
    <button class="export-btn" @click.prevent="exportGeojson">
      Export All to GeoJSON
    </button>
    <main class="overview">
      <!-- list -->
      <section class="overview__list">
        <h3 class="overview__list-title">Your Snapshots</h3>
        <ul class="locations">
          <li
            :id="location._id"
            :ref="location._id"
            class="locations__item"
            v-for="location in locations"
            :key="location._id"
          >
            <div class="locations__item-section">
              <legend class="locations__item-label">lat,lon:</legend>
              <p class="locations__item-content">
                {{ Number(location.latitude.toFixed(5)) }},{{
                  Number(location.longitude.toFixed(5))
                }}
              </p>
            </div>

            <div class="locations__item-section">
              <legend class="locations__item-label">static image url</legend>
              <p class="locations__item-content">
                {{
                  createStaticUrl(
                    location.pano_id,
                    location.pov_heading,
                    location.pov_pitch
                  )
                }}
              </p>
            </div>
          </li>
        </ul>
      </section>
      <!-- list -->
      <div class="overview__map" id="gmap" ref="gmap"></div>
    </main>
  </div>
</template>

<script>
import { Loader } from "google-maps";
const APIKEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
export default {
  name: "LocationListComponent",
  data() {
    return {
      gmap: null,
      markers: []
    };
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    }
  },
  methods: {
    async createMap() {
      // Gmap
      const options = {};
      const loader = new Loader(APIKEY, options);
      const google = await loader.load();
      const gmap = new google.maps.Map(this.$refs.gmap, {
        center: { lat: 42.345573, lng: -71.098326 },
        zoom: 14
      });

      this.markers = this.locations.map(item => {
        const marker = new google.maps.Marker({
          position: { lat: item.latitude, lng: item.longitude },
          map: gmap,
          title: item._id
        });

        const infoWindowContent = `
          <img src="
          ${this.createStaticUrl(
            item.pano_id,
            item.pov_heading,
            item.pov_pitch
          )}" />
        `;

        const infowindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });

        marker.addListener("click", function() {
          infowindow.open(gmap, marker);
          const element = document.getElementById(marker.title);
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        });
        return marker;
      });
    },
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
    },
    goToMarker() {
      // const selected = this.markers.find(item => item.title === this.$refs[item.title][0].id);
      console.log(this.gmap);
      // this.gmap.setCenter(selected.getPosition());
    }
  },
  async mounted() {
    await this.$store.dispatch("getLocations");
    await this.createMap();
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 3rem 1fr;
}

.overview {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 3fr;

  &__list {
    border: 1px solid black;
    width: 100%;
    max-height: 80vh;

    &-title {
      margin-left: 0.5rem;
    }
  }

  &__map {
    border: 1px solid black;
    height: 100%;
    width: 100%;
    background-color: #eee;
  }
}

.locations {
  height: 100%;
  padding: 1rem;
  list-style: none;
  overflow-y: scroll;

  &__item {
    padding: 0.5rem;
    border: 1px solid black;
    background-color: #f4f4f4;

    &-section {
      width: 100%;
      height: auto;
      word-wrap: break-word;
    }

    &-section:not(:last-child) {
      margin-bottom: 0.6rem;
    }

    &-label {
      padding: 0 0.25rem;
      font-size: 0.7rem;
      font-weight: 300;
    }
    &-content {
      border-radius: 4px;
      border: 1px solid #777777;
      padding: 0 0.5rem;
      font-size: 0.8rem;
    }

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
}

.export-btn {
  height: 3rem;
  outline: none;
  border: 2px solid black;
  background-color: #19a974;
  color: #ffff00;
  padding: 0.5rem;
  font-weight: 400;
  font-size: 1.2rem;
}
</style>
