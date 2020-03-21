const devices = ['mobile', 'phablet', 'tablet', 'desktop']
const deviceElems = []
let activeDevice = ''
let resizeTimeout
let deviceObj = devices.reduce(function (acc, cur) {
  acc[cur] = cur
  return acc
}, {})

function resizeThrottler () {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function () {
      resizeTimeout = null
      setDevice()
    }, 66)
  }
}

function createTestElements () {
  for (let i = 0; i < devices.length; i++) {
    let deviceElem = document.createElement('div')
    deviceElem.classList.add('visible-' + devices[i])
    deviceElem.setAttribute('device-name', devices[i])

    deviceElems.push(deviceElem)
    document.body.appendChild(deviceElem)
  }
}

function setDevice () {
  let currentDevice

  for (let i = 0; i < deviceElems.length; i++) {
    if (deviceElems[i].offsetParent !== null) {
      currentDevice = deviceElems[i].getAttribute('device-name')
      deviceElems[i].setAttribute('visible', 'true')
    } else {
      deviceElems[i].setAttribute('visible', 'false')
    }
  }

  if (!activeDevice || currentDevice !== activeDevice) {
    activeDevice = currentDevice

    // Add the active device as an attribute to body, so that it can be used in CSS
    document.body.setAttribute('current-device', activeDevice)

    // Emit event to allow other parts of the JS to react to device changes
    const evt = new CustomEvent('device-change', { detail: { device: activeDevice } })
    window.dispatchEvent(evt)
  }
}

var responsive = {
  init: function () {
    createTestElements()

    window.addEventListener('resize', resizeThrottler, false)
    setDevice()
  },
  getCurrentDevice: function () {
    return activeDevice
  }
}

export { deviceObj as devices }

export default responsive
