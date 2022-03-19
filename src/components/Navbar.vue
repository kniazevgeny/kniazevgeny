<template lang="pug">
nav
  v-app-bar#header(
    flat,
    app,
    :height='windowHeight * heightCoef[isMobile ? (mode!=1 ? mode : 0) : mode]',
  )
    v-flex(xs1, md1)
    v-flex(xs3, md2, style='text-align: center')
      //- :style='"width: auto;"',
      svg(
        :style='"width:" + svg_rect_size[isMobile ? (mode!=1 ? mode : 0) : mode] + ";height:" + svg_rect_size[isMobile ? (mode!=1 ? mode : 0) : mode]',
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
      a(v-if='mode == 2', @click='mode = prevMode') Show Less
      div
        v-spacer
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

  get isMobile() {
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

  setNavPadding() {
    let nav = document.getElementsByTagName('nav')[0].style
    nav.paddingBottom = '100px'
  }

  setHeaderFilters() {
    let header = document.getElementById('header')
    if (this.isMobile) {header?.classList.add('blurry'); return}

    if (!this.mode || this.mode == 2) window.setTimeout(()=>{header?.classList.add('blurry')}, 450)
    else header?.classList.remove('blurry')
  }

  heightCoef = [0.15, 0.35, 0.55]
  d = [
    'M 50 0 L 50.0 0.0 L 50.0 3.1 L 50.0 6.3 L 49.9 9.5 L 49.7 12.8 L 49.4 16.1 L 49.0 19.4 L 48.4 22.8 L 47.5 26.1 L 46.3 29.4 L 44.9 32.6 L 43.1 35.6 L 40.9 38.4 L 38.4 40.9 L 35.6 43.1 L 32.6 44.9 L 29.4 46.3 L 26.1 47.5 L 22.8 48.4 L 19.4 49.0 L 16.1 49.4 L 12.8 49.7 L 9.5 49.9 L 6.3 50.0 L 3.1 50.0 L -0.0 50.0 L -3.1 50.0 L -6.3 50.0 L -9.5 49.9 L -12.8 49.7 L -16.1 49.4 L -19.4 49.0 L -22.8 48.4 L -26.1 47.5 L -29.4 46.3 L -32.6 44.9 L -35.6 43.1 L -38.4 40.9 L -40.9 38.4 L -43.1 35.6 L -44.9 32.6 L -46.3 29.4 L -47.5 26.1 L -48.4 22.8 L -49.0 19.4 L -49.4 16.1 L -49.7 12.8 L -49.9 9.5 L -50.0 6.3 L -50.0 3.1 L -50.0 -0.0 L -50.0 -3.1 L -50.0 -6.3 L -49.9 -9.5 L -49.7 -12.8 L -49.4 -16.1 L -49.0 -19.4 L -48.4 -22.8 L -47.5 -26.1 L -46.3 -29.4 L -44.9 -32.6 L -43.1 -35.6 L -40.9 -38.4 L -38.4 -40.9 L -35.6 -43.1 L -32.6 -44.9 L -29.4 -46.3 L -26.1 -47.5 L -22.8 -48.4 L -19.4 -49.0 L -16.1 -49.4 L -12.8 -49.7 L -9.5 -49.9 L -6.3 -50.0 L -3.1 -50.0 L -0.0 -50.0 L 3.1 -50.0 L 6.3 -50.0 L 9.5 -49.9 L 12.8 -49.7 L 16.1 -49.4 L 19.4 -49.0 L 22.8 -48.4 L 26.1 -47.5 L 29.4 -46.3 L 32.6 -44.9 L 35.6 -43.1 L 38.4 -40.9 L 40.9 -38.4 L 43.1 -35.6 L 44.9 -32.6 L 46.3 -29.4 L 47.5 -26.1 L 48.4 -22.8 L 49.0 -19.4 L 49.4 -16.1 L 49.7 -12.8 L 49.9 -9.5 L 50.0 -6.3 L 50.0 -3.1 L 50.0 -0.0',
    'M 50 0 L 50.0 0.0 L 50.0 3.1 L 50.0 6.3 L 50.0 9.5 L 50.0 12.8 L 50.0 16.2 L 50.0 19.8 L 49.9 23.5 L 49.8 27.4 L 49.5 31.4 L 48.9 35.5 L 47.7 39.5 L 45.8 43.0 L 43.0 45.8 L 39.5 47.7 L 35.5 48.9 L 31.4 49.5 L 27.4 49.8 L 23.5 49.9 L 19.8 50.0 L 16.2 50.0 L 12.8 50.0 L 9.5 50.0 L 6.3 50.0 L 3.1 50.0 L -0.0 50.0 L -3.1 50.0 L -6.3 50.0 L -9.5 50.0 L -12.8 50.0 L -16.2 50.0 L -19.8 50.0 L -23.5 49.9 L -27.4 49.8 L -31.4 49.5 L -35.5 48.9 L -39.5 47.7 L -43.0 45.8 L -45.8 43.0 L -47.7 39.5 L -48.9 35.5 L -49.5 31.4 L -49.8 27.4 L -49.9 23.5 L -50.0 19.8 L -50.0 16.2 L -50.0 12.8 L -50.0 9.5 L -50.0 6.3 L -50.0 3.1 L -50.0 -0.0 L -50.0 -3.1 L -50.0 -6.3 L -50.0 -9.5 L -50.0 -12.8 L -50.0 -16.2 L -50.0 -19.8 L -49.9 -23.5 L -49.8 -27.4 L -49.5 -31.4 L -48.9 -35.5 L -47.7 -39.5 L -45.8 -43.0 L -43.0 -45.8 L -39.5 -47.7 L -35.5 -48.9 L -31.4 -49.5 L -27.4 -49.8 L -23.5 -49.9 L -19.8 -50.0 L -16.2 -50.0 L -12.8 -50.0 L -9.5 -50.0 L -6.3 -50.0 L -3.1 -50.0 L -0.0 -50.0 L 3.1 -50.0 L 6.3 -50.0 L 9.5 -50.0 L 12.8 -50.0 L 16.2 -50.0 L 19.8 -50.0 L 23.5 -49.9 L 27.4 -49.8 L 31.4 -49.5 L 35.5 -48.9 L 39.5 -47.7 L 43.0 -45.8 L 45.8 -43.0 L 47.7 -39.5 L 48.9 -35.5 L 49.5 -31.4 L 49.8 -27.4 L 49.9 -23.5 L 50.0 -19.8 L 50.0 -16.2 L 50.0 -12.8 L 50.0 -9.5 L 50.0 -6.3 L 50.0 -3.1 L 50.0 -0.0',
    'M 50 0 L 50.0 0.0 L 50.0 3.1 L 50.0 6.3 L 50.0 9.5 L 50.0 12.8 L 50.0 16.2 L 50.0 19.8 L 50.0 23.5 L 50.0 27.5 L 49.9 31.7 L 49.8 36.2 L 49.3 40.8 L 47.9 45.0 L 45.0 47.9 L 40.8 49.3 L 36.2 49.8 L 31.7 49.9 L 27.5 50.0 L 23.5 50.0 L 19.8 50.0 L 16.2 50.0 L 12.8 50.0 L 9.5 50.0 L 6.3 50.0 L 3.1 50.0 L -0.0 50.0 L -3.1 50.0 L -6.3 50.0 L -9.5 50.0 L -12.8 50.0 L -16.2 50.0 L -19.8 50.0 L -23.5 50.0 L -27.5 50.0 L -31.7 49.9 L -36.2 49.8 L -40.8 49.3 L -45.0 47.9 L -47.9 45.0 L -49.3 40.8 L -49.8 36.2 L -49.9 31.7 L -50.0 27.5 L -50.0 23.5 L -50.0 19.8 L -50.0 16.2 L -50.0 12.8 L -50.0 9.5 L -50.0 6.3 L -50.0 3.1 L -50.0 -0.0 L -50.0 -3.1 L -50.0 -6.3 L -50.0 -9.5 L -50.0 -12.8 L -50.0 -16.2 L -50.0 -19.8 L -50.0 -23.5 L -50.0 -27.5 L -49.9 -31.7 L -49.8 -36.2 L -49.3 -40.8 L -47.9 -45.0 L -45.0 -47.9 L -40.8 -49.3 L -36.2 -49.8 L -31.7 -49.9 L -27.5 -50.0 L -23.5 -50.0 L -19.8 -50.0 L -16.2 -50.0 L -12.8 -50.0 L -9.5 -50.0 L -6.3 -50.0 L -3.1 -50.0 L -0.0 -50.0 L 3.1 -50.0 L 6.3 -50.0 L 9.5 -50.0 L 12.8 -50.0 L 16.2 -50.0 L 19.8 -50.0 L 23.5 -50.0 L 27.5 -50.0 L 31.7 -49.9 L 36.2 -49.8 L 40.8 -49.3 L 45.0 -47.9 L 47.9 -45.0 L 49.3 -40.8 L 49.8 -36.2 L 49.9 -31.7 L 50.0 -27.5 L 50.0 -23.5 L 50.0 -19.8 L 50.0 -16.2 L 50.0 -12.8 L 50.0 -9.5 L 50.0 -6.3 L 50.0 -3.1 L 50.0 -0.0',
  ]
  // TODO: adapt for mobile
  svg_rect_size = ['75px', '120px', '175px']

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

  onScroll() {
    // console.log(window.scrollY)
    if (window.scrollY < 45 && this.mode != 2) {
      this.mode = 1
      // TODO: change gradient
    }
    if (window.scrollY > 100 && this.mode == 1) {
      this.mode = 0
    }
  }

  mounted() {
    // not required, but that's easier to change values
    if (this.isMobile) this.d[0] = this.maskPath(2.5)
    // this.d[0] = this.maskPath(3)
    // this.d[1] = this.maskPath(6)
    // this.d[2] = this.maskPath(10)

    // set a watcher on scrollY
    window.addEventListener('scroll', this.onScroll, true)

    // mobile layout optimization
    if (window.innerHeight < 800 || window.innerWidth < 700) {
      this.svg_rect_size = ['75px', '85px', '120px']
      this.heightCoef = [0.15, 0.3, 0.85]
    }

    this.setNavPadding()
  }

  blur_i = 0
  animateBlur(
    svg: SVGSVGElement,
    blurFilter: Element | null | undefined,
    maxBlur: number
  ) {
    window.setTimeout(() => {
      // https://www.desmos.com/calculator/ekaxwdyase
      // let maxBlur = 2.5
      let x = this.blur_i / 100
      let noise = Math.random() / 20
      let coef = 5 + Math.pow(noise, 2)
      // Mobile optimization
      if (this.isMobile && maxBlur != 1.2) maxBlur = 1.2
      let y = -coef * Math.pow(x, 2) + 4 * x - 0.3 // value in (0;1). Max at (0.5; 1)
      // https://tympanus.net/codrops/2015/04/08/motion-blur-effect-svg/
      let blur = Math.round(maxBlur * y > 0 ? maxBlur * y : 0)
      // Mobile optimization
      // if (blur > 2 && maxBlur < 2) blur = 1.2
      blurFilter?.setAttribute('stdDeviation', blur.toString())
      svg.setAttribute('filter', 'url(#blur)')
      this.blur_i += 1
      if (this.blur_i < 100) this.animateBlur(svg, blurFilter, maxBlur)
    }, 1)
  }

  prevMode = 0
  @Watch('mode')
  onToggleMode(value: number, oldValue: number) {
    this.prevMode = oldValue
    this.setHeaderFilters()
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
  background-color: rgba(255, 255, 255, 1) !important;
  backdrop-filter: none;
}
header.v-app-bar.v-toolbar.v-sheet.blurry#header {
  background-color: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(12px) saturate(1.2);
}
header.v-app-bar.v-toolbar.v-sheet.theme--dark#header {
  background-color: rgba(0, 0, 0, 1) !important;
  backdrop-filter: none;
}
header.v-app-bar.v-toolbar.v-sheet.blurry.theme--dark#header {
  background-color: rgba(0, 0, 0, 0.65) !important;
  backdrop-filter: blur(12px) saturate(1.2);
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
header#header,
.v-toolbar__content,
.transition {
  transition: .4s cubic-bezier(0.52, 0.06, 0.45, 1.03) !important;
}

/* @media screen and (max-width: 600px) {
  svg,
  path,
  nav,
  header#header,
  .v-toolbar__content,
  .transition {
    transition: .5s !important;
  }
} */

path {
  /* will-change: transform; */
}

#header {
  /* overflow-y: scroll; */
}
</style>
