<template>
    <label :class="'custom-checkbox ' + computedCssClasses">
        <input type="checkbox" :name="name" :checked="selected" @change="eventHandler" :disabled="disabled">
        <span class="bg"></span>
        <span class="dot icon-check-small"></span>
        <span class="text" v-html="label"></span>
    </label>
</template>
<script>
import _props from '../../../mixins/input-base-props-mixin'
import _events from '../../../mixins/event-data-model-mixin'

export default {

  name: 'custom-checkbox',
  mixins: [
    _props,
    _events
  ],

  props: {
    'label': {
      type: String,
      required: true,
      default: ''
    },
    'selected': {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {}
  },

  computed: {
    computedCssClasses () {
      return this.css + ' ' + (this.disabled ? 'disabled' : '')
    }
  },

  methods: {
    eventHandler (event) {
      const value = event.target.checked
      const errors = this.$vxValidate(value)
      const data = this.eventDataModel(event, value, errors)
      this.$emit(event.type, data)
    }
  }
}
</script>
