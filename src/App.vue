<template>
  <div id="app">
    <Navbar :stats="generalStats" />
    <GeneralStats :generalStats="generalStats" @countryChanged="handleCountryChange" />
    <CasesNearYou :geoStats="geoStats" />

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <AwarenessQuiz />
          <br />
          <AllCountries :geoStats="geoStats" />
          <div class="card mt-4">
            <div class="card-body">
              <Symptoms />
            </div>
          </div>
        </div>

        <div class="col-md-6 col-sm-12">
          <TwitterFeed />
          <br />
          <div class="card mt-2">
            <div class="card-body">
              <GrowthChart />
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-body">
              <PositiveStuffs />
            </div>
          </div>
        </div>
      </div>
    </div>

    <DrCorona />
    
    <br>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import GeneralStats from "./components/GeneralStats.vue";
import CasesNearYou from "./components/CasesNearYou.vue";
import TwitterFeed from "./components/TwitterFeed.vue";
import DrCorona from "./components/DrCorona.vue";
import AwarenessQuiz from "./components/AwarenessQuiz.vue";
import AllCountries from "./components/AllCountries.vue";
import GrowthChart from "./components/GrowthChart.vue";
import Symptoms from "./components/Symptoms.vue";
import PositiveStuffs from "./components/PositiveStuffs.vue";
import Footer from "./components/Footer.vue";
import { fetchGeneralData } from "./helpers/data";

export default {
  name: "App",
  components: {
    GeneralStats,
    CasesNearYou,
    Navbar,
    TwitterFeed,
    DrCorona,
    AwarenessQuiz,
    AllCountries,
    GrowthChart,
    Symptoms,
    PositiveStuffs,
    Footer
  },

  data() {
    return {
      generalStats: {
        data: null,
        loading: false
      },

      geoStats: {
        data: null,
        loading: false
      },

      location: {
        loading: false
      }
    };
  },

  created() {
    this.fetchGeneralStats();
    this.fetchGeoStats();
  },

  methods: {
    fetchGeneralStats() {
      this.generalStats.loading = true;
      fetchGeneralData(true, stats => (this.generalStats = stats));
    },

    handleCountryChange(selectedCountry) {
      this.generalStats.loading = true;
      if (selectedCountry === "Global") {
        this.fetchGeneralStats();
        return;
      }
      fetchGeneralData(
        false,
        data => (this.generalStats = data),
        selectedCountry
      );
    },

    fetchGeoStats(callback) {
      this.geoStats.loading = true;
      axios
        .get("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
        .then(res => {
          this.geoStats.data = res.data.locations.sort(function(a, b) {
            return b.latest.deaths - a.latest.deaths;
          });
          this.geoStats.loading = false;
        });
    },

    intiLocation() {
      if (navigator.geolocation) {
        this.locationLoading = true;
        navigator.geolocation.getCurrentPosition(position => {
          this.myLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.calculateNearbyStats();
          this.locationLoading = false;
        });
      } else {
        this.locationLoading = false;
        this.nearbyStats = null;
      }
    }
  }
};
</script>

<style>
#app {
  position: relative;
  padding-top: 50px;
  background-color: #fafafa;
  font-family: "Raleway", sans-serif;
  overflow-x: hidden;
}

p,
span,
label {
  font-family: "Raleway", sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Poppins", sans-serif;
}

.corona-bar {
  width: 120px;
  margin: 10px;
  background-color: white;
  padding: 5px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.corona-bar-stat {
  font-size: 0.7rem;
  padding: 5px;
  font-weight: bold;
}

.corona-bar-stat label {
  margin-bottom: 0;
}

.corona-bar .location {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.corona-bar .location .province {
  font-size: 0.8rem;
  font-weight: bold;
}

.stat-icon-alt {
  width: 24px;
  height: 24px;
}

/* Loader */
.loader {
  margin: 0 auto;
  border: 10px solid white;
  border-radius: 50%;
  border-top: 10px solid #dc3545;
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Loader end */
</style>
