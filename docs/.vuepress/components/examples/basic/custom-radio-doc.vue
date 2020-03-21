<template>
  <div>
    <custom-radio name="radio" :options="radios" ></custom-radio>
  </div>
</template>

<script>
export default {
  data () {
      return {
        radios: [{ key: '1', value: 'First', checked: true }, { key: '2', value: 'Second' }]
      }
    }
}
</script>
