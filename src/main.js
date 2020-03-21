/* Community Plugins */
import VueSctollTo from 'vue-scrollto'
import DomPortal from 'vue-dom-portal'
import vClickOutside from 'v-click-outside'

/* Custom Plugins */
import debouncePlugin from './plugins/debounce-plugin'
import vxPlugin from './plugins/validation-plugin'

/* Components in this lib. */
import * as components from './components'

/* Styles */
import '@/assets/styles/index.scss'

const Formula = {
  install (Vue = {}) {
    // plugins
    Vue.use(VueSctollTo, { offset: -100 })
    Vue.use(DomPortal)
    Vue.use(vClickOutside)
    Vue.use(debouncePlugin)
    Vue.use(vxPlugin)

    // components
    for (const componentName in components) {
      const component = components[componentName]
      Vue.component(component.name, component)
    }
  }
}

export default Formula

if (typeof window !== 'undefined') {
  // Add custom alka object on window
  const alkaHelpers = require('./helpers').default
  window.alka = window.alka || {}
  window.alka.helpers = window.alka.helpers || alkaHelpers

  if (window.Vue) {
    window.Vue.use(Formula)
  }
}
