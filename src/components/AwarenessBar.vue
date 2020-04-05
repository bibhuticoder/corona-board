<template>
  <div class="awareness-meter ml-auto">
    <div class="awareness-bar d-flex">
      <div class="base align-self-center">
        <img src="@/assets/images/corona-level.png" class="animated pulse infinite" />
        <!-- <img src="@/assets/images/corona-level.png" class="animated" /> -->
      </div>

      <div class="bar-cover flex-grow-1 mr-2 align-self-center">
        <div class="bar-progress" :style="'width:' + awarenessLevel + '%'"></div>
      </div>
      <h3 class="percentage mb-0 align-self-center">{{awarenessLevel}} %</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["awarenessLevel"]
};
</script>

<style lang="scss">
.awareness-meter {
  $light: #ff2261;
  $dark: #b7305d;
  .awareness-bar {
    .bar-cover {
      width: auto;
      height: 20px;
      margin-left: -5px;
      background-color: $dark;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      .bar-progress {
        width: 0;
        min-width: 5%;
        height: calc(100% - 4px);
        margin-top: 2px;
        background-color: whitesmoke;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        transition: all 0.5s ease-in-out;
      }
    }

    .base {
      width: 40px;
      height: 40px;
      padding: 7px;
      border: 2px solid $dark;
      border-radius: 50%;
      text-align: center;
      background-color: whitesmoke;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>