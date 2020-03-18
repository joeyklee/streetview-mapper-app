<template>
  <div id="StreetViewComponent">
    <div class="sidebar">
      <form class="sidebar__form" @submit.prevent="triggerSearch">
        <span class="sidebar__form-icon">🔎</span>
        <input
          v-model="searchTerm"
          class="sidebar__form-search"
          type="search"
          name="search"
          placeholder="🔎search for a location"
        />
      </form>
      <div ref="gmap" id="MapView"></div>
      <div class="sidebar__meta">
        <h3 class="sidebar__meta-title">Location Info</h3>
        <section class="sidebar__meta-section">
          <legend class="sidebar__meta-label">lat,lon:</legend>
          <p class="sidebar__meta-content">
            <!-- {{ Number(currentLocation.latitude.toFixed(5)) }},{{
              Number(currentLocation.longitude.toFixed(5))
            }}-->
            {{ currentLocation.latitude }},{{ currentLocation.longitude }}
          </p>
        </section>

        <section class="sidebar__meta-section">
          <legend class="sidebar__meta-label">heading</legend>
          <p class="sidebar__meta-content">
            <!-- {{ Number(currentLocation.pov_heading.toFixed(5)) }} -->
            {{ currentLocation.pov_heading }}
          </p>
        </section>

        <section class="sidebar__meta-section">
          <legend class="sidebar__meta-label">pitch</legend>
          <p class="sidebar__meta-content">
            <!-- {{ Number(currentLocation.pov_pitch.toFixed(5)) }} -->
            {{ currentLocation.pov_pitch }}
          </p>
        </section>

        <section class="sidebar__meta-section">
          <legend class="sidebar__meta-label">panorama id</legend>
          <p class="sidebar__meta-content">{{ currentLocation.pano_id }}</p>
        </section>
      </div>
      <button v-if="authd" class="submit-btn" @click.prevent="createLocation">
        Save to database
      </button>
    </div>
    <div ref="panorama" id="StreetView"></div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  name: "StreetViewComponent",
  data() {
    return {
      searchTerm: "New York"
    };
  },
  computed: {
    currentLocation() {
      if (this.$store.state.currentLocation.latitude !== null) {
        return this.$store.state.currentLocation;
      }
      return { latitude: 0, longitude: 0, pov_heading: 0, pov_pitch: 0 };
    },
    authd() {
      const username = this.$store.state.username;
      return username !== undefined ? true : false;
    }
  },
  methods: {
    createLocation() {
      this.$store.dispatch("createLocation");
    },
    triggerSearch() {
      this.$store.dispatch("setMapLocation", this.searchTerm);
    }
  },
  async mounted() {
    try {
      const authData = await UserService.checkAuth();
      await this.$store.dispatch("setUserDetails", authData);
      await this.$store.dispatch("initMap", {
        mapRef: this.$refs.gmap,
        panoRef: this.$refs.panorama
      });
    } catch (err) {
      alert(err);
    }
  }
};
</script>

<style lang="scss" scoped>
#StreetViewComponent {
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: grid;
  grid-template-columns: minmax(400px, 1fr) 3fr;
}

.sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;

  &__form {
    width: 100%;
    height: 3rem;
    display: flex;
    background-color: #f4f4f4;

    &-icon {
      display: inline-block;
      background-color: #ffffff;
      width: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid black;
    }

    &-search {
      background-color: #ffffff;
      width: 100%;
      height: 100%;
      padding: 0 0 0 0.5rem;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      border-left: none;
      border-right: 2px solid black;
      font-size: 1.2rem;
    }
  }

  &__meta {
    flex-basis: auto;
    flex-grow: 1;
    padding: 0.5rem;
    background-color: #333333;
    color: white;
    display: flex;
    flex-direction: column;
    // justify-content: center;

    &-title {
      font-weight: 400;
      margin-left: 0.3rem;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    &-section {
      border: 1px solid #777777;
      border-radius: 4px;
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
      padding: 0 0.5rem;
      font-size: 0.8rem;
    }
  }

  #MapView {
    width: 100%;
    flex-basis: 50%;
    flex-grow: 2;
  }

  .submit-btn {
    width: 100%;
    height: 3rem;
    background-color: #ffd700;
    font-size: 1.6rem;
    font-weight: bold;
    border: 2px solid #f4f4f4;
    outline: none;
    align-self: flex-end;
    transition: transform 0.2s;

    &:hover {
      transform: scale(0.98);
    }
  }
}

#StreetView {
  width: 100%;
  height: 100%;
}
</style>
