<template>
  <span :class="'custom-textarea ' + css + (initial ? ' focus' : '')">
    <textarea
      :name="name"
      :value="initial"
      :minLength="min"
      :maxLength="max"
      :disabled="disabled"
      :pattern="pattern"
      :debounce="debounce"
      :autocomplete="(autocomplete ? 'on' : 'off')"
      :autocorrect="(autocorrect ? 'on' : 'off')"
      :autocapitalize="(autocapitalize ? 'on' : 'off')"
      :spellcheck="(spellcheck ? 'on' : 'false')"
      class="textarea"
      ref="textarea"
      @keyup="eventHandler"
      @keydown="eventHandler"
      @keypress="eventHandler"
      @paste="pasteHandler"
      @input="eventHandler"
      @change="eventHandler"
    />
    <label class="smart">{{ placeholder }}</label>
  </span>
</template>

<script>
import _props from '../../../mixins/input-base-props-mixin'
import _events from '../../../mixins/event-data-model-mixin'

export default {

  name: 'custom-textarea',
  mixins: [
    _props,
    _events
  ],

  props: {
    'min': {
      type: [String, Number],
      required: false,
      default: null
    },
    'max': {
      type: [String, Number],
      required: false,
      default: null
    },
    'focus': {
      type: Boolean,
      required: false,
      default: false
    },
    'initial': {
      type: String,
      required: false,
      default: ''
    },
    'pattern': {
      type: String,
      required: false,
      default: null
    },
    'sanitizer': {
      type: String,
      required: false,
      default: null
    },
    'emit': {
      type: Array,
      required: false,
      default: () => ['input', 'change']
    },

    // extended options
    'autocomplete': {
      type: Boolean,
      required: false,
      default: true
    },
    'autocorrect': {
      type: Boolean,
      required: false,
      default: true
    },
    'autocapitalize': {
      type: Boolean,
      required: false,
      default: false
    },
    'spellcheck': {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return { }
  },

  methods: {
    // pattern match (prevent propagation if false)
    matchPattern (pattern, value) {
      if (!pattern) return true
      return new RegExp(pattern).test(value)
    },

    // event handler
    pasteHandler (event) {
      const self = this
      setTimeout(() => {
        if (!this.matchPattern(self.$props.pattern, event.target.value)) event.target.value = ''
        self.eventHandler(event)
      }, 0)
    },
    eventHandler (event) {
      const type = event.type
      if (this.$props.emit.indexOf(type) === -1) return

      // input restriction and sanitization
      const value = event.target.value
      if (value && !this.matchPattern(this.$props.pattern, value)) {
        if (this.$props.sanitizer) event.target.value = value.replace(new RegExp(this.$props.sanitizer, 'g'), '') // sanitize the input value
        else event.target.value = value.substring(value.length - 1, 0) // [default]: remove last character
        return
      }

      // validate and package data
      const errors = this.$vxValidate(value)
      const data = this.eventDataModel(event, value, errors)

      // emit event
      if (type === 'input') this.$debounce(type, () => { this.$emit(type, data) })
      else this.$emit(type, data)
    }
  },

  // lifecycle hooks
  updated () {
    if (this.$props.focus === true) this.$refs.textarea.focus()
  }

}
</script>
