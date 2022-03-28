<template lang="pug">
nav(v-scroll='')
  v-app-bar#header(
    flat,
    height='max-content',
    :style='isMobile ? "flex-direction:" : ""'
  ) 
    v-layout(column)
      v-row.pl-4.pr-4.mt-4
        v-flex.d-flex(style='justify-content: flex-end')
          // Language picker
          v-menu(offset-y)
            template(v-slot:activator='{ on }')
              v-btn(text, icon, color='var(--accent-color)', v-on='on') {{ currentLocale.icon }}
            v-list
              v-list-item(
                v-for='locale in locales',
                @click='changeLanguage(locale.code)',
                :key='locale.code'
              )
                v-list-item-title {{ locale.icon }}
          v-btn(text, icon, color='var(--accent-color)', @click='toggleMode')
            v-icon(small) brightness_2
      
      v-row()
        v-flex(xs1, sm1, md2)
        v-layout(column, style='flex: 1.5 1; justify-content: center;')
          svg(
            viewBox='-50 -50 100 100',
            xmlns='http://www.w3.org/2000/svg'
          )
            mask#img-mask
              rect(x='-50', y='-50', height='100px', width='100px', fill='black')
              path(:d='d[svg_path]', fill='white', :key='gradient_key')
            path(:d='d[svg_path]', fill='url(#Gradient1)', :key='gradient_key')
            image(
              :href='require("../assets/avatar.webp")',
              x='-50px',
              y='-50px',
              height='100px',
              width='100px',
              mask='url(#img-mask)'
            )
            defs
              linearGradient#Gradient1(x1='0', x2='1', y1='0', y2='1')
                stop(
                  v-for='(offset, o) in gradient_offsets',
                  :key='o',
                  :class='"stop" + (o + 1)',
                  :offset='offset + "%"'
                )
        v-flex(xs1)
        v-layout.ml-n3(column, :style="'justify-content: center; flex: ' + (isMobile ? '2.5' : '3.5')")
          h1.h.grad-accent(style='font-size: 2.5rem; line-height: 2.5rem;') {{ $t("title") }}
          div.mt-4
            a(href='https://t.me/kniazevgeny')
              img(src='@/assets/telegram.svg')
            a.pl-4(href='https://github.com/kniazevgeny')
              img(src='@/assets/github.svg')
            a.pl-4(href='https://linkedin.com/in/kniazevgeny')
              img(src='@/assets/linkedin.svg')
            a.pl-4(href='mailto:eugene.kniazev@gmial.com')
              img(src='@/assets/email.svg')
        v-flex(xs1, sm1, md2)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { i18n } from '@/plugins/i18n'
import * as api from '@/utils/api'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Navbar extends Vue {
  @AppStore.State dark!: boolean

  @AppStore.Mutation setDark!: (dark: boolean) => void
  @AppStore.Mutation setLanguage!: (language: string) => void

  svg_path = 2 // 1 means meduim, 0 small, 2 expanded
  mode = 2 // 1 means meduim, 0 small, 2 expanded

  get locales() {
    return [
      { icon: '🇺🇸', code: 'en' },
      { icon: '🇷🇺', code: 'ru' },
    ]
  }
  get currentLocale() {
    for (const locale of this.locales) {
      if (locale.code === i18n.locale) {
        return locale
      }
    }
  }

  get isMobile() {
    // return true
    // obsolete & lagging
    return window.innerWidth <= 800 && window.innerHeight <= 900
  }

  get windowHeight() {
    return window.innerHeight
  }

  toggleMode() {
    this.setDark(!this.dark)
    ;(this.$vuetify.theme as any).dark = this.dark
  }
  changeLanguage(locale: string) {
    i18n.locale = locale
    this.setLanguage(locale)
    document.title = i18n.t('strippedTitle') as string
  }

  d = [
    'M 50 0 L 50.0 0.0 L 50.0 3.1 L 50.0 6.3 L 49.9 9.5 L 49.7 12.8 L 49.4 16.1 L 49.0 19.4 L 48.4 22.8 L 47.5 26.1 L 46.3 29.4 L 44.9 32.6 L 43.1 35.6 L 40.9 38.4 L 38.4 40.9 L 35.6 43.1 L 32.6 44.9 L 29.4 46.3 L 26.1 47.5 L 22.8 48.4 L 19.4 49.0 L 16.1 49.4 L 12.8 49.7 L 9.5 49.9 L 6.3 50.0 L 3.1 50.0 L -0.0 50.0 L -3.1 50.0 L -6.3 50.0 L -9.5 49.9 L -12.8 49.7 L -16.1 49.4 L -19.4 49.0 L -22.8 48.4 L -26.1 47.5 L -29.4 46.3 L -32.6 44.9 L -35.6 43.1 L -38.4 40.9 L -40.9 38.4 L -43.1 35.6 L -44.9 32.6 L -46.3 29.4 L -47.5 26.1 L -48.4 22.8 L -49.0 19.4 L -49.4 16.1 L -49.7 12.8 L -49.9 9.5 L -50.0 6.3 L -50.0 3.1 L -50.0 -0.0 L -50.0 -3.1 L -50.0 -6.3 L -49.9 -9.5 L -49.7 -12.8 L -49.4 -16.1 L -49.0 -19.4 L -48.4 -22.8 L -47.5 -26.1 L -46.3 -29.4 L -44.9 -32.6 L -43.1 -35.6 L -40.9 -38.4 L -38.4 -40.9 L -35.6 -43.1 L -32.6 -44.9 L -29.4 -46.3 L -26.1 -47.5 L -22.8 -48.4 L -19.4 -49.0 L -16.1 -49.4 L -12.8 -49.7 L -9.5 -49.9 L -6.3 -50.0 L -3.1 -50.0 L -0.0 -50.0 L 3.1 -50.0 L 6.3 -50.0 L 9.5 -49.9 L 12.8 -49.7 L 16.1 -49.4 L 19.4 -49.0 L 22.8 -48.4 L 26.1 -47.5 L 29.4 -46.3 L 32.6 -44.9 L 35.6 -43.1 L 38.4 -40.9 L 40.9 -38.4 L 43.1 -35.6 L 44.9 -32.6 L 46.3 -29.4 L 47.5 -26.1 L 48.4 -22.8 L 49.0 -19.4 L 49.4 -16.1 L 49.7 -12.8 L 49.9 -9.5 L 50.0 -6.3 L 50.0 -3.1 L 50.0 -0.0',
    'M 50 0 L 50.0 0.0 L 50.0 3.1 L 50.0 6.3 L 50.0 9.5 L 50.0 12.8 L 50.0 16.2 L 50.0 19.8 L 49.9 23.5 L 49.8 27.4 L 49.5 31.4 L 48.9 35.5 L 47.7 39.5 L 45.8 43.0 L 43.0 45.8 L 39.5 47.7 L 35.5 48.9 L 31.4 49.5 L 27.4 49.8 L 23.5 49.9 L 19.8 50.0 L 16.2 50.0 L 12.8 50.0 L 9.5 50.0 L 6.3 50.0 L 3.1 50.0 L -0.0 50.0 L -3.1 50.0 L -6.3 50.0 L -9.5 50.0 L -12.8 50.0 L -16.2 50.0 L -19.8 50.0 L -23.5 49.9 L -27.4 49.8 L -31.4 49.5 L -35.5 48.9 L -39.5 47.7 L -43.0 45.8 L -45.8 43.0 L -47.7 39.5 L -48.9 35.5 L -49.5 31.4 L -49.8 27.4 L -49.9 23.5 L -50.0 19.8 L -50.0 16.2 L -50.0 12.8 L -50.0 9.5 L -50.0 6.3 L -50.0 3.1 L -50.0 -0.0 L -50.0 -3.1 L -50.0 -6.3 L -50.0 -9.5 L -50.0 -12.8 L -50.0 -16.2 L -50.0 -19.8 L -49.9 -23.5 L -49.8 -27.4 L -49.5 -31.4 L -48.9 -35.5 L -47.7 -39.5 L -45.8 -43.0 L -43.0 -45.8 L -39.5 -47.7 L -35.5 -48.9 L -31.4 -49.5 L -27.4 -49.8 L -23.5 -49.9 L -19.8 -50.0 L -16.2 -50.0 L -12.8 -50.0 L -9.5 -50.0 L -6.3 -50.0 L -3.1 -50.0 L -0.0 -50.0 L 3.1 -50.0 L 6.3 -50.0 L 9.5 -50.0 L 12.8 -50.0 L 16.2 -50.0 L 19.8 -50.0 L 23.5 -49.9 L 27.4 -49.8 L 31.4 -49.5 L 35.5 -48.9 L 39.5 -47.7 L 43.0 -45.8 L 45.8 -43.0 L 47.7 -39.5 L 48.9 -35.5 L 49.5 -31.4 L 49.8 -27.4 L 49.9 -23.5 L 50.0 -19.8 L 50.0 -16.2 L 50.0 -12.8 L 50.0 -9.5 L 50.0 -6.3 L 50.0 -3.1 L 50.0 -0.0',
    'M 50 0 L 50.0 0.0 L 50.0 3.1 L 50.0 6.3 L 50.0 9.5 L 50.0 12.8 L 50.0 16.2 L 50.0 19.8 L 50.0 23.5 L 50.0 27.5 L 49.9 31.7 L 49.8 36.2 L 49.3 40.8 L 47.9 45.0 L 45.0 47.9 L 40.8 49.3 L 36.2 49.8 L 31.7 49.9 L 27.5 50.0 L 23.5 50.0 L 19.8 50.0 L 16.2 50.0 L 12.8 50.0 L 9.5 50.0 L 6.3 50.0 L 3.1 50.0 L -0.0 50.0 L -3.1 50.0 L -6.3 50.0 L -9.5 50.0 L -12.8 50.0 L -16.2 50.0 L -19.8 50.0 L -23.5 50.0 L -27.5 50.0 L -31.7 49.9 L -36.2 49.8 L -40.8 49.3 L -45.0 47.9 L -47.9 45.0 L -49.3 40.8 L -49.8 36.2 L -49.9 31.7 L -50.0 27.5 L -50.0 23.5 L -50.0 19.8 L -50.0 16.2 L -50.0 12.8 L -50.0 9.5 L -50.0 6.3 L -50.0 3.1 L -50.0 -0.0 L -50.0 -3.1 L -50.0 -6.3 L -50.0 -9.5 L -50.0 -12.8 L -50.0 -16.2 L -50.0 -19.8 L -50.0 -23.5 L -50.0 -27.5 L -49.9 -31.7 L -49.8 -36.2 L -49.3 -40.8 L -47.9 -45.0 L -45.0 -47.9 L -40.8 -49.3 L -36.2 -49.8 L -31.7 -49.9 L -27.5 -50.0 L -23.5 -50.0 L -19.8 -50.0 L -16.2 -50.0 L -12.8 -50.0 L -9.5 -50.0 L -6.3 -50.0 L -3.1 -50.0 L -0.0 -50.0 L 3.1 -50.0 L 6.3 -50.0 L 9.5 -50.0 L 12.8 -50.0 L 16.2 -50.0 L 19.8 -50.0 L 23.5 -50.0 L 27.5 -50.0 L 31.7 -49.9 L 36.2 -49.8 L 40.8 -49.3 L 45.0 -47.9 L 47.9 -45.0 L 49.3 -40.8 L 49.8 -36.2 L 49.9 -31.7 L 50.0 -27.5 L 50.0 -23.5 L 50.0 -19.8 L 50.0 -16.2 L 50.0 -12.8 L 50.0 -9.5 L 50.0 -6.3 L 50.0 -3.1 L 50.0 -0.0',
  ]
  gradient_offsets = [0, 100, 100, 150, 200, 250, 300, 350]
  gradient_key = 0

  maskPath(eccentricity: number) {
    const halfWidth = 100 / 2.0
    const halfHeight = 100 / 2.0

    const TWO_PI = Math.PI * 2.0
    const resolution = 100

    var d = 'M ' + halfWidth + ' ' + 0

    // wierd math https://observablehq.com/@tomwhite/superellipse-generator
    for (var theta = 0.0; theta < TWO_PI; theta += TWO_PI / resolution) {
      var sineTheta = Math.sin(theta)
      var cosineTheta = Math.cos(theta)
      var r = Math.pow(
        1 /
          (Math.pow(Math.abs(cosineTheta) / halfWidth, eccentricity) +
            Math.pow(Math.abs(sineTheta) / halfHeight, eccentricity)),
        1 / eccentricity
      )
      // toFixed() optimizes performance significantly
      d +=
        ' L ' + (r * cosineTheta).toFixed(1) + ' ' + (r * sineTheta).toFixed(1)
    }
    // console.log(eccentricity)
    // console.log(d)
    return d
  }

  mounted() {
    // not required, but that's easier to change values
    // if (this.isMobile) this.d[0] = this.maskPath(2.5)
    // this.d[0] = this.maskPath(3)
    // this.d[1] = this.maskPath(6)
    // this.d[2] = this.maskPath(10)
    window.setTimeout(()=>{this.svg_path = 0}, 560)

    // set a watcher on scrollY
    // window.addEventListener('scroll', this.onScroll, true)

    // animate gradient
    // this.changeGradientOffsets()
  }

}
</script>

<style>
nav a:link {
  text-decoration: none;
}

nav a:visited {
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

nav a:active {
  text-decoration: underline;
}

header.v-app-bar.v-toolbar.v-sheet#header {
  background-color: transparent;
  backdrop-filter: none;
}
header.v-app-bar.v-toolbar.v-sheet.blurry#header {
  background-color: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: saturate(1.2) blur(12px);
}
header.v-app-bar.v-toolbar.v-sheet.theme--dark#header {
  background-color: transparent;
  backdrop-filter: none;
}
header.v-app-bar.v-toolbar.v-sheet.blurry.theme--dark#header {
  background-color: rgba(0, 0, 0, 0.65) !important;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: saturate(1.2) blur(12px);
}

.stop1 {
  stop-color: var(--gradient-from);
}
.stop2 {
  stop-color: var(--gradient-to);
}

svg,
path,
header#header,
.v-toolbar__content,
.transition,
.stop1,
.stop2 {
  transition: 0.85s cubic-bezier(0.52, 0.06, 0.45, 1.03) !important;
}
</style>
