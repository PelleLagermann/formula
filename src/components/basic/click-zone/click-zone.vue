<template>
  <div class="click-zone">
    <canvas :id="canvasId" ref="clickZoneCanvas" class="click-zone__canvas"></canvas>
    <preloader v-if="isLoading" class="click-zone__preloader" css="preloader--medium"></preloader>
  </div>
</template>

<script>
export default {
  name: 'click-zone',

  props: {
    backgroundImageUrl: {
      type: String,
      required: true
    },
    zones: {
      type: Array,
      required: true,
      validator: value => {
        let valid = true
        for (let i = 0; i < value.length; i++) {
          valid = valid &&
          value[i].hasOwnProperty('imageUrl') &&
          value[i].hasOwnProperty('selected')
        }
        return valid
      },
      note: 'a list of zones that can be selected on the background image.\n' +
            '- imageUrl: the URL to the zone image.\n' +
            '- selected: boolean value describes if the zone will be preselscted.'
    },
    selectedAlpha: {
      type: Number,
      required: false,
      default: 0.8
    },
    mouseOverAlpha: {
      type: Number,
      required: false,
      default: 0.5
    },
    loadingIndicator: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      /* internal state variables */
      backgroundImage: undefined,
      localZones: [],
      colorsHash: {},
      ignoreMouseMoveEvent: false,
      isLoading: this.loadingIndicator,

      /* main display canvas */
      canvas: undefined,
      ctx: undefined,

      /* canvas where colored zones are storred */
      zoneCanvas: undefined,
      zoneCtx: undefined,

      /* canvas for rendering zone images in to colored zones */
      renderCanvas: undefined,
      renderCtx: undefined
    }
  },

  computed: {
    canvasId () {
      return `click-zone-${this._uid}`
    }
  },

  methods: {

    /* render loop */

    render (redrawZones = false) {
      if (this.canvas.width <= 0) { return }
      let self = this

      this.ctx.globalAlpha = 1
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)

      if (this.$el.querySelector(`#${this.canvasId}`)) { this.$el.querySelector(`#${this.canvasId}`).style.cursor = 'default' }
      for (let zone of this.localZones) {
        if (zone.hover) {
          if (this.$el.querySelector(`#${this.canvasId}`)) { this.$el.querySelector(`#${this.canvasId}`).style.cursor = 'pointer' }
        }

        if (zone.selected) {
          this.ctx.globalAlpha = this.selectedAlpha
          this.ctx.drawImage(zone.image, 0, 0, this.canvas.width, this.canvas.height)
        } else if (zone.hover) {
          this.ctx.globalAlpha = this.mouseOverAlpha
          this.ctx.drawImage(zone.image, 0, 0, this.canvas.width, this.canvas.height)
        }

        if (redrawZones) {
          this.renderCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.renderCtx.drawImage(zone.image, 0, 0, this.canvas.width, this.canvas.height)
          this.desaturate(this.renderCanvas, this.renderCtx)
          this.colorize(this.renderCanvas, this.renderCtx, zone.colorKey, 1)

          let img = new Image()
          img.src = this.renderCanvas.toDataURL('image/png', 1)
          img.onload = function () {
            self.zoneCtx.drawImage(img, 0, 0, self.canvas.width, self.canvas.height)
          }
        }
      }
    },

    /* canvas manipulation */

    loadImage (url) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.addEventListener('load', e => resolve(img))
        img.addEventListener('error', () => {
          reject(new Error(`Failed to load image's URL: ${url}`))
        })
        img.src = url
      })
    },
    desaturate (canvas, ctx) {
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let pixels = imageData.data
      let index
      let length
      let red
      let green
      let blue
      let alpha
      let average

      for (index = 0, length = pixels.length; index < length; index += 4) {
        alpha = pixels[index + 3]
        if (alpha === 0) {
          // skip if pixel is transparent
          continue
        }

        red = pixels[index]
        green = pixels[index + 1]
        blue = pixels[index + 2]

        average = ((red + green + blue) / 3) >>> 0
        pixels[index] = pixels[index + 1] = pixels[index + 2] = average
      }

      ctx.putImageData(imageData, 0, 0)
    },
    colorize (canvas, ctx, color, alpha) {
      // get original values
      let originalAlpha = ctx.globalAlpha
      let originalCompositeOperation = ctx.globalCompositeOperation

      // draw shape
      ctx.globalCompositeOperation = 'source-atop'
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // reset to original values
      ctx.globalCompositeOperation = originalCompositeOperation
      ctx.globalAlpha = originalAlpha
    },
    getRandomColor () {
      const r = Math.round(Math.random() * 255)
      const g = Math.round(Math.random() * 255)
      const b = Math.round(Math.random() * 255)
      return this.rgbToHex(r, g, b)
    },
    rgbToHex (r, g, b) {
      function componentToHex (c) {
        var hex = c.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
    },

    /* canvas setup */

    prepareCanvas () {
      this.canvas = this.$refs.clickZoneCanvas
      this.ctx = this.canvas.getContext('2d')

      this.zoneCanvas = document.createElement('canvas')
      this.zoneCtx = this.zoneCanvas.getContext('2d')

      this.renderCanvas = document.createElement('canvas')
      this.renderCtx = this.renderCanvas.getContext('2d')
    },
    resizeCanvas () {
      if (!this.backgroundImage) { return }

      let aspectRatio = this.backgroundImage.height / this.backgroundImage.width
      this.canvas.width = this.zoneCanvas.width = this.renderCanvas.width = this.$el.offsetWidth
      this.canvas.height = this.zoneCanvas.height = this.renderCanvas.height = this.canvas.width * aspectRatio

      this.$nextTick(() => {
        this.render(true)
      })
    },
    populateCanvas () {
      let requests = []
      requests.push(this.loadImage(this.backgroundImageUrl))
      for (let i = 0; i < this.localZones.length; i++) {
        requests.push(this.loadImage(this.localZones[i].imageUrl))
      }

      Promise.all(requests).then(images => {
        this.backgroundImage = images[0]

        for (let i = 1; i < images.length; i++) {
          let colorKey
          while (true) {
            colorKey = this.getRandomColor()
            if (!this.colorsHash[colorKey]) {
              this.colorsHash[colorKey] = this.localZones[i - 1]
              break
            }
          }

          this.localZones[i - 1].image = images[i]
          this.localZones[i - 1].colorKey = colorKey
        }

        this.isLoading = false
        this.$emit('is-loading', false)

        this.resizeCanvas()
      }).catch(error => {
        throw error
      })
    },

    /* event handlers */

    canvasClickEventListener (event) {
      this.ignoreMouseMoveEvent = false

      const mousePos = {
        x: event.layerX,
        y: event.layerY
      }

      const pixel = this.zoneCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data
      const color = this.rgbToHex(pixel[0], pixel[1], pixel[2])

      for (let index = 0; index < this.localZones.length; index++) {
        if (this.localZones[index].colorKey === color) {
          this.localZones[index].selected = !this.localZones[index].selected
          this.zones[index].selected = this.localZones[index].selected
          this.$emit('toggled-zone', this.zones[index], index)
        }
      }

      let selectedZones = []
      for (let i = 0; i < this.zones.length; i++) {
        if (this.zones[i].selected) {
          selectedZones.push(this.zones[i])
        }
      }
      this.$emit('selected-zones', selectedZones)

      this.render()
    },
    canvasMouseMoveEventListener (event) {
      if (this.ignoreMouseMoveEvent) { return }

      const mousePos = {
        x: event.layerX,
        y: event.layerY
      }

      const pixel = this.zoneCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data
      const color = this.rgbToHex(pixel[0], pixel[1], pixel[2])

      for (let i = 0; i < this.localZones.length; i++) {
        if (this.localZones[i].colorKey === color) {
          this.localZones[i].hover = true
        } else {
          this.localZones[i].hover = false
        }
      }
      this.render()
    },
    canvasMouseEnterEventListener (event) {
      this.render(true)
    },
    canvasMouseLeaveEventListener (event) {
      for (let i = 0; i < this.localZones.length; i++) {
        this.localZones[i].hover = false
      }
      this.render()
    },
    canvasTouchStartEventListener (event) {
      this.ignoreMouseMoveEvent = true
    },
    observeElementResize (element, resizeCallback) {
      if (typeof window.ResizeObserver !== 'undefined') {
        // MDN: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
        // Can I Use: https://caniuse.com/#feat=resizeobserver
        const resizeObserver = new ResizeObserver(entries => {
          entries.forEach(entry => {
            resizeCallback()
          })
        })
        resizeObserver.observe(element)
        return resizeObserver
      }

      /* IE 11 Compliant */
      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
      // Csn I Use: https://caniuse.com/#feat=mutationobserver
      let oldWidth = element.style.width
      let config = {
        attributes: true
      }
      const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.target === element && mutation.attributeName === 'style' && oldWidth !== element.style.width) {
            oldWidth = element.style.width
            resizeCallback()
          }
        })
      })
      mutationObserver.observe(element, config)
      return mutationObserver
    }
  },

  /* Vue Lifecycle Hooks  */

  created () {
    this.$emit('is-loading', true)

    for (let i = 0; i < this.zones.length; i++) {
      let zone = {
        imageUrl: this.zones[i].imageUrl,
        selected: this.zones[i].selected
      }
      this.localZones.push(zone)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.prepareCanvas()
      this.populateCanvas()

      this.canvas.addEventListener('click', this.canvasClickEventListener)
      this.canvas.addEventListener('touchstart', this.canvasTouchStartEventListener)
      this.canvas.addEventListener('mousemove', this.canvasMouseMoveEventListener)
      this.canvas.addEventListener('mouseenter', this.canvasMouseEnterEventListener)
      this.canvas.addEventListener('mouseleave', this.canvasMouseLeaveEventListener)

      this.observer = this.observeElementResize(this.$el, this.resizeCanvas)
    })
  },

  destroyed () {
    this.canvas.removeEventListener('click', this.canvasClickEventListener)
    this.canvas.removeEventListener('touchstart', this.canvasTouchStartEventListener)
    this.canvas.removeEventListener('mousemove', this.canvasMouseMoveEventListener)
    this.canvas.removeEventListener('mouseenter', this.canvasMouseEnterEventListener)
    this.canvas.removeEventListener('mouseleave', this.canvasMouseLeaveEventListener)

    this.observer.disconnect()
  }
}
</script>

<style lang="scss" scoped>
.click-zone {
  overflow: hidden;
  position: relative;

  &__preloader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
