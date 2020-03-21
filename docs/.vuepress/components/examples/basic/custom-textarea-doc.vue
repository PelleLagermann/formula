<template>
  <div>
    <custom-textarea  name="text"
                      placeholder="Enter Text Here"
                      :initial="value"
                      max="200"
                      @input="handler">
    </custom-textarea>
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

<style lang="scss" scoped>
  .custom-textarea /deep/ {
      width: 94%;

      textarea.textarea {
          width: 100%;
          padding: 15px 20px;
          resize: none;
      }
  }
</style>
