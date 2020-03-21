<template>
    <div class="flow-section" :class="classList">
        <h2 class="flow-section__header" @click="toggle">
            <span class="flow-section__header-index">
                {{index + 1}}
            </span>

            {{title}}
        </h2>
        <transition name="slide-fade" appear>
          <template v-if="renderWithVShow">
            <div v-show="isOpen" class="flow-section__content">
              <slot></slot>
            </div>
          </template>
          <template v-else>
            <div v-if="isOpen" class="flow-section__content">
                <slot></slot>
            </div>
          </template>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'flow-section',
  props: {
    'cssClass': {
      type: String,
      required: false,
      default: ''
    },
    'title': {
      type: String,
      required: true
    },
    'isValid': {
      type: Boolean,
      required: false,
      default: true
    },
    'disabled': {
      type: Boolean,
      required: false,
      default: false
    },
    'renderWithVShow': {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      flowWrapper: this.$parent,
      index: -1,
      isOpen: false
    }
  },
  computed: {
    classList () {
      let classList = `flow-section--${this._uid}`

      if (this.isOpen) {
        classList += ' is-open'
      }

      if (this.cssClass) {
        classList += ` ${this.cssClass}`
      }
      return classList
    }
  },
  methods:
        {
          toggle () {
            if (!this.disabled) {
              this.flowWrapper.openItem(this)
            }
          },
          open () {
            this.$data.isOpen = true
          },
          close () {
            this.$data.isOpen = false
          },
          nextSection () {
            this.flowWrapper.next()
          },
          setIndex (index) {
            this.$data.index = index
          }
        },
  created () {
    this.setIndex(this.flowWrapper.registerItem(this))

    if (this.$data.index === 0) {
      this.open()
    }
  }
}
</script>

<style lang="scss">
    .flow-section.is-open ~ .flow-section .flow-section__header {
        color: $grey700;
        cursor: default;
    }
</style>

<style lang="scss" scoped>
    .flow-section {
        position: relative;

        &__header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0;
            padding: 2rem 0;
            border-top: 1px solid $grey700;
            color: $grey500;
            cursor: pointer;
            transition: border-color ease 350ms, color ease 350ms;

            .is-open & {
                color: $orange;
                cursor: default;
            }
        }

        &__header-index {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            width: 5rem;
            height: 5rem;
            margin-right: 1.5rem;
            border: 0.2rem solid currentColor;
            border-radius: 50%;
            font-size: 1.6rem;
        }

        &__content {
            padding-bottom: 4rem;
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: .6rem;
            height: 0;
            background-color: $orange;
            transition: height ease 350ms
        }

        &.is-open {
            &::before {
                height: 100%;
            }
        }
    }

    @include mobile {
        .flow-section {
            &::before {
                left: -25px;
            }

            &__header {
                font-size: 1.8rem;
            }
        }
    }

    @include tablet-up {
        .flow-section {
            padding-left: 4rem;

            &__header {
                font-size: 2.2rem;
            }
        }
    }
</style>
