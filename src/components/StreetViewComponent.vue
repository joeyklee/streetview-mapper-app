<template>
  <div id="StreetViewComponent">
    <div id="MapView"></div>
    <div id="StreetView"></div>
    <button @click.prevent="createLocation">Save to database</button>
  </div>
</template>

<script>
import { Loader } from "google-maps";

const APIKEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

export default {
  name: "StreetViewComponent",
  data() {
    return {
      gmap: null,
      panorama: null,
      latitude: null,
      longitude: null,
      location_pano: null,
      pov_heading: null,
      pov_pitch: null,
      pano_id: null,
      links: null,
      copyright: null
    };
  },
  methods: {
    async initMap() {
      const options = {};
      const loader = new Loader(APIKEY, options);
      const google = await loader.load();
      const fenway = { lat: 42.345573, lng: -71.098326 };

      // Gmap
      const $map = document.getElementById("MapView");
      this.gmap = new google.maps.Map($map, {
        center: fenway,
        zoom: 14
      });

      // Pano
      const $pano = document.getElementById("StreetView");
      this.panorama = new google.maps.StreetViewPanorama($pano, {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });

      // attach gmap to streetview
      this.gmap.setStreetView(this.panorama);
      // attach event listeners
      this.attachMapEventListeners();
    },
    attachMapEventListeners() {
      // attach event listeners
      this.panorama.addListener("pano_changed", () => {
        console.log("pano", this.panorama.getPano());
        this.pano_id = this.panorama.getPano();
      });

      this.panorama.addListener("links_changed", () => {
        const links = this.panorama.getLinks();
        this.links = links;
        console.log("links", this.panorama.getLinks());
      });

      this.panorama.addListener("position_changed", () => {
        const position = this.panorama.getPosition();
        this.latitude = position.lat();
        this.longitude = position.lng();
        console.log("position", this.latitude, this.longitude);
      });

      this.panorama.addListener("pov_changed", () => {
        const pov = this.panorama.getPov();
        this.pov_pitch = pov.pitch;
        this.pov_heading = pov.heading;
        console.log("pov - pitch", this.pov_pitch);
        console.log("heading", this.pov_heading);
      });
    },
    createLocation() {
      const newLocation = {
        latitude: this.latitude,
        longitude: this.longitude,
        location_pano: this.location_pano,
        pov_heading: this.pov_heading,
        pov_pitch: this.pov_pitch,
        pano_id: this.pano_id,
        links: this.links
      };

      this.$store.dispatch("createLocation", newLocation);
    }
  },
  async mounted() {
    await this.initMap();
  }
};
</script>

<style lang="scss" scoped>
#StreetViewComponent {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

#MapView {
  width: 100%;
  height: 100%;
}

#StreetView {
  width: 100%;
  height: 100%;
}
</style>
