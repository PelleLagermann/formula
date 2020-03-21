<template>
  <div>
    <label v-for="option in options" :key="option.key" class="custom-radio" :class="cssClass(option)">
      <input type="radio" :name="name" :value="option.key" :checked="(option.key == checkedKey)" @change="eventHandler" :disabled="(option.disabled || disabled)">
      <span class="bg round"></span>
      <span class="dot"></span>
      <span class="text" v-html="option.value"></span>
    </label>
  </div>
</template>

<script>
import _props from '../../../mixins/input-base-props-mixin'
import _events from '../../../mixins/event-data-model-mixin'

export default {

  name: 'custom-radio',
  mixins: [
    _props,
    _events
  ],

  props: {
    'options': {
      type: Array,
      required: false,
      default: () => []
    },
    'selected': {
      type: [String, Number],
      required: false,
      default: ''
    },
    'firstAsDefault': {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    checkedKey () {
      let checkedKey = this.selected

      if (!checkedKey) {
        const checkedItems = this.options.filter((option) => {
          return option.checked
        })

        if (checkedItems.length) {
          checkedKey = checkedItems[0].key
        } else if (this.firstAsDefault) {
          checkedKey = this.options[0].key
        }
      }

      return checkedKey
    }
  },

  methods: {
    eventHandler (event) {
      const value = event.target.value
      const errors = this.$vxValidate(value)
      const data = this.eventDataModel(event, value, errors)

      this.$data.checkedKey = value

      this.$emit(event.type, data)
    },
    cssClass (option) {
      let cssClass = ''
      if (this.css) { cssClass += this.css }
      if (option.cssClass) { cssClass += ' ' + option.cssClass }
      if (option.disabled) { cssClass += ' disabled' }

      return cssClass
    }
  },

  mounted () {
    // Emit @created event
    this.$emit('created', { name: this.name, value: this.checkedKey }, null)
  }

}
</script>
