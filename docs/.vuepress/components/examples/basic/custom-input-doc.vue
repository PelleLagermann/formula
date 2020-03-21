<template>
  <div>
    <custom-input name="firstname" placeholder="Fornavn" :initial="value" @change="handler" icon="iphone"></custom-input>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    methods: {
      handler (data) {
        this.value = data.value
      }
    }
  }
</script>
