<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="d-flex w-100">
      <div class="d-flex --brand">
        <div class="logo align-self-center mr-2">
          <img src="favicon.ico" width="24" class="--spin" />
        </div>
        <p class="lead mb-0 align-self-center">CoronaBoard</p>
      </div>

      <div v-if="showMiniStat && stats" class="ml-auto">
        <div class="mini-stat d-flex flex-column animated bounceInRight" v-if="stats.data">
          <span class="text-warning">Confirmed: {{stats.data.confirmed}}</span>
          <span class="text-danger">Deaths: {{stats.data.deaths}}</span>
          <span class="text-info">Recovered: {{stats.data.recovered}}</span>
        </div>
        <div v-else-if="stats.loading">Loading...</div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    stats: Object
  },
  data() {
    return {
      showMiniStat: false
    };
  },

  mounted() {
    window.onscroll = () => {
      if (window.scrollY > 150) this.showMiniStat = true;
      else this.showMiniStat = false;
    };
  }
};
</script>

<style lang="scss">
.navbar {
  transition: all 0.5s ease-in-out;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.--brand {
  color: whitesmoke;
  .logo {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: white;
    background-image: url("/favicon.ico");

    img {
      width: 80%;
      margin: 10%;
      transition: ease-in-out;

      &.--spin {
        -webkit-animation: spin 10s linear infinite; /* Safari */
        animation: spin 10s linear infinite;
      }

      &.--spin-fast {
        -webkit-animation: spin 5s linear infinite; /* Safari */
        animation: spin 5s linear infinite;
      }
    }
  }
}

.mini-stat {
  color: whitesmoke;
  font-size: 12px;
}
</style>