import Vue from 'vue'
import Vuetify, {
  VApp,
  VAppBar,
  VToolbarTitle,
  VSpacer,
  VBtn,
  VIcon,
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VFlex,
  VLayout,
  VSnackbar,
  VCard,
  VCardTitle,
  VImg,
  VCarousel,
  VCarouselItem,
  VSlider,
  VLazy,
  VRow,
  VProgressCircular,
  VTooltip,
  VMain,
} from 'vuetify/lib'
import {Intersect, Scroll} from 'vuetify/es5/directives'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VIcon,
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VFlex,
    VLayout,
    VSnackbar,
    VCard,
    VCardTitle,
    VImg,
    VCarousel,
    VCarouselItem,
    VSlider,
    VLazy,
    VRow,
    VProgressCircular,
    VTooltip,
    VMain,
  },
  directives: {
    Intersect,
    Scroll
  },
  options: {
    customProperties: true
  },
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: "#2196f3"
      },
      dark: {
        primary: "#2196f3"
      }
    }
  }
})
