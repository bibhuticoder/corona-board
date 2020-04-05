<template>
  <div class="positive-stuffs">
    <div class="top d-flex mb-4">
      <img src="@/assets/images/positive.png" class="align-self-center mr-4" width="64" height="64" />
      <p
        class="lead font-weight-bold align-self-center mb-0"
      >There's a positive side to everything. It just takes a positive mind to see it 🙂</p>
    </div>
    <hr />

    <div class="positive-stuffs-list d-flex flex-column">
      <div class="positive-stuffs-list-item d-flex mb-4">
        <img src="@/assets/images/earth.png" width="64" height="64" class="align-self-center mr-4" />
        <p
          class="mb-0 align-self-center"
        >Environment pollution has been reduced to greater extent. Vegetation and wildlife are flourishing.</p>
      </div>

      <div class="positive-stuffs-list-item d-flex mb-4">
        <img
          src="@/assets/images/accident.png"
          width="64"
          height="64"
          class="align-self-center mr-4"
        />
        <p
          class="mb-0 align-self-center"
        >Being in lockdown has prevented a lot of deaths due to road accidents and airship crashes.</p>
      </div>

      <div class="positive-stuffs-list-item d-flex mb-4">
        <img
          src="@/assets/images/insights.png"
          width="64"
          height="64"
          class="align-self-center mr-4"
        />
        <p class="mb-0 align-self-center">
          Epidemics like the coronavirus outbreak are a mirror for humanity, reflecting the moral relationships that people have toward one other.
          -
          <span class="text-italic">Historian Frank M. Snowden</span>
        </p>
      </div>
    </div>

    <hr />

    <div class="d-flex mt-4">
      <img src="@/assets/images/sanitizer.svg" class="sanitizer align-self-center mr-2" />
      <p class="mb-0 text-center">
        If you find anything missing, or like to have some cool features included, or find some mis-information. Feel free to contact us.
        <br />
        <br />

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfNZ7XUnqYOofogwC__BGE4l8KDtiUR1zZtdIW6Q-23gecGCw/viewform?usp=sf_link" class="mr-4" 
        >I got something to say</a>
        <a href="#">Fork it on Github</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PositiveStuffs"
};
</script>

<style lang="scss" scoped>
.positive-stuffs {
  position: relative;
  min-height: 500px;

  .sanitizer {
    // position: absolute;
    // bottom: 0;
    // left: 50%;
    // transform: translateX(-50%);

    width: 100px;
    height: auto;
  }
}
</style>