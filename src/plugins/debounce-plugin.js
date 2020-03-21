import { extend as _extend } from '../common/utility-common'

// debounce default options
const debounceOptions = { }

// debounce mixin
const debounceMixin = {
  props: {
    /* @param {debounce}: delay in milliseconds */
    'debounce': {
      type: Number,
      required: false,
      default: 350
    }
  },
  data () {
    /* @param {debounced}: timeout id collection */
    return {
      debounced: {
        /* key: value */
      }
    }
  }
}

// debounce plugin
const debouncePlugin = {

  // eslint-disable-next-line no-unused-vars
  install (Vue, options = {}) {
    // extend options
    options = _extend(debounceOptions, options)

    // inject props
    Vue.mixin(debounceMixin)

    // debounce function
    Vue.prototype.$debounce = function (id, fn, ms) {
      clearTimeout(this.$data.debounced[id])
      this.$data.debounced[id] = setTimeout(fn, (ms !== undefined && ms !== null) ? ms : this.$props.debounce)
    }
  }

}

export default debouncePlugin
