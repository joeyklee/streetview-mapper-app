import Vue from "vue";
import Vuex from "vuex";
const FileSaver = require("file-saver");
import LocationService from "@/services/LocationService";
import { Loader } from "google-maps";

const APIKEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    currentLocation: {
      latitude: null,
      longitude: null,
      pov_heading: null,
      pov_pitch: null,
      pano_id: null,
      links: null
    },
    gmap: null,
    panorama: null
  },
  mutations: {
    setLocations(state, data) {
      state.locations = data;
    },
    createLocation(state, data) {
      state.locations = [...state.locations, data];
      alert("data successfully submitted!");
    },
    exportGeojson(state, data) {
      const filename = `streetview-mapper__${Math.round(
        new Date().getTime() / 1000
      )}.geojson`;
      const file = new File([JSON.stringify(data)], filename, {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(file);
    },
    initMap(state, _gmap, _panorama) {
      state.gmap = _gmap;
      state.panorama = _panorama;
    },
    setCurrentLocation(state, data) {
      state.currentLocation = { ...state.currentLocation, ...data };
    }
  },
  actions: {
    async getLocations(context) {
      const data = await LocationService.getLocations();
      context.commit("setLocations", data);
    },
    async createLocation({ commit, state }) {
      const data = await LocationService.createLocation(state.currentLocation);
      commit("createLocation", data);
    },
    async exportGeojson(context) {
      const data = await LocationService.getGeoJsonLocations();
      context.commit("exportGeojson", data);
    },
    async initMap(context, { mapRef, panoRef }) {
      const options = {};
      const loader = new Loader(APIKEY, options);
      const google = await loader.load();
      const fenway = { lat: 42.345573, lng: -71.098326 };

      // Gmap
      const gmap = new google.maps.Map(mapRef, {
        center: fenway,
        zoom: 14
      });

      // // Pano
      const panorama = new google.maps.StreetViewPanorama(panoRef, {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });

      // attach gmap to streetview
      gmap.setStreetView(panorama);

      panorama.addListener("pano_changed", () => {
        // console.log("pano", panorama.getPano());
        const pano_id = panorama.getPano();
        context.commit("setCurrentLocation", { pano_id });
      });

      panorama.addListener("links_changed", () => {
        const links = panorama.getLinks();
        context.commit("setCurrentLocation", { links: [...links] });
        // console.log("links", this.panorama.getLinks());
      });

      panorama.addListener("position_changed", () => {
        const position = panorama.getPosition();
        const latitude = position.lat();
        const longitude = position.lng();
        context.commit("setCurrentLocation", { latitude, longitude });
        // console.log("position", this.latitude, this.longitude);
      });

      panorama.addListener("pov_changed", () => {
        const pov = panorama.getPov();
        const pov_pitch = pov.pitch;
        const pov_heading = pov.heading;
        context.commit("setCurrentLocation", { pov_pitch, pov_heading });
        // console.log("pov - pitch", this.pov_pitch);
        // console.log("heading", this.pov_heading);
      });

      context.commit("initMap", gmap, panorama);
    }
  },
  modules: {}
});
