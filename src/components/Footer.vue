<template>
  <footer class="footer pt-4 pl-2 pr-2 pb-1">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-center justify-content-md-start">
        <div class="data-sources smalltext mr-2 mr-md-4 align-self-center">
          <span class="text-muted">Data fetched from:</span>
          <br />
          <a
            href="https://github.com/mathdroid/covid-19-api"
            target="_blank"
            rel="noopener noreferrer"
          >covid-19-api</a>
          <br />
          <a
            href="https://github.com/ExpDev07/coronavirus-tracker-api"
            target="_blank"
            rel="noopener noreferrer"
          >coronavirus-tracker-api</a>
          <span></span>
        </div>

        <div class="information-sources smalltext mr-0 mr-md-4 align-self-center">
          <span class="text-muted">Informations collected from:</span>
          <br />
          <a
            href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/"
            target="_blank"
            rel="noopener noreferrer"
          >novel-coronavirus-2019</a>
          <span></span>
        </div>

        <div class="ml-0 ml-md-auto text-center align-self-center">
          <label class="smalltext">Contributors</label>
          <div class="contributors d-flex">
            <div class="contributor" v-for="(contributor, index) in contributors" :key="index">
              <a :href="contributor" target="_blank">
                <img :src="contributor + '.png?size=100'" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      contributors: [
        "https://github.com/bibhuticoder",
        "https://github.com/sim-my",
        "https://github.com/arobce",
        "https://github.com/nabingaire"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: white;
  .smalltext {
    font-size: 10px;
  }

  .contributor {
    img {
      width: 25px;
      height: 25px;
      clip-path: circle();
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>