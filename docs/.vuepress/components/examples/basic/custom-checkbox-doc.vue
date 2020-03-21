<template>
  <div>
    <custom-checkbox name="terms" label="Accept terms and conditions" :selected="checked" @change="handler" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked: false
      }
    },
    methods: {
      handler (data) {
        // eslint-disable-next-line no-console
        console.log(data)
      }
    }
  }
</script>
