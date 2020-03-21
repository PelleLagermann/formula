import responsive from './responsive'

// Init global helpers
responsive.init()

// Build helpers object
var helpers = {
  getCurrentDevice: responsive.getCurrentDevice
}

export default helpers
