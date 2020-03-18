import axios from "axios";
axios.defaults.withCredentials = true;

const url = "/api/v1/locations";

class LocationService {
  static async getLocations() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data;
    } catch (error) {
      alert(error);
    }
  }

  static async getGeoJsonLocations() {
    try {
      const res = await axios.get(url + "/geojson");
      const data = res.data;
      return data;
    } catch (error) {
      alert(error);
    }
  }

  static async createLocation(newLocation) {
    try {
      const res = await axios.post(url, newLocation);
      const data = res.data;
      return data;
    } catch (error) {
      alert(error);
    }
  }
}

export default LocationService;
