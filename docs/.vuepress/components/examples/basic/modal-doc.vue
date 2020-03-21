<template>
  <div>
    <br>
    <button class="btn-primary" @click="showTheModal">Show Modal</button>
    <modal name="demoModal" title="Demo Modal" footer="demo footer" :show="showmodal" @close="closeTheModal">
        <!--
        <div slot="header">
          <h1>Header</h1>
        </div>
        -->
        <div slot="body">
          <div>body</div>
        </div>
        <!--
        <div slot="footer">
          <div>footer</div>
        </div>
        -->
    </modal>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              showmodal: false
            };
        },
        methods: {
          showTheModal() {
            this.showmodal = true
          },
          closeTheModal() {
            this.showmodal = false
          }
        }
    };
</script>
<style></style>
