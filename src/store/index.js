import Vue from "vue";
import Vuex from "vuex";
const FileSaver = require("file-saver");
import LocationService from "@/services/LocationService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: []
  },
  mutations: {
    setLocations(state, data) {
      state.locations = data;
    },
    createLocation(state, data) {
      state.locations = [...state.locations, data];
    },
    exportGeojson(state, data) {
      const filename = `streetview-mapper__${Math.round(
        new Date().getTime() / 1000
      )}.geojson`;
      const file = new File([JSON.stringify(data)], filename, {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(file);
    }
  },
  actions: {
    async getLocations(context) {
      const data = await LocationService.getLocations();
      context.commit("setLocations", data);
    },
    async createLocation(context, newLocation) {
      const data = await LocationService.createLocation(newLocation);
      context.commit("createLocation", data);
    },
    async exportGeojson(context) {
      const data = await LocationService.getGeoJsonLocations();
      context.commit("exportGeojson", data);
    }
  },
  modules: {}
});
