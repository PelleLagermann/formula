<template>
  <aside :class="'preloader' + (full ? ' full' : '') + (fixed ? ' fixed' : '') + (visible ? ' show' : '') + (css ? ' ' + css : '')">
    <svg class="loading" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="77.1 177.6 454.7 454.6" enable-background="new 77.1 177.6 454.7 454.6" xml:space="preserve">
      <path class="loading__path loading__path--1" fill="rgb(94,97,103)" d="M323.7,272.5c0,0,7.7-50.7,8.3-67.2l0,0c0-15.4-12.7-27.6-27.6-27.6c-15.4,0-27.6,12.1-27.6,27.6l0,0c0.6,17.1,8.3,67.8,8.3,67.8l13.8,82.7c0.6,2.8,3.3,5,5.5,5c2.8,0,5-1.7,5.5-5L323.7,272.5z"></path>
      <path class="loading__path loading__path--2" fill="rgb(94,97,103)" d="M411.8,324.8c0,0,41.3-30.4,53.4-41.6l0,0c10.9-10.9,10.5-28.5,0-39c-10.9-10.9-28.1-11-39,0l0,0c-11.7,12.5-42.1,53.8-42.1,53.8l-48.7,68.2c-1.6,2.4-1.2,5.9,0.4,7.4c2,2,4.7,2.3,7.4,0.4L411.8,324.8z"></path>
      <path class="loading__path loading__path--3" fill="rgb(94,97,103)" d="M437,424.2c0,0,50.7,7.7,67.2,8.3l0,0c15.4,0,27.6-12.7,27.6-27.6c0-15.4-12.1-27.6-27.6-27.6l0,0c-17.1,0.6-67.8,8.3-67.8,8.3l-82.7,13.8c-2.8,0.6-5,3.3-5,5.5c0,2.8,1.7,5,5,5.5L437,424.2z"></path>
      <path class="loading__path loading__path--4" fill="rgb(94,97,103)" d="M384.5,512.3c0,0,30.4,41.3,41.6,53.4l0,0c10.9,10.9,28.5,10.5,39,0c10.9-10.9,11-28.1,0-39l0,0c-12.5-11.7-53.8-42.1-53.8-42.1l-68.2-48.7c-2.4-1.6-5.9-1.2-7.4,0.4c-2,2-2.3,4.7-0.4,7.4L384.5,512.3z"></path>
      <path class="loading__path loading__path--5" fill="rgb(94,97,103)" d="M285.1,537.4c0,0-7.7,50.7-8.3,67.2l0,0c0,15.4,12.7,27.6,27.6,27.6c15.4,0,27.6-12.1,27.6-27.6l0,0c-0.6-17.1-8.3-67.8-8.3-67.8l-13.8-82.7c-0.6-2.8-3.3-5-5.5-5c-2.8,0-5,1.7-5.5,5L285.1,537.4z"></path>
      <path class="loading__path loading__path--6" fill="rgb(94,97,103)" d="M197.1,485c0,0-41.3,30.4-53.4,41.6l0,0c-10.9,10.9-10.5,28.5,0,39c10.9,10.9,28.1,11,39,0l0,0c11.7-12.5,42.1-53.8,42.1-53.8l48.7-68.2c1.6-2.4,1.2-5.9-0.4-7.4c-2-2-4.7-2.3-7.4-0.4L197.1,485z"></path>
      <path class="loading__path loading__path--7" fill="rgb(94,97,103)" d="M171.9,385.6c0,0-50.7-7.7-67.2-8.3l0,0c-15.4,0-27.6,12.7-27.6,27.6c0,15.4,12.1,27.6,27.6,27.6l0,0c17.1-0.6,67.8-8.3,67.8-8.3l82.7-13.8c2.8-0.6,5-3.3,5-5.5c0-2.8-1.7-5-5-5.5L171.9,385.6z"></path>
      <path class="loading__path loading__path--8" fill="rgb(94,97,103)" d="M224.4,297.5c0,0-30.4-41.3-41.6-53.4l0,0c-10.9-10.9-28.5-10.5-39,0c-10.9,10.9-11,28.1,0,39l0,0c12.5,11.7,53.8,42.1,53.8,42.1l68.2,48.7c2.4,1.6,5.9,1.2,7.4-0.4c2-2,2.3-4.7,0.4-7.4L224.4,297.5z"></path>
      <path class="circle" fill="rgb(255,88,0)" d="M332,404.8c0,15.4-12.7,27.6-27.6,27.6c-15.4,0-27.6-12.7-27.6-27.6c0-15.4,12.7-27.6,27.6-27.6S332,389.8,332,404.8"></path>
    </svg>
    <slot />
  </aside>
</template>

<script>
export default {

  name: 'preloader',

  props: {
    'css': {
      type: String,
      required: false,
      default: ''
    },
    'full': {
      type: Boolean,
      required: false,
      default: false
    },
    'fixed': {
      type: Boolean,
      required: false,
      default: false
    },
    'visible': {
      type: Boolean,
      required: false,
      default: true
    }
  }

}
</script>

<style lang="scss" scoped>
  .preloader {
      &--small {
          .loading {
              width: 2rem;
          }
      }

      &--medium {
          .loading {
              width: 4rem;
          }
      }

      &--large {
          .loading {
              width: 6rem;
          }
      }

      &--white {
          path {
              fill: #fff;
          }
      }

      &--btn-spinner {
          display: inline-block !important;
          margin-left: 1rem;
          top: 5px;
      }
  }

  .package-selection .preloader.full.fixed {
      position: absolute;
  }
</style>
