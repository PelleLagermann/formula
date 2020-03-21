<template>
    <transition name="fade">
        <div class="modal-backdrop" v-dom-portal v-show="show">
            <div class="modal-wrapper">
                <button type="button" class="icon icon-close modal__close-button" @click="close"></button>
                <div class="modal" v-click-outside="vcoConfig">
                    <slot name="header">
                        <header class="modal-header">
                            <h1 class="modal-titel">{{title}}</h1>
                        </header>
                    </slot>
                    <section class="modal-body">
                        <slot name="body">
                        </slot>
                    </section>
                    <slot name="footer">
                        <footer class="modal-footer">
                            <div class="modal-footer__content">
                                <span class="modal-footer__text">{{footer}}</span>
                            </div>
                        </footer>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
'use strict'
import _props from '../../../mixins/input-base-props-mixin'

export default {
  name: 'modal',
  mixins: [
    _props
  ],
  props: {
    'title': {
      type: String,
      required: false,
      default: 'Tom titel'
    },
    'footer': {
      type: String,
      required: false,
      default: ''
    },
    'closetext': {
      type: String,
      required: false,
      default: 'Luk'
    },
    'show': {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      vcoConfig: {
        handler: this.close,
        middleware: this.middleware
      }
    }
  },
  methods: {
    close () {
      if (this.show) { this.$emit('close') }
    },
    middleware (event, el) {
      return event.target === this.$el
    }
  }
}
</script>
<style lang="scss" scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba($grey400, .8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal-wrapper {
        position: relative;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        width: 61rem;
        max-width: 90vw;
        max-height: 80vh;
    }

    .modal-header .modal-titel {
        font-size: rem(18);
        margin: rem(15 0 3);
    }

    .modal-header,
    .modal-footer__content {
        display: flex;
    }

    .modal-header {
        border-bottom: 1px solid #eeeeee;
        /*color: #4AAE9B;*/
        /*justify-content: space-between;*/
        justify-content: center;
        align-items: center;
    }

    .modal-body {
        position: relative;
        margin: 2rem 2rem;
        text-align: left;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
    }

    .modal-footer__content {
        justify-content: space-between;
        margin: 2rem 2rem;
    }

    .modal-footer__text {
    }

    .modal__close-button {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(15%, -50%);
        background-color: $white;
        box-shadow: 0 2px 2px rgba(77,77,77,.45);
        height: 5rem;
        font-size: 2.2rem;
        width: 5rem;
        color: $orange;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        border-radius: 50%;
    }

     @include tablet-up {
        .modal-header .modal-titel {
            font-size: rem(22);
        }

        .modal__close-button {

        transform: translate(50%, -50%);

    }

         .modal-body {
        margin: 4rem 4rem;
    }

    .modal-footer__content {
        margin: 2rem 4rem;
    }
    }

</style>
