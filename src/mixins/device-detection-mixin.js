const deviceDetection = {
  data: function () {
    return {
      currentDevice: ''
    }
  },
  computed: {
    isMobile () {
      return this.$data.currentDevice === 'mobile' || this.$data.currentDevice === 'phablet'
    },
    isTablet () {
      return this.$data.currentDevice === 'tablet'
    },
    isDesktop () {
      return this.$data.currentDevice === 'desktop'
    }
  },
  methods: {
    setCurrentDevice (data) {
      if (data) {
        this.$data.currentDevice = data.detail.device
      } else {
        this.$data.currentDevice = window.alka.helpers.getCurrentDevice()
      }
    }
  },
  created () {
    window.addEventListener('device-change', this.setCurrentDevice, false)
    this.setCurrentDevice(null)
  }
}

export default deviceDetection
