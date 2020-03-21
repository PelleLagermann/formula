<template>
  <div class="card" :class="{ 'has-link': link, 'has-ribbon': ribbonText }">
    <preloader v-if="loading" css="document-list-spinner" />

    <template v-else>
      <conditional-root :show="pageHeader">
        <h1 class="card-page-header">
          <component :is="cardInner" class="card__inner" :href="link">
            <div class="card__header">
              <conditional-root :show="!pageHeader">
                <h2 class="card__title">
                  <div :class="{ 'card__title': pageHeader }">
                    {{title}}
                    <div v-if="ribbonText" class="card__ribbon">
                      <div class="card__ribbon-text">
                        <span class="sr-only">(</span>
                        {{ribbonText}}
                        <span class="sr-only">)</span>
                      </div>
                    </div>
                  </div>
                </h2>
              </conditional-root>
            </div>

            <div class="card__content">
              <div v-html="text"></div>
            </div>

            <div class="card__content-bottom" :class="{ 'has-icon': iconBottom }">
              <i v-if="iconBottom" class="card__content-bottom-icon" :class="iconBottom"></i>
              <span v-if="textBottom">{{textBottom}}</span>
            </div>

            <i v-if="icon" class="card__icon product-icon" :class="'product-icon--' + icon"></i>
          </component>
        </h1>
      </conditional-root>
    </template>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    iconBottom: {
      type: String,
      default: ''
    },
    textBottom: {
      type: String,
      default: ''
    },
    ribbonColor: {
      type: String,
      default: ''
    },
    ribbonText: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    pageHeader: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardInner () {
      return this.$props.link ? 'a' : 'div'
    }
  }
}
</script>

<style lang="scss">
.document-list-spinner {
  margin: 0 auto;
  width: 50px;
  height: 50px;

  svg {
    width: 100%;
  }
}

.card-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.card {
  position: relative;
  display: flex;
  background-color: $grey900;
  color: $grey200;
  text-align: left;
  box-shadow: 0 1px 0 0 $grey800;

  .card-page-header {
    display: flex;
    width: 100%;
    margin: 0;
    font-size: inherit;
  }

  &__inner {
    display: flex;
    width: 100%;
    padding: 2rem;
    flex-direction: column;
    justify-content: flex-start;
    color: inherit;
    transition: background-color 0.3s;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: rem(20);
    word-break: break-word;
    line-height: 1;
  }

  &__content {
    padding-right: 7rem;
    font-size: rem(14);
    line-height: 1.6;
  }

  &__content-bottom {
    display: flex;
    margin-top: auto;
    align-items: center;
    font-size: 1.4rem;

    &-icon {
      margin-right: 1rem;

      &::before {
        color: $grey400;
        font-size: 2.2rem;
      }
    }
  }

  &__icon {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    text-align: center;

    &::before {
      display: block;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background-color: $white;
      font-size: 2.7rem;
      line-height: 5rem;
    }
  }

  &.has-link {
    &:hover,
    &:focus {
      .card__inner {
        background-color: darken($grey900, 10%);
        color: currentColor;
      }
    }

    .card__title {
      color: $orange;
    }
  }
}

@include mobile {
  .card {
    flex-basis: 100%;
    margin-bottom: 3rem;

    &.has-ribbon {
      .card__inner {
        padding-top: 4rem;
      }
    }

    &__ribbon {
      position: absolute;
      top: 0.5rem;
      right: -0.5rem;
      left: -0.5rem;
      background-color: $grey400;
      box-shadow: 0px 4px 5px -3px $grey400;

      &::before,
      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
      }

      &::before {
        left: 0;
        border-width: 0 5px 5px 0;
        border-color: transparent darken($grey400, 20%) transparent transparent;
      }

      &::after {
        right: 0;
        border-width: 5px 5px 0 0;
        border-color: darken($grey400, 20%) transparent transparent transparent;
      }
    }

    &__ribbon-text {
      color: $white;
      font-size: 1.6rem;
      line-height: 2.5rem;
      text-align: center;
    }

    &__content {
      padding-right: 6rem;
      min-height: 4rem;
    }

    &__icon {
      &::before {
        width: 4rem;
        height: 4rem;
        font-size: 2.5rem;
        line-height: 4rem;
      }
    }
  }

  .card--faded-ribbon {
    .card__ribbon {
      background-color: $grey800;

      &::before {
        border-color: transparent darken($grey800, 20%) transparent transparent;
      }

      &::after {
        border-color: darken($grey800, 20%) transparent transparent transparent;
      }
    }

    .card__ribbon-text {
      color: $grey400;
    }
  }

  .card--orange-ribbon {
    .card__ribbon {
      background-color: $orange;

      &::before {
        border-color: transparent darken($orange, 20%) transparent transparent;
      }

      &::after {
        border-color: darken($orange, 20%) transparent transparent transparent;
      }
    }

    .card__ribbon-text {
      color: $white;
    }
  }
}

@include tablet {
  .card-wrapper {
    margin-left: -1.6rem;
    margin-right: -1.6rem;

    .card {
      flex-basis: calc(50% - 3.2rem);
      max-width: calc(50% - 3.2rem);
      margin: 0 1.6rem 3rem 1.6rem;
    }
  }
}

@include tablet-up {
  .card {
    min-height: 16.6rem;

    &__inner {
      min-height: 16.6rem;
    }

    &__header {
      position: relative;
    }

    &__ribbon {
      position: absolute;
      top: -76px;
      right: -34px;
      left: auto;
      width: 0.1rem;
      height: 16rem;
      border: 3.8rem solid transparent;
      border-left: 3.8rem solid $grey400;
      background-color: transparent;
      transform: rotate(-45deg);
      z-index: 1;

      &::before,
      &::after {
        content: "";
        position: absolute;
        border: 0.4rem solid transparent;
        border-right-color: #242629;
      }

      &::before {
        top: -38px;
        left: -46px;
      }

      &::after {
        top: 114px;
        left: -46px;
      }
    }

    &__ribbon-text {
      position: absolute;
      top: 36px;
      left: -99px;
      width: 16rem;
      color: $white;
      font-size: 1.6rem;
      text-align: center;
      transform: rotate(90deg);
    }
  }

  .card--faded-ribbon {
    .card__ribbon {
      border-left-color: $grey800;

      &::before,
      &::after {
        border-right-color: darken($grey800, 20%);
      }
    }

    .card__ribbon-text {
      color: $grey400;
    }
  }

  .card--orange-ribbon {
    .card__ribbon {
      border-left-color: $orange;

      &::before,
      &::after {
        border-right-color: darken($orange, 20%);
      }
    }

    .card__ribbon-text {
      color: $white;
    }
  }
}

@include desktop-up {
  .card-wrapper {
    margin-left: -1.2rem;
    margin-right: -1.2rem;

    .card {
      flex-basis: calc(33% - 2.4rem);
      max-width: calc(33% - 2.4rem);
      margin: 0 1.2rem 2rem 1.2rem;
    }
  }
}
</style>
