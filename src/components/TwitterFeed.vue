<template>
  <div class="card mb-2 mb-md-0">
    <div class="card-body">
      <a
        class="twitter-timeline"
        href="https://twitter.com/trackingcorona?ref_src=twsrc%5Etfw"
        :data-tweet-limit="checkIfMobile() ? 1 : 1"
      >Tweets by trackingcorona</a>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/helpers/core";
export default {
  methods: {
    checkIfMobile() {
      return isMobile();
    }
  }
};
</script>

<style scoped>
  .card-body{
    max-height: 850px;
    overflow: auto;
  }
</style>