<template>
  <div class="card mb-2 mb-md-0">
    <div class="card-body">
      <p class="lead font-weight-bold">Data from all over the world</p>
      <div class="toolbar">
        <input
          type="text"
          class="form-control form-control-sm mb-3"
          v-model="searchKeyword"
          placeholder="Search a country/province"
        />
      </div>
      <div class="data">
        <Loading v-if="geoStats.loading" message="Loading data..." />
        <div v-if="results">
          <table class="table table-bordered table-sm">
            <thead>
              <th>
                <img src="@/assets/images/country.png" class="stat-icon-alt mr-2" />
                Country
              </th>
              <th>
                <img src="@/assets/images/corona-confirmed-sm.png" class="stat-icon-alt mr-2" />
                Confirmed
              </th>
              <th>
                <img src="@/assets/images/corona-death-sm.png" class="stat-icon-alt mr-2" />
                Deaths
              </th>
            </thead>

            <tbody>
              <tr v-for="(dataItem, index) in results" :key="index">
                <td>
                  {{dataItem.country}}
                  {{dataItem.province ? '(' + dataItem.province + ')' : ''}}
                </td>
                <td>
                  <span class="text-warning font-weight-bold">{{dataItem.latest.confirmed}}</span>
                </td>
                <td>
                  <span class="text-danger font-weight-bold">{{dataItem.latest.deaths}}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="ml-auto mr-auto">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <button class="page-link" aria-label="Previous" @click="prevPage()">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li class="page-item">
                <button class="page-link">{{pageNo}}</button>
              </li>
              <li class="page-item">
                <button class="page-link" aria-label="Next" @click="nextPage()">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "AllCountries",
  components: { Loading },
  props: {
    geoStats: Object
  },

  data() {
    return {
      geoStatResults: null,
      geoStatResultsToShow: null,
      pageNo: 1,
      perPage: 10,
      searchKeyword: null
    };
  },

  methods: {
    nextPage() {
      if (this.pageNo === Math.round(this.geoStats.data.length / this.perPage))
        return;
      this.pageNo++;
    },

    prevPage() {
      if (this.pageNo === 1) return;
      this.pageNo--;
    }
  },

  computed: {
    results() {
      if (!this.geoStats.data) return null;
      let data = this.geoStats.data;

      // search
      if (this.searchKeyword && this.searchKeyword.length > 0) {
        data = data.filter(stat => {
          return (
            stat.country.search(new RegExp(this.searchKeyword, "i")) >= 0 ||
            stat.province.search(new RegExp(this.searchKeyword, "i")) >= 0
          );
        });
        this.pageNo = 1;
      }

      // paginate
      let lastIndex = Math.min(this.pageNo * this.perPage, data.length);
      this.geoStatResultsToShow = data.slice(
        lastIndex - this.perPage,
        lastIndex
      );
      return this.geoStatResultsToShow;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
