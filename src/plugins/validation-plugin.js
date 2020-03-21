import { extend as _extend } from '../common/utility-common'

// validator plugin default  options
const vxOptions = {
  // [TODO]: auto validate flag
  auto: true,

  // [TODO]: validate on these event(s)
  on: ['input', 'change'],

  //  [TODO]: delay validation (number in milliseconds)
  delay: 500,

  // built in validators ([TODO]: cpr-age, etc.)
  defaults: {
    'required': (value) => {
      if (value instanceof Array) return value.length > 0
      else if (typeof value === 'string') return value.trim() !== ''
      else if (typeof valye === 'object') return value.constructor === Object && Object.keys(value).length !== 0
      return value !== undefined && value !== null
    },
    'number': (value) => {
      return !isNaN(Number(value))
    },
    'regex': (value, regex) => {
      var regExp = new RegExp(regex)

      if (value instanceof Array) {
        let result = []
        for (var i = 0; i < value.length; i++) result.push(regExp.test(value[i]))
        return result
      } else if (typeof value === 'string' || typeof value === 'number') {
        return regExp.test(value)
      } else if (typeof value === 'object') {
        // eslint-disable-next-line no-console
        console.warn('regex validation not application to object type: ', value)
        return false
      }
      return regExp.test(value)
    },
    'email': (value) => {
      // The regular expression used for e-mail validation is taken from "Alka.Sitecore.Custom.config" so the same validation is used across the entire solution.
      // eslint-disable-next-line no-useless-escape
      var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !value || regExp.test(value)
    },
    'phone': (value) => {
      var regExp = /^[0-9]{8}$/
      return !value || regExp.test(value)
    }
  }
}

// validator mixin
const vxMixin = {
  props: {
    /* @param {vx-validators}: validator collection i.e. [MIN 2 CHAR] => { type: 'regex', format: '^.{2,}$', text: 'Indtast nummerplade' } */
    'vx-validators': {
      type: Array,
      required: false,
      default: () => [
        /* {
          type: string | regex | custom,
          format: 'name-of-validator' | regex | () => {},
          text: string
        } */
      ]
    }
  },
  data () {
    /* @param {vxErrors}: error collection */
    return {
      vxErrors: [/* error messages */]
    }
  }
}

// generic validation function
const vxValidate = (value, validators, options) => {
  validators = validators || []
  let validator = null
  let valid = false
  let errors = []

  for (let i = 0; i < validators.length; i++) {
    validator = validators[i]

    if (validator.type === 'string') {
      if (!options.defaults.hasOwnProperty(validator.format)) throw new TypeError(`Unknown/Unregistered validator format encountered: "${validator.format}"`)
      valid = options.defaults[validator.format](value)
    } else if (validator.type === 'regex') {
      if (!options.defaults.hasOwnProperty('regex')) throw new TypeError(`Unknown/Unregistered validator format encountered: "${validator.format}"`)
      valid = options.defaults['regex'](value, validator.format)
    } else if (validator.type === 'custom') {
      if (typeof validator.format !== 'function') throw new TypeError(`Unknown/Unregistered validator format encountered: "${validator.format}"`)
      valid = validator.format(value)
    } else {
      throw new TypeError('unknown validator type: ' + validator.type)
    }

    // add error messages to collection
    if ((!valid) || (valid instanceof Array && !valid.length)) errors.push(validator.text)
  }

  return errors
}

const vxPlugin = {

  install (Vue, options = {}) {
    // extend options
    options = _extend(vxOptions, options)

    // inject props
    Vue.mixin(vxMixin)

    // instance validate
    Vue.prototype.$vxValidate = function (value) {
      // eslint-disable-next-line no-return-assign
      return this.$data.vxErrors = vxValidate(value, this.$props.vxValidators, options)
    }

    // global validate
    Vue.$vxValidate = function (value, validators) {
      return vxValidate(value, validators, options)
    }
  }

}

export default vxPlugin
