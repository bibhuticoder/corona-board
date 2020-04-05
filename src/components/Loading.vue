<template>
  <div class="loading">
    <div class="loader"></div>
    <label v-if="message">{{ message }}</label>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>

<style>
</style>