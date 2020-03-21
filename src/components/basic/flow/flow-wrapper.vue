<template>
    <div class="flow-wrapper" :class="cssClass">
        <slot></slot>
    </div>
</template>

<script>
const _deviceDetection = require('../../../mixins/device-detection-mixin')
var VueScrollTo = require('vue-scrollto')

export default {
  name: 'flow-wrapper',
  mixins: [_deviceDetection],
  props: {
    'cssClass': {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      initialized: false,
      items: []
    }
  },
  computed: {
    activeItem () {
      return this.$data.items.reduce(
        function (activeItem, item, index) {
          if (item.isOpen) {
            activeItem = item
          }
          return activeItem
        }, null)
    }
  },
  methods:
        {
          registerItem (item) {
            if (this.$data.items.length === 0) {
              this.$data.initialized = true
              this.$emit('initialized', item)
            }

            this.$data.items.push(item)
            return this.$data.items.length - 1
          },
          openItem (item, options) {
            let config = {
              emitEvent: true
            }
            config = Object.assign(config, options)

            let allowNavigation = false
            if (item.index === 0) { allowNavigation = true } // We always allow navigation to first item
            if (this.activeItem && item.index < this.activeItem.index) { allowNavigation = true } // We always allow navigating to previous steps
            if (config.itemIsNextStep) { allowNavigation = true } // If Item is next step, navigation is allowed. Validation has to be performed in controller implementing flow-wrapper

            if (allowNavigation) {
              this.closeActiveItem()

              item.open()

              if (this.$data.initialized) {
                this.scrollToActiveItem()
              }

              if (config.emitEvent) {
                this.$emit('open-item', item)
              }
            }
          },
          closeActiveItem () {
            if (this.activeItem) {
              this.activeItem.close()
            }
          },
          sortItems () {
            let sortedItems = []

            this.$slots.default.forEach((component) => {
              const componentName = ((component.componentInstance || {}).$options || {})._componentTag
              const componentId = (component.componentInstance || {})._uid

              if (componentName === 'flow-section') {
                this.$data.items.forEach((item) => {
                  if (item._uid === componentId) {
                    sortedItems.push(item)
                  }
                })
              }
            })

            this.$data.items = sortedItems

            for (let i = 0; i < this.$data.items.length; i++) {
              this.$data.items[i].setIndex(i)
            }
          },
          next () {
            const newIndex = this.activeItem.index + 1
            if (this.activeItem && newIndex < this.items.length) {
              this.openItem(this.items[newIndex], { itemIsNextStep: true })
            }
          },
          prev () {
            const newIndex = this.activeItem.index - 1
            if (this.activeItem && newIndex >= 0) {
              this.openItem(this.items[newIndex])
            }
          },
          scrollToActiveItem () {
            const self = this
            const offset = this.isMobile ? -40 : -101

            setTimeout(function () {
              var options = {
                container: 'body',
                easing: 'ease-in',
                offset: offset,
                cancelable: true,
                onStart: function (element) { },
                onDone: function (element) { },
                onCancel: function () { },
                x: false,
                y: true
              }

              VueScrollTo.scrollTo(`.flow-section--${self.activeItem._uid}`, 250, options)
            }, 500)
          }
        },
  updated () {
    this.sortItems()
  }
}
</script>

<style lang="scss" scoped>
    @include mobile {

    }

    @include tablet-up {

    }
</style>
