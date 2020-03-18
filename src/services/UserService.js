import axios from "axios";
axios.defaults.withCredentials = true;

const url = "/api/v1/users";

class UserService {
  /**
   * signup
   * @param {*} credentials
   */
  static async signup(credentials) {
    try {
      const result = await axios.post(`${url}/signup`, credentials);
      const data = result.data;
      return data;
    } catch (error) {
      alert(error);
    }
  }

  /**
   * login
   * @param {*} credentials
   */
  static async login(credentials) {
    try {
      const result = await axios.post(`${url}/login`, credentials);
      const data = result.data;
      alert("login successful");
      return data;
    } catch (error) {
      alert(error);
    }
  }

  /**
   * logout
   */
  static async logout() {
    try {
      const result = await axios.post(`${url}/me/logoutall`);
      const data = result.data;
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * check loggedin
   */
  static async checkAuth() {
    try {
      const result = await axios.get(`${url}/me`);
      const data = result.data;
      if (!data.error) {
        return data;
      } else {
        throw new Error("Log in to get started");
      }
    } catch (error) {
      alert("Log in to get Started");
      return error;
    }
  }
}

export default UserService;