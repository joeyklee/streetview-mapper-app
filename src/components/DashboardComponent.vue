<template>
  <div class="dashboard">
    <main class="overview">
      <!-- list -->
      <section class="overview__list">
        <div class="overview__list-container">
          <h3 class="overview__list-title">Your Snapshots</h3>
          <ul class="overview__list-locations">
            <li
              :id="location._id"
              :ref="location._id"
              class="overview__list-locations__item"
              v-for="location in locations"
              :key="location._id"
            >
              <!-- Image Preview-->
              <div class="overview__list-locations__item-section">
                <legend class="overview__list-locations__item-label">
                  Image Preview
                </legend>
                <p class="overview__list-locations__item-content">
                  <img
                    v-bind:src="location.staticURL"
                    class="overview__list-locations__item-img"
                  />
                </p>
              </div>
              <!-- pan to-->
              <div class="overview__list-locations__item-section">
                <p class="overview__list-locations__item-content">
                  <button
                    class="overview__list-locations__item-button"
                    @click="panToLocation(location._id)"
                  >
                    Zoom to location
                  </button>
                </p>
              </div>
              <!-- lat/lng -->
              <div class="overview__list-locations__item-section">
                <legend class="overview__list-locations__item-label">
                  lat,lon:
                </legend>
                <p
                  class="overview__list-locations__item-content overview__list-locations__item-content--b"
                >
                  {{ Number(location.latitude.toFixed(5)) }},{{
                    Number(location.longitude.toFixed(5))
                  }}
                </p>
              </div>
              <!-- static URL -->
              <div class="overview__list-locations__item-section">
                <legend class="overview__list-locations__item-label">
                  static image url
                </legend>
                <p
                  class="overview__list-locations__item-content overview__list-locations__item-content--b"
                >
                  {{ location.staticURL }}
                </p>
              </div>
              <!-- tags -->
              <div
                v-if="
                  location.snapshot_tags && location.snapshot_tags.length > 0
                "
                class="overview__list-locations__item-section"
              >
                <legend class="overview__list-locations__item-label">
                  #tags
                </legend>
                <p
                  class="overview__list-locations__item-content overview__list-locations__item-content--b"
                >
                  {{ location.snapshot_tags }}
                </p>
              </div>
              <!-- description -->
              <div
                v-if="location.snapshot_description"
                class="overview__list-locations__item-section"
              >
                <legend class="overview__list-locations__item-label">
                  Description
                </legend>
                <p
                  class="overview__list-locations__item-content overview__list-locations__item-content--b"
                >
                  {{ location.snapshot_description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- list -->
      <div class="overview__map" id="gmap" ref="gmap"></div>
    </main>
    <!-- export button -->
    <button class="export-btn" @click.prevent="exportGeojson">
      Export All to GeoJSON
    </button>
  </div>
</template>

<script>
import { Loader } from "google-maps";
import UserService from "@/services/UserService";

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
      let locations = this.$store.state.locations;
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
      return locations;
    }
  },
  methods: {
    async createMap() {
      // Gmap
      const options = {};
      const loader = new Loader(this.$store.state.googlemaps_apikey, options);
      const google = await loader.load();
      const gmap = new google.maps.Map(this.$refs.gmap, {
        center: { lat: 40.6932965, lng: -73.9874731 },
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

      this.gmap = gmap;
    },
    createStaticUrl(_pano_id, _heading, _pitch) {
      const baseURL = `https://maps.googleapis.com/maps/api/streetview?size=640x640`;
      const pitch = `&pitch=${_pitch}`;
      const heading = `&heading=${_heading}`;
      const pano_id = `&pano=${_pano_id}`;
      const API_KEY = `&key=${this.$store.state.googlemaps_apikey}`;
      const staticURL = `${baseURL}${pitch}${heading}${pano_id}${API_KEY}`;
      return staticURL;
    },
    exportGeojson() {
      this.$store.dispatch("exportGeojson");
    },
    panToLocation(id) {
      console.log("clicked!", id);
      const selected = this.locations.find(
        item => String(item._id) === String(id)
      );
      this.gmap.setCenter({ lat: selected.latitude, lng: selected.longitude });
    }
  },
  async mounted() {
    const authData = await UserService.checkAuth();
    await this.$store.dispatch("setUserDetails", authData);
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
  grid-template-rows: 1fr 3rem;
}

.overview {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 3fr;

  &__list {
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    position: relative;

    &-title {
      margin-left: 0.5rem;
    }

    &-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-locations {
      height: 100%;
      padding: 1rem;
      list-style: none;
      overflow-y: scroll;

      &__item {
        padding: 0.5rem;
        border: 1px solid black;
        background-color: #eee;
        &:last-child {
          margin-bottom: 4rem;
        }

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
          font-size: 0.8rem;

          &--b {
            border: 1px solid #777777;
            padding: 0 0.5rem;
          }
        }

        &-img {
          width: 100%;
        }

        &-button {
          width: 100%;
          padding: 0.1rem 0;
        }

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  &__map {
    height: 100%;
    width: 100%;
    background-color: #eee;
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
  z-index: 1000;
}
</style>
