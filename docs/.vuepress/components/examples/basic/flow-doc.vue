<template>
  <div>
    <flow-wrapper ref="stepWrapper">
      <flow-section title="Section 1">
        <div class="section">
          Content of section 1
        </div>
        <div class="section-footer">
          <button type="button" class="btn-primary" @click="nextSection">Next</button>
        </div>
      </flow-section>
      <flow-section title="Section 2">
        <div class="section">
          Content of section 2
        </div>
        <div class="section-footer">
          <button type="button" class="btn-secondary" @click="prevSection">Back</button>
          <button type="button" class="btn-primary" @click="nextSection">Next</button>
        </div>
      </flow-section>
    </flow-wrapper>
  </div>
</template>

<script>
  export default {
    methods: {
      nextSection() {
        this.$refs.stepWrapper.next();
      },
      prevSection() {
        this.$refs.stepWrapper.prev();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .section {
    margin-bottom: 2rem;
  }

  .section-footer {
    margin-top: 2rem;
    text-align: right;
  }
</style>
