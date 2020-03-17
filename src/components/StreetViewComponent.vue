<template>
  <div id="StreetViewComponent">
    <div id="MapView"></div>
    <div id="StreetView"></div>
  </div>
</template>

<script>
import { Loader } from "google-maps";

const APIKEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
console.log("YOOOOOOO", APIKEY);

export default {
  name: "StreetViewComponent",
  methods: {
    async createMap() {
      const options = {};
      const loader = new Loader(APIKEY, options);

      const google = await loader.load();
      // eslint-disable-next-line no-unused-vars
      var fenway = { lat: 42.345573, lng: -71.098326 };
      var map = new google.maps.Map(document.getElementById("MapView"), {
        center: fenway,
        zoom: 14
      });
      var panorama = new google.maps.StreetViewPanorama(
        document.getElementById("StreetView"),
        {
          position: fenway,
          pov: {
            heading: 34,
            pitch: 10
          }
        }
      );
      map.setStreetView(panorama);

      panorama.addListener("pano_changed", function() {
        // var panoCell = document.getElementById("pano-cell");
        // panoCell.innerHTML = panorama.getPano();
        console.log("pano", panorama.getPano());
      });

      panorama.addListener("links_changed", function() {
        // var linksTable = document.getElementById("links_table");
        // while (linksTable.hasChildNodes()) {
        //   linksTable.removeChild(linksTable.lastChild);
        // }
        // var links = panorama.getLinks();
        // for (var i in links) {
        //   var row = document.createElement("tr");
        //   linksTable.appendChild(row);
        //   var labelCell = document.createElement("td");
        //   labelCell.innerHTML = "<b>Link: " + i + "</b>";
        //   var valueCell = document.createElement("td");
        //   valueCell.innerHTML = links[i].description;
        //   linksTable.appendChild(labelCell);
        //   linksTable.appendChild(valueCell);
        // }
        console.log("pano", panorama.getLinks());
      });

      panorama.addListener("position_changed", function() {
        // var positionCell = document.getElementById("position-cell");
        // positionCell.firstChild.nodeValue = panorama.getPosition() + "";
        console.log("position", panorama.getPosition());
      });

      panorama.addListener("pov_changed", function() {
        // var headingCell = document.getElementById("heading-cell");
        // var pitchCell = document.getElementById("pitch-cell");
        // headingCell.firstChild.nodeValue = panorama.getPov().heading + "";
        // pitchCell.firstChild.nodeValue = panorama.getPov().pitch + "";
        console.log("pov - pitch", panorama.getPov().pitch);
        console.log("heading", panorama.getPov().heading);
      });
    }
  },
  async mounted() {
    await this.createMap();
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
