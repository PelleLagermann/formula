<template>    
    <div class="snackbar-wrapper" ref="snackbar">
        <div v-if="activeSnackbar" class="snackbar" :class="animCssClass">
            <div class="snackbar__inner">
                <div class="snackbar__icon-wrapper">
                    <i class="snackbar__icon icon-check-small"></i>
                </div>                
                
                <div class="snackbar__content" v-html="activeSnackbar.text"></div>
                
                <div class="snackbar__close-btn-wrapper">
                    <button type="button" class="snackbar__close-btn icon-close" @click="close"></button>
                </div>                
            </div>            
        </div>
    </div>    
</template>

<script>
    const animCssClasses = {
        hidden: 'hide',
        show: 'slide-in',
        close: 'slide-out'
    };

    export default {
		name: 'snackbar',
        props: {            
            'text': {
                type: String,
                required: false
            },
            'open-delay': {
                type: Number,
                required: false,
                default: 0
            },
            'close-delay': {
                type: Number,
                required: false,
                default: 10000
            }
        },
        data() {
            return {                
                animCssClass: animCssClasses.hidden, //Holds the CSS classes for sliding the snackbar in and out. 
                activeSnackbar: null, //The currently shown snackbar
                snackbarStack: [], //Snackbars waiting to be shown - used if .push() is called when a snackbar is already showing
                minSuccessiveOpenDelay: 1000 //Minimum delay between successive snackbars
            }
        },        
        methods: {
            show() {                
                this.animCssClass = animCssClasses.show;
            },
            close() {                
                this.animCssClass = animCssClasses.close;                
            },
            showNextSnackbar() {
                const self = this;
                
                if (this.snackbarStack.length) {                    
                    this.activeSnackbar = this.snackbarStack.shift();
                                        
                    setTimeout(() => {
                        self.show();
                    }, this.activeSnackbar.openDelay);

                    setTimeout(() => {
                        self.close();
                    }, (this.activeSnackbar.openDelay + this.activeSnackbar.closeDelay));
                }                
            },
            push(snackbarSettings) {                
                const snackObj = {};

                if (typeof snackbarSettings === 'string') {                    
                    snackObj.text = snackbarSettings;
                } else if (typeof snackbarSettings === 'object') {                    
                    snackObj.text = snackbarSettings.text;
                }
                
                if (!snackObj.text) {
                    _log.error("A snackbar can't be created without a properly defined 'text' property.\n" + 
                               "'.push()' should be called with either a string or an object with a 'text' property.");
                }                
                                
                let openDelay = snackbarSettings.openDelay ? snackbarSettings.openDelay : this.$props.openDelay;
                //Enforce a minimum delay between successive snackbars
                if (this.activeSnackbar && openDelay < this.minSuccessiveOpenDelay) {
                    openDelay = this.minSuccessiveOpenDelay;
                }
                snackObj.openDelay = openDelay;
                snackObj.closeDelay = snackbarSettings.closeDelay ? snackbarSettings.closeDelay : this.$props.closeDelay;
                                                           
                this.$data.snackbarStack.push(snackObj);
                if (!this.activeSnackbar) {
                    this.showNextSnackbar();
                }
            },
            snackbarCloseHandler() {
                const self = this;
                this.snackbar = null;

                if (this.snackbars.length) {
                    setTimeout(() => {
                        self.snackbar = self.snackbars.shift();
                    }, 1000);
                }
            }
        },
        mounted() {
            const self = this;                     

            //Reset the component after the slide-out animation finishes
            self.$refs['snackbar'].addEventListener("animationend", (evt) => {                
                if (evt.animationName === 'slideOutUp' || evt.animationName === 'slideOutDown') {                    
                    this.animCssClass = animCssClasses.hidden;
                    self.activeSnackbar = null;
                    self.showNextSnackbar();
                }                
            });

            // If init values are set, push snackbar to stack
            if (this.$props.text) {                
                const snackObj = {
                    text: this.$props.text,
                    openDelay: this.$props.openDelay,
                    closeDelay: this.$props.closeDelay                    
                };
                
                this.push(snackObj);
            }
        }
    };
</script>

<style lang="scss">
    @import '../../../../Frontend/scss/generic/_animations';

    .snackbar-wrapper {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
    }

    .snackbar {        
        background-color: $grey200;
        color: $white;
        box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.45);                
        transition: position .3s, width .3s;
        animation-fill-mode: both;

        &__inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        &__icon-wrapper {
            display: flex;            
            justify-content: center;
            align-items: center;
        }

        &__icon {
            display: block;
            border-radius: 50%;
            background-color: $white;
            text-align: center;

            &::before {
                color: $grey200;
            }
        }

        &__content {
            flex: 1;            
        }

        &__close-btn-wrapper {
            align-self: flex-start;
            text-align: center;
        }

        &__close-btn {            
            padding: 0;
            background: transparent;
            border: 0;
            line-height: 1;

            &::before {
                color: $grey800;
                font-size: 2rem;
            }
        }
    
        &.slide-in {            
            animation-timing-function: ease-out;
            animation-duration: .4s;
        }

        &.slide-out {            
            animation-timing-function: ease-in;
            animation-duration: .2s;
        }
    }



    @include mobile {
        .snackbar-wrapper {
            bottom: 0;
        }

        .snackbar {
            width: 70vw;
            min-width: 27rem;
            padding: 2.5rem 0 3rem 0;
            border-radius: 8px 8px 0 0;
            font-size: 1.4rem;
            animation-duration: .2s;
            
            &__icon-wrapper {
                width: 7rem;                
            }

            &__icon {
                width: 3.5rem;
                height: 3.5rem;                

                &::before {
                    font-size: 2.5rem;
                }
            }

            &__close-btn-wrapper {
                width: 4rem;
            }

            &.slide-in {
                @include slideInUp;                 
            }

            &.slide-out {
                @include slideOutDown;                 
            }
        }
    }

    @include tablet-up {
        .snackbar-wrapper {
            top: 0;
        }

        .snackbar {
            border-radius: 0 0 8px 8px;
            background-color: #464a52;
            font-size: 1.6rem;
            
            &__icon-wrapper {
                width: 10rem;
            }

            &__icon {
                width: 4rem;
                height: 4rem;
                line-height: 4rem;

                &::before {
                    font-size: 3rem;
                }
            }

            &__close-btn-wrapper {
                width: 11rem;
            }

            &.slide-in {
                @include slideInDown;                 
            }

            &.slide-out {
                @include slideOutUp;                
            }
        }
    }

    @include tablet {
        .snackbar {
            width: 67rem;
            padding: 2rem 0 3rem 0;            
        }
    }

    @include desktop-up {
        .snackbar {
            width: 78rem;
            padding: 3rem 0 5rem 0;                
        }
    }
</style>