<template>
  <div class="container-fluid --general-stats text-center mb-4 pt-4">
    <template v-if="generalStats.loading">
      <Loading message="Fetching data..." />
    </template>
    <div v-else>
      <div class="row">
        <div class="col-md-4 col-xs-12">
          <div class="d-flex mb-2 justify-content-center justify-content-md-start mb-0-md">
            <img
              src="@/assets/images/clock.png"
              class="mr-1 align-self-center"
              width="24"
              height="24"
            />
            <p class="mb-0 align-self-center">Updated {{lastUpdatedAt}}</p>
          </div>
        </div>
        <div class="col-md-4 col-xs-12"></div>
        <div class="col-md-4 col-xs-12">
          <select
            class="form-control form-control-sm mb-1"
            @change="handleCountryChange"
            v-model="selectedCountry"
          >
            <option value="Global" :selected="selectedCountry === 'Global'">Global</option>
            <option
              v-for="country in generalStats.countries"
              :key="country.iso3"
              :value="country.name"
              :selected="selectedCountry === country.name"
            >{{country.name}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-xs-12">
          <div class="card h-100 animated bounceInLeft">
            <div class="card-body">
              <p class="lead font-weight-bold mb-0 text-center text-md-left">
                <span
                  class="number --general-stat-number text-warning"
                >{{generalStats.data.confirmed | comma}}</span>
                <br />Confirmed
              </p>
            </div>
          </div>
          <div class="d-sm-block d-md-none mb-2"></div>
        </div>

        <div class="col-md-4 col-xs-12">
          <div class="card h-100 animated bounceIn">
            <div class="card-body">
              <p class="lead font-weight-bold mb-0 text-center text-md-left">
                <span
                  class="number --general-stat-number text-danger"
                >{{generalStats.data.deaths | comma}}</span>
                <br />Deaths
              </p>
            </div>
          </div>
          <div class="d-sm-block d-md-none mb-2"></div>
        </div>

        <div class="col-md-4 col-xs-12">
          <div class="card h-100 animated bounceIn">
            <div class="card-body">
              <p class="lead font-weight-bold mb-0 text-center text-md-left">
                <span
                  class="number --general-stat-number text-info"
                >{{generalStats.data.recovered | comma}}</span>
                <br />Recovered
              </p>
            </div>
          </div>
          <div class="d-sm-block d-md-none mb-2"></div>
        </div>

        <!-- <div class="col-md-4 col-xs-12">
          <div class="card h-100 animated bounceInRight">
            <div class="card-body">
              <p class="lead font-weight-bold mb-0 text-center text-md-left">
                <span
                  class="number --general-stat-number text-success"
                >{{stats.data.safe | comma}}</span>
                <br />Are Safe
              </p>
            </div>
          </div>
          <div class="d-sm-block d-md-none mb-2"></div>
        </div>-->
      </div>
      <div class="row">
        <div class="col-12">
          <p class="lead font-weight-bold text-center">
            Globally
            <span
              class="number --general-stat-number text-success mr-2 ml-2"
            >{{generalStats.data.safe | comma}}</span>
            People are Safe
          </p>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-12">
          <div class="progress">
            <div
              class="progress-bar bg-warning"
              role="progressbar"
              :style="'width:' + statPercent.confirmed + '%'"
            ></div>
            <div
              class="progress-bar bg-danger"
              role="progressbar"
              :style="'width:' + statPercent.deaths + '%'"
            ></div>
            <div
              class="progress-bar bg-info"
              role="progressbar"
              :style="'width:' + statPercent.recovered + '%'"
            ></div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import moment from "moment";

export default {
  name: "GeneralStats",
  props: {
    generalStats: Object
  },
  components: { Loading },
  filters: {
    comma(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  data() {
    return {
      selectedCountry: "Global"
    };
  },

  methods: {
    handleCountryChange() {
      this.$emit("countryChanged", this.selectedCountry);
    }
  },

  computed: {
    lastUpdatedAt() {
      return moment(this.generalStats.lastUpdatedAt).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.number {
  font-family: "Montserrat", sans-serif;
}

.--general-stat-number {
  font-weight: bold;
  font-size: 2rem;
}
</style>
