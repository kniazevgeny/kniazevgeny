<template lang="pug">
nav
  v-app-bar#header(flat, app, :height='windowHeight * heightCoef[mode]')
    v-flex(xs1, md1)
    v-flex(xs3, md2, style='text-align: center')
      //- :style='"width: auto;"',
      svg(
        :style='"width:" + svg_rect_size[mode] + ";height:" + svg_rect_size[mode]',
        width='200',
        height='200',
        viewBox='-50 -50 100 100',
        fill='linear-gradient(to bottom right, orange, orangered)',
        xmlns='http://www.w3.org/2000/svg'
      )
        mask#img-mask
          rect(x='-50', y='-50', height='100px', width='100px', fill='black')
          path(:d='d[mode]', fill='white')
        path(:d='d[mode]', fill='url(#Gradient1)')
        image(
          :href='require("../assets/avatar.png")',
          x='-50px',
          y='-50px',
          height='100px',
          width='100px',
          mask='url(#img-mask)'
        )
        defs
          linearGradient#Gradient1(x1='0', x2='1', y1='0', y2='1')
            stop.stop1(offset='0%')
            stop.stop2(offset='50%')
            stop.stop3(offset='100%')
          filter#blur
            feGaussianBlur(in='SourceGraphic', stdDeviation='0,0')
    v-flex(xs1, md2)
    v-flex(xs6, md5)
      // Title
      v-toolbar-title
        h3 {{ $t("title") }}
      a(v-if='mode <= 1', @click='mode = 2') Show More
      a(v-if='mode == 2', @click='mode = 1') Show Less
      div
        v-spacer
      a a
      div(style='height: 55px')
        a a
      div(style='height: 55px')
        a a
    v-flex(xs1, md2)
      v-btn(text, icon, color='grey', @click='toggleMode')
        v-icon(small) brightness_2
      // Language picker
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(text, icon, color='grey', v-on='on') {{ currentLocale.icon }}
        v-list
          v-list-item(
            v-for='locale in locales',
            @click='changeLanguage(locale.code)',
            :key='locale.code'
          )
            v-list-item-title {{ locale.icon }}
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

  mode = 1 // 1 means meduim, 0 small, 2 expanded

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

  heightCoef = [0.15, 0.3, 0.55]
  d = [
    'M 50 0 L 50.00 0.00 L 50.00 3.15 L 49.97 6.31 L 49.88 9.52 L 49.72 12.77 L 49.44 16.06 L 49.01 19.40 L 48.38 22.76 L 47.50 26.11 L 46.35 29.41 L 44.87 32.60 L 43.06 35.62 L 40.89 38.40 L 38.40 40.89 L 35.62 43.06 L 32.60 44.87 L 29.41 46.35 L 26.11 47.50 L 22.76 48.38 L 19.40 49.01 L 16.06 49.44 L 12.77 49.72 L 9.52 49.88 L 6.31 49.97 L 3.15 50.00 L -0.00 50.00 L -3.15 50.00 L -6.31 49.97 L -9.52 49.88 L -12.77 49.72 L -16.06 49.44 L -19.40 49.01 L -22.76 48.38 L -26.11 47.50 L -29.41 46.35 L -32.60 44.87 L -35.62 43.06 L -38.40 40.89 L -40.89 38.40 L -43.06 35.62 L -44.87 32.60 L -46.35 29.41 L -47.50 26.11 L -48.38 22.76 L -49.01 19.40 L -49.44 16.06 L -49.72 12.77 L -49.88 9.52 L -49.97 6.31 L -50.00 3.15 L -50.00 -0.00 L -50.00 -3.15 L -49.97 -6.31 L -49.88 -9.52 L -49.72 -12.77 L -49.44 -16.06 L -49.01 -19.40 L -48.38 -22.76 L -47.50 -26.11 L -46.35 -29.41 L -44.87 -32.60 L -43.06 -35.62 L -40.89 -38.40 L -38.40 -40.89 L -35.62 -43.06 L -32.60 -44.87 L -29.41 -46.35 L -26.11 -47.50 L -22.76 -48.38 L -19.40 -49.01 L -16.06 -49.44 L -12.77 -49.72 L -9.52 -49.88 L -6.31 -49.97 L -3.15 -50.00 L -0.00 -50.00 L 3.15 -50.00 L 6.31 -49.97 L 9.52 -49.88 L 12.77 -49.72 L 16.06 -49.44 L 19.40 -49.01 L 22.76 -48.38 L 26.11 -47.50 L 29.41 -46.35 L 32.60 -44.87 L 35.62 -43.06 L 38.40 -40.89 L 40.89 -38.40 L 43.06 -35.62 L 44.87 -32.60 L 46.35 -29.41 L 47.50 -26.11 L 48.38 -22.76 L 49.01 -19.40 L 49.44 -16.06 L 49.72 -12.77 L 49.88 -9.52 L 49.97 -6.31 L 50.00 -3.15 L 50.00 -0.00',
    'M 50 0 L 50.00 0.00 L 50.00 3.15 L 50.00 6.32 L 50.00 9.54 L 50.00 12.84 L 49.99 16.24 L 49.97 19.78 L 49.91 23.49 L 49.77 27.36 L 49.48 31.40 L 48.87 35.51 L 47.74 39.49 L 45.83 43.04 L 43.04 45.83 L 39.49 47.74 L 35.51 48.87 L 31.40 49.48 L 27.36 49.77 L 23.49 49.91 L 19.78 49.97 L 16.24 49.99 L 12.84 50.00 L 9.54 50.00 L 6.32 50.00 L 3.15 50.00 L -0.00 50.00 L -3.15 50.00 L -6.32 50.00 L -9.54 50.00 L -12.84 50.00 L -16.24 49.99 L -19.78 49.97 L -23.49 49.91 L -27.36 49.77 L -31.40 49.48 L -35.51 48.87 L -39.49 47.74 L -43.04 45.83 L -45.83 43.04 L -47.74 39.49 L -48.87 35.51 L -49.48 31.40 L -49.77 27.36 L -49.91 23.49 L -49.97 19.78 L -49.99 16.24 L -50.00 12.84 L -50.00 9.54 L -50.00 6.32 L -50.00 3.15 L -50.00 -0.00 L -50.00 -3.15 L -50.00 -6.32 L -50.00 -9.54 L -50.00 -12.84 L -49.99 -16.24 L -49.97 -19.78 L -49.91 -23.49 L -49.77 -27.36 L -49.48 -31.40 L -48.87 -35.51 L -47.74 -39.49 L -45.83 -43.04 L -43.04 -45.83 L -39.49 -47.74 L -35.51 -48.87 L -31.40 -49.48 L -27.36 -49.77 L -23.49 -49.91 L -19.78 -49.97 L -16.24 -49.99 L -12.84 -50.00 L -9.54 -50.00 L -6.32 -50.00 L -3.15 -50.00 L -0.00 -50.00 L 3.15 -50.00 L 6.32 -50.00 L 9.54 -50.00 L 12.84 -50.00 L 16.24 -49.99 L 19.78 -49.97 L 23.49 -49.91 L 27.36 -49.77 L 31.40 -49.48 L 35.51 -48.87 L 39.49 -47.74 L 43.04 -45.83 L 45.83 -43.04 L 47.74 -39.49 L 48.87 -35.51 L 49.48 -31.40 L 49.77 -27.36 L 49.91 -23.49 L 49.97 -19.78 L 49.99 -16.24 L 50.00 -12.84 L 50.00 -9.54 L 50.00 -6.32 L 50.00 -3.15 L 50.00 -0.00',
    'M 50 0 L 50.00 0.00 L 50.00 3.15 L 50.00 6.32 L 50.00 9.54 L 50.00 12.84 L 50.00 16.25 L 50.00 19.80 L 50.00 23.53 L 49.99 27.48 L 49.95 31.70 L 49.80 36.18 L 49.31 40.79 L 47.91 44.99 L 44.99 47.91 L 40.79 49.31 L 36.18 49.80 L 31.70 49.95 L 27.48 49.99 L 23.53 50.00 L 19.80 50.00 L 16.25 50.00 L 12.84 50.00 L 9.54 50.00 L 6.32 50.00 L 3.15 50.00 L -0.00 50.00 L -3.15 50.00 L -6.32 50.00 L -9.54 50.00 L -12.84 50.00 L -16.25 50.00 L -19.80 50.00 L -23.53 50.00 L -27.48 49.99 L -31.70 49.95 L -36.18 49.80 L -40.79 49.31 L -44.99 47.91 L -47.91 44.99 L -49.31 40.79 L -49.80 36.18 L -49.95 31.70 L -49.99 27.48 L -50.00 23.53 L -50.00 19.80 L -50.00 16.25 L -50.00 12.84 L -50.00 9.54 L -50.00 6.32 L -50.00 3.15 L -50.00 -0.00 L -50.00 -3.15 L -50.00 -6.32 L -50.00 -9.54 L -50.00 -12.84 L -50.00 -16.25 L -50.00 -19.80 L -50.00 -23.53 L -49.99 -27.48 L -49.95 -31.70 L -49.80 -36.18 L -49.31 -40.79 L -47.91 -44.99 L -44.99 -47.91 L -40.79 -49.31 L -36.18 -49.80 L -31.70 -49.95 L -27.48 -49.99 L -23.53 -50.00 L -19.80 -50.00 L -16.25 -50.00 L -12.84 -50.00 L -9.54 -50.00 L -6.32 -50.00 L -3.15 -50.00 L -0.00 -50.00 L 3.15 -50.00 L 6.32 -50.00 L 9.54 -50.00 L 12.84 -50.00 L 16.25 -50.00 L 19.80 -50.00 L 23.53 -50.00 L 27.48 -49.99 L 31.70 -49.95 L 36.18 -49.80 L 40.79 -49.31 L 44.99 -47.91 L 47.91 -44.99 L 49.31 -40.79 L 49.80 -36.18 L 49.95 -31.70 L 49.99 -27.48 L 50.00 -23.53 L 50.00 -19.80 L 50.00 -16.25 L 50.00 -12.84 L 50.00 -9.54 L 50.00 -6.32 L 50.00 -3.15 L 50.00 -0.00',
  ]
  // TODO: adapt for mobile
  svg_rect_size = ['75px', '150px', '175px']

  maskPath(eccentricity: number) {
    const halfWidth = 100 / 2.0
    const halfHeight = 100 / 2.0

    const TWO_PI = Math.PI * 2.0
    const resolution = 100

    var d = 'M ' + halfWidth + ' ' + 0

    // wierd math https://observablehq.com/@tomwhite/superellipse-generator
    let prevX = 0
    let prevY = 0
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
      d += ' L ' + (r * cosineTheta).toFixed(2) + ' ' + (r * sineTheta).toFixed(2)
    }
    console.log(eccentricity)
    console.log(d)
    return d
  }

  onScroll() {
    // console.log(window.scrollY)
    if (window.scrollY < 20 && this.mode != 2) {
      this.mode = 1
      // TODO: change gradient
    }
    if (window.scrollY > 130 && this.mode == 1) {
      this.mode = 0
    }
  }

  mounted() {
    // not required, but that's easier to change values
    // this.d[0] = this.maskPath(3)
    // this.d[1] = this.maskPath(6)
    // this.d[2] = this.maskPath(10)

    // set a watcher on scrollY
    window.addEventListener('scroll', this.onScroll, true)

    // mobile layout optimization
    if (window.innerHeight < 600 || window.innerWidth < 600) {
      this.svg_rect_size = ['50px', '85px', '120px']
      this.heightCoef = [0.2, 0.3, 0.85]
    }
  }

  blur_i = 0
  animateBlur(
    svg: SVGSVGElement,
    blurFilter: Element | null | undefined,
    maxBlur: number
  ) {
    // 5 * 100 = 500ms
    window.setTimeout(() => {
      // https://www.desmos.com/calculator/ekaxwdyase
      // let maxBlur = 2.5
      let x = this.blur_i / 100
      let noise = Math.random() / 20
      let coef = 4 + Math.pow(noise, 2)
      let y = -coef * Math.pow(x, 2) + 4 * x - 0.3 // value in (0;1). Max at (0.5; 1)
      let blur = Math.round(maxBlur * y > 0 ? maxBlur * y : 0)
      // https://tympanus.net/codrops/2015/04/08/motion-blur-effect-svg/
      blurFilter?.setAttribute('stdDeviation', blur.toString())
      svg.setAttribute('filter', 'url(#blur)')
      this.blur_i += 1
      if (this.blur_i < 100) this.animateBlur(svg, blurFilter, maxBlur)
    }, 1)
  }

  @Watch('mode')
  onToggleMode(value: number, oldValue: number) {
    // to default values
    let svg = document.getElementsByTagName('svg')[0]
    let blurFilter = document.querySelector('#blur')?.firstElementChild
    this.blur_i = 0

    // let the ratio between prev and next sizes control maxBlur
    let maxBlur =
      parseInt(this.svg_rect_size[value].slice(0, -2)) /
      parseInt(this.svg_rect_size[oldValue].slice(0, -2))
    if (maxBlur < 1) maxBlur = 1 / maxBlur
    this.animateBlur(svg, blurFilter, maxBlur / 1.5)

    // any error will be neutralized
    svg.setAttribute('filter', 'none')
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
  background-color: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(12px) saturate(1.2) !important;
}
header.v-app-bar.v-toolbar.v-sheet.theme--dark#header {
  background-color: rgba(0, 0, 0, 0.65) !important;
  backdrop-filter: blur(12px) saturate(1.2) !important;
}

.stop1 {
  stop-color: rgb(116, 3, 190);
}
.stop2 {
  stop-color: rgb(230, 22, 84);
}
.stop3 {
  stop-color: rgb(255, 123, 0);
}

svg,
path,
nav,
header#header,
.v-toolbar__content,
.transition {
  transition: 0.5s ease-in-out !important;
}

@media screen and (max-width: 600px) {
  svg,
  path,
  nav,
  header#header,
  .v-toolbar__content,
  .transition {
    transition: 0.5s !important;
  }
}

path {
  /* will-change: transform; */
}

#header {
  /* overflow-y: scroll; */
}
</style>
