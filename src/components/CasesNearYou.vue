<template>
  <div class="--stats-near-you text-center mt-4 mb-4 pt-4">
    <div class="container-fluid">
      <div class="title mb-4 mt-4 p-relative">
        <span class="text align-self-center">Cases Around You</span>
        <div class="icon align-self-center">🧐</div>
      </div>

      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="card h-100">
            <div class="card-body">
              <Loading v-if="locationLoading" message="Getting your location..." />
              <Loading v-if="geoStats.loading" message="Loading data..." />
              <p
                v-if="!locationLoading && !myLocation"
                class="lead text-danger"
              >Sorry, we couldn't get your location.</p>

              <div v-if="nearByStats">
                <br />
                <vue-slider
                  v-model="coronaRadius"
                  :min="2"
                  :max="1000"
                  :interval="2"
                  :drag-on-click="true"
                  tooltip="always"
                  :process-style="{ backgroundColor: '#373737' }"
                  :tooltip-style="{ backgroundColor: '#373737', borderColor: '#373737' }"
                  :dot-style="{ backgroundColor: '#373737' }"
                  :rail-style="{ backgroundColor: '#373737', borderColor: '#373737' }"
                  :label-style="{ backgroundColor: '#373737', borderColor: '#373737' }"
                  :label-active-style="{ backgroundColor: '#373737', borderColor: '#373737' }"
                />
                <br />
                <p class="lead">
                  Showing latest stats in
                  <span class="font-weight-bold">{{coronaRadius}} KM</span>
                  radius
                </p>

                <table class="ml-auto mr-auto">
                  <tr>
                    <td>
                      <img src="@/assets/images/corona-confirmed-sm.png" class="stat-icon-alt mr-2" />
                    </td>
                    <td class="text-left font-weight-bold">{{nearByStats.confirmed}} confirmed cases</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="@/assets/images/corona-death-sm.png" class="stat-icon-alt mr-2" />
                    </td>
                    <td class="text-left font-weight-bold">{{nearByStats.deaths}} deaths</td>
                  </tr>
                  <!-- <tr>
                    <td>
                      <img src="@/assets/images/corona-recovered-sm.png" class="stat-icon-alt mr-2" />
                    </td>
                    <td class="text-left font-weight-bold">{{nearByStats.recovered}} recovered</td>
                  </tr>-->
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <l-map
            ref="map"
            v-if="myLocation"
            :zoom="customZoom"
            :options="map.options"
            :center="myLocationLatLng"
            style="height: 300px"
          >
            <l-tile-layer :url="map.url" />

            <l-circle
              ref="circle"
              :lat-lng="myLocationLatLng"
              :radius="coronaRadius * 1000"
              :color="'red'"
            />

            <l-marker :lat-lng="myLocationLatLng">
              <l-tooltip :options="{ permanent: true, interactive: true }">
                <div>You are here</div>
              </l-tooltip>
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { distBetn } from "@/helpers/core";
import Loading from "@/components/Loading.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";

import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LCircle
} from "vue2-leaflet";

export default {
  name: "CasesNearYou",
  components: {
    Loading,
    VueSlider,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LCircle
  },
  props: {
    geoStats: Object
  },

  mounted() {},

  data() {
    return {
      coronaRadius: 2,
      myLocation: null,
      locationLoading: false,

      map: {
        zoom: 1,
        center: latLng(47.41322, -1.219482),
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
          zoomSnap: 0.5
        }
      }
    };
  },

  created() {
    this.intiLocation();
  },
  methods: {
    intiLocation() {
      this.locationLoading = true;
      if (navigator.geolocation) {
        this.locationLoading = true;
        navigator.geolocation.getCurrentPosition(position => {
          this.myLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.locationLoading = false;
        });
      } else this.locationLoading = false;
    }
  },

  computed: {
    nearByStats() {
      // debugger;
      if (!this.geoStats.data || !this.myLocation) return null;
      let nearbyStats = {
        confirmed: 0,
        deaths: 0,
        recovered: 0
      };

      this.geoStats.data.forEach(stat => {
        let dist = distBetn(
          stat.coordinates.latitude,
          stat.coordinates.longitude,
          this.myLocation.lat,
          this.myLocation.lng,
          "K"
        );
        if (dist <= this.coronaRadius) {
          nearbyStats.confirmed += stat.latest.confirmed;
          nearbyStats.deaths += stat.latest.deaths;
          nearbyStats.recovered += stat.latest.recovered;
        }
      });
      return nearbyStats;
    },

    myLocationLatLng() {
      if (this.myLocation)
        return latLng(this.myLocation.lat, this.myLocation.lng);
      return null;
    },

    customZoom() {
      // return 13 - this.coronaRadius / 77;
      return 13 - (13 / 1000) * this.coronaRadius;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  position: relative;
}

.text {
  background-color: #373737;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 2rem;
}

.icon {
  background-color: transparent;
  padding: 0.25rem;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}
</style>
