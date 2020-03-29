import Vue from "vue";
import Vuex from "vuex";
const FileSaver = require("file-saver");
import LocationService from "@/services/LocationService";
import UserService from "@/services/UserService";
import { Loader } from "google-maps";
import Router from "../router";
// const APIKEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

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
      links: null,
      snapshot_description: null,
      snapshot_tags: null
    },
    gmap: null,
    panorama: null,
    searchService: null,
    googlemaps_apikey: null,
    username: null,
    user_id: null,
    authd: false
  },
  mutations: {
    setAuthd(state, bool) {
      state.authd = bool;
    },
    setUserDetails(state, data) {
      state.googlemaps_apikey = data.googlemaps_apikey;
      state.username = data.username;
      state.user_id = data.user_id;
    },
    setLocations(state, data) {
      const userSnapshots = data.filter(
        item => item.createdBy_username === state.username
      );
      state.locations = userSnapshots;
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
    initMap(state, data) {
      state.gmap = data.gmap;
      state.panorama = data.panorama;
      state.searchService = data.searchService;
    },
    setCurrentLocation(state, data) {
      state.currentLocation = { ...state.currentLocation, ...data };
    }
  },
  actions: {
    setUserDetails(context, data) {
      context.commit("setUserDetails", data);
    },
    async handleLogout(context) {
      const logout = await UserService.logout();
      if (logout.status === "success") {
        alert("logout successfull");
        context.commit("setUserDetails", {
          username: null,
          user_id: null,
          googlemaps_apikey: null
        });
        Router.push({
          path: "/login"
        });
        return;
      } else {
        alert("uh-oh, something went wrong at logout.");
      }
    },
    async getLocations(context) {
      const data = await LocationService.getLocations();
      context.commit("setLocations", data);
    },
    async createLocation({ commit, state }, _data) {
      const newLocation = {
        ...state.currentLocation,
        ..._data
      };
      const data = await LocationService.createLocation(newLocation);
      commit("createLocation", data);
    },
    async exportGeojson(context) {
      const data = await LocationService.getGeoJsonLocations();
      context.commit("exportGeojson", data);
    },
    async initMap({ commit, state }, { mapRef, panoRef }) {
      const options = { libraries: ["places"] };
      const loader = new Loader(state.googlemaps_apikey, options);
      const google = await loader.load();
      const jaystreet = { lat: 40.693361, lng: -73.98731 };

      // Gmap
      const gmap = new google.maps.Map(mapRef, {
        center: jaystreet,
        zoom: 14
      });

      // // Pano
      const panorama = new google.maps.StreetViewPanorama(panoRef, {
        position: jaystreet,
        pov: {
          heading: 34,
          pitch: 10
        }
      });

      const searchService = new google.maps.places.PlacesService(gmap);

      // attach gmap to streetview
      gmap.setStreetView(panorama);

      panorama.addListener("pano_changed", () => {
        // console.log("pano", panorama.getPano());
        const pano_id = panorama.getPano();
        commit("setCurrentLocation", { pano_id });
      });

      panorama.addListener("links_changed", () => {
        const links = panorama.getLinks();
        commit("setCurrentLocation", { links: [...links] });
        // console.log("links", this.panorama.getLinks());
      });

      panorama.addListener("position_changed", () => {
        const position = panorama.getPosition();
        const latitude = position.lat();
        const longitude = position.lng();
        commit("setCurrentLocation", { latitude, longitude });
        // console.log("position", this.latitude, this.longitude);
      });

      panorama.addListener("pov_changed", () => {
        const pov = panorama.getPov();
        const pov_pitch = pov.pitch;
        const pov_heading = pov.heading;
        commit("setCurrentLocation", { pov_pitch, pov_heading });
        // console.log("pov - pitch", this.pov_pitch);
        // console.log("heading", this.pov_heading);
      });

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            gmap.setCenter(pos);
            panorama.setPosition(pos);
          },
          function() {
            // handleLocationError(true, infoWindow, map.getCenter());
            console.log("location permitted");
          }
        );
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
        console.log("geolocation was not permitted");
      }

      commit("initMap", { gmap, panorama, searchService });
    },
    // eslint-disable-next-line prettier/prettier
    setMapLocation({ state }, _request) {
      const request = {
        query: _request,
        fields: ["name", "geometry"]
      };

      state.searchService.findPlaceFromQuery(request, results => {
        state.gmap.setCenter(results[0].geometry.location);
        state.panorama.setPosition(results[0].geometry.location);
      });
    }
  },
  modules: {}
});
