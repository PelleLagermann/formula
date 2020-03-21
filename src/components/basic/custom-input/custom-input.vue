<template>
  <span :class="'custom-input ' + css + (initial ? ' focus' : '') + (icon ? ' icon' : '')">
    <input
      :type="type"
      :name="name"
      :value="initial"
      :minLength="min"
      :maxLength="max"
      :pattern="pattern"
      :disabled="disabled"
      :debounce="debounce"
      :autocomplete="(autocomplete ? 'on' : 'off')"
      :autocorrect="(autocorrect ? 'on' : 'off')"
      :autocapitalize="(autocapitalize ? 'on' : 'off')"
      :spellcheck="(spellcheck ? 'on' : 'false')"
      class="input"
      ref="input"
      @keyup="eventHandler"
      @keydown="eventHandler"
      @keypress="eventHandler"
      @paste="pasteHandler"
      @input="eventHandler"
      @click="eventHandler"
      @change="eventHandler"
    />
    <label class="smart">{{ placeholder }}</label>
    <i v-if="icon" :class="`icon-${icon}`" />
  </span>
</template>

<script>
import _props from '../../../mixins/input-base-props-mixin'
import _events from '../../../mixins/event-data-model-mixin'

export default {
  name: 'custom-input',
  mixins: [
    _props,
    _events
  ],

  props: {
    'type': {
      type: String,
      required: false,
      default: 'text'
    },
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
    'icon': {
      type: String,
      required: false,
      default: null
    },
    'pattern': {
      type: String,
      required: false,
      default: null
    },
    'emit': {
      type: Array,
      required: false,
      default: () => ['input', 'change', 'paste']
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

      // input restriction
      const value = event.target.value
      if (value && !this.matchPattern(this.$props.pattern, value)) { event.target.value = value.substring(value.length - 1, 0); return }

      // validate and package data
      const errors = this.$vxValidate(value)
      const data = this.eventDataModel(event, value, errors)

      // emit event
      if (type === 'input') this.$debounce(type, () => { this.$emit(type, data) })
      else this.$emit(type, data)
    },
    setFocus () {
      if (this.$props.focus === true) this.$refs.input.focus()
    }
  },

  // lifecycle hooks
  mounted () {
    this.setFocus()
  },
  updated () {
    this.setFocus()
  }
}
</script>
