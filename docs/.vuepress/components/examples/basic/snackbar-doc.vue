<template>
  <div>
    <br>
    <button class="btn-primary" @click="toggleIsLoading()">Show / Hide Preloader</button>
    <br>
    <br>
    <preloader v-if="isLoading" css="preloader--large"></preloader>
  </div>
</template>
<script>
    export default {
        name: 'preloader-demo',
        data() {
            return {
                isLoading: true
            };
        },
        methods: {
            toggleIsLoading() {
                this.$data.isLoading = !this.$data.isLoading;
            }
        }
    };
</script>
<style></style>
