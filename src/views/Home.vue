<template lang="pug">
.v-container.pa-4
  // Main content
  #slider(
    @mouseover='showTickLabels = true',
    @mouseleave='showTickLabels = false'
  )
    v-slider(
      vertical,
      v-model='sliderPos',
      @input='setScroll()',
      :ticks='showTickLabels ? "always" : false',
      :tick-labels='showTickLabels ? ticksLabels : undefined',
      step='1',
      :max='projectsWithoutYears.length - 1',
      dark,
      thumb-color='transparent',
      :track-color='dark ? "grey lighten-3" : "grey darken-3"',
      :track-fill-color='dark ? "grey darken-2" : "grey lighten-2"'
    )
  // Head, links and name
  v-row.mt-n12.mb-12
    v-flex(xs1, sm1, md2)
    v-layout(column, style='flex: 1.5 1; justify-content: center')
      svg(viewBox='-50 -50 100 100', xmlns='http://www.w3.org/2000/svg')
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
    v-layout.ml-n3(
      column,
      :style='"justify-content: center; flex: " + (isMobile ? "2.5" : "3.5")'
    )
      h1.h.grad-accent.pb-1(style='font-size: 2.5rem; line-height: 2.5rem') {{ $t("title") }}
      .mt-3
        a(href='https://t.me/kniazevgeny')
          img(src='@/assets/telegram.svg')
        a.pl-4(href='https://github.com/kniazevgeny')
          img(src='@/assets/github.svg')
        a.pl-4(href='https://linkedin.com/in/kniazevgeny')
          img(src='@/assets/linkedin.svg')
        a.pl-4(href='mailto:eugene.kniazev@gmial.com')
          img(src='@/assets/email.svg')
    v-flex(xs1, sm1, md2)
  // About me
  v-layout(justify-center, align-center)
    v-flex(xs1, sm1, md2)
    v-flex(xs10, sm10, md8)
      v-layout(column)
        h1.h.grad-accent {{ $t("home.myStoryTitle") }}
        div(style='position: relative')
          p.mb-0.pt-3(
            v-for='(text, i) in $t("home.myStory")',
            v-if='isMyStoryExpanded ? true : i < 2 + Number(!isMobile)',
            v-html='text'
          )
          div(
            :style='!isMyStoryExpanded ? "background-image: linear-gradient(to top,#121212 -10%,rgba(0,0,0,0) 70%,rgba(0,0,0,0)); position: absolute;     height: 100%; width: 100%; top: 0; bottom: 0; left: 0; right: 0; position: absolute;" : ""'
          )
        a.pt-2.grad-accent.text-center(
          style='text-decoration: underline !important',
          @click='isMyStoryExpanded = true',
          v-if='$t("home.myStory").length - 1 && !isMyStoryExpanded'
        ) {{ $t("home.showMore") }}
        h1.pt-12.mb-n6.h.grad-accent {{ $t("home.myProjectsTitle") }}
        //- Projects
        div(v-for='(yearProjects, i) in $t("projects")', :key='i')
          v-row.mt-12.mb-8(:class='Boolean(i) ? "pt-12" : ""')
            v-divider.mt-3.ml-4.mr-4
            .h.grad-accent {{ yearProjects.year }}
            v-divider.mt-3.ml-4.mr-4
          Project(
            v-for='(project, j) in yearProjects.projects',
            :key='j',
            :title='project.title',
            :summary='project.summary',
            :type='project.type',
            :link='project.link',
            :_slides='project.slides',
            :lazySlides='project.lazySlides',
            :paragraphs='project.paragraphs',
            v-intersect='{handler: onIntersect,options: {threshold: 0.7}}',
            :hasDemo='project.hasDemo == true',
            :embedURL='project.embedURL',
            :id='"p" + (howManyProjectsBeforeYear[i] + j)',
            :_id='project.id'
          )

    v-flex(xs1, sm1, md2)

  v-layout(column, justify-center, align-center)
    v-flex.pt-4
      .h {{ $t("home.thank") }}
      .caption.justify-center.d-flex
        a(
          href='https://github.com/kniazevgeny/kniazevgeny/tree/master',
          rel='noopener noreferrer',
          target='_blank'
        ) {{ $t("home.openSource") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { Watch } from 'vue-property-decorator'

const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

import Project from '@/components/Project.vue'

@Component({ components: { Project } })
export default class Home extends Vue {
  @AppStore.Mutation setUser!: (user: User) => void
  @AppStore.State dark!: boolean
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  isMyStoryExpanded = false

  sliderPos = this.projectsWithoutYears.length
  realPos = 0
  scrollY = 100
  ticksLabels = []
  showTickLabels = false

  svg_path = 2 // 1 means meduim, 0 small, 2 expanded

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

  get isMobile() {
    return window.innerWidth <= 800 && window.innerHeight <= 900
  }

  get projectsWithoutYears() {
    let result = []
    for (let y = 0; y < this.$t('projects').length; y++)
      // @ts-ignore
      for (let j = 0; j < this.$t('projects')[y].projects.length; j++)
        // @ts-ignore
        result.push(this.$t('projects')[y].projects[j])
    return result
  }

  get howManyProjectsBeforeYear() {
    let result: number[] = [0]
    for (let y = 0; y < this.$t('projects').length; y++)
      result.push(
        // @ts-ignore
        this.$t('projects')[y].projects.length + (result.length ? result[y] : 0)
      )
    return result
  }

  isScrolling = false
  setScroll() {
    // prevent scrollY or sliderPos update during using timeline navigation
    this.isScrolling = true
    window.setTimeout(() => {
      this.isScrolling = false
    }, 450)
    this.realPos = this.projectsWithoutYears.length - 1 - this.sliderPos
    this.$vuetify.goTo('#p' + this.realPos.toString(), {
      duration: 320,
      easing: 'easeInOutQuart',
    })
  }

  onIntersect(
    entry: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ) {
    if (!this.isScrolling && isIntersecting) {
      this.realPos = parseInt(entry[0].target.id.slice(1))
      this.sliderPos = this.projectsWithoutYears.length - 1 - this.realPos
    }
  }

  get locale() {
    return this.$i18n.locale
  }

  mounted() {
    interface proj {
      title: string
    }
    let projects = this.projectsWithoutYears as proj[]
    projects.forEach((el) => {
      this.ticksLabels.push(el.title as never)
    })
    this.ticksLabels.reverse()

    // paint v-slider navigation before any scroll
    window.setTimeout(() => {
      this.onRealPosChange(0, 0)
    }, 50)

    window.setTimeout(() => {
      this.svg_path = 0
    }, 960)
  }

  @Watch('realPos')
  onRealPosChange(value: number, oldValue: number) {
    // change styles of tick-labels
    if (!this.showTickLabels) return
    // remove obsolete styles from everywhere
    for (
      let index = 0;
      index < document.getElementsByClassName('v-slider__tick').length;
      index++
    ) {
      ;(
        document.getElementsByClassName('v-slider__tick')[index]
          .firstChild as HTMLElement
      ).classList.remove('slider_current')
      ;(
        document.getElementsByClassName('v-slider__tick')[index]
          .firstChild as HTMLElement
      ).classList.remove('slider_near')
    }
    // current element
    ;(
      document.getElementsByClassName('v-slider__tick')[value]
        .firstChild as HTMLElement
    ).classList.add('slider_current')
    // nearby elements
    if (value)
      (
        document.getElementsByClassName('v-slider__tick')[value - 1]
          .firstChild as HTMLElement
      ).classList.add('slider_near')
    if (value < (this.projectsWithoutYears.length as any) - 1)
      (
        document.getElementsByClassName('v-slider__tick')[value + 1]
          .firstChild as HTMLElement
      ).classList.add('slider_near')
  }

  @Watch('locale')
  onLocaleChange() {
    interface proj {
      title: string
    }
    // update ticket labels
    let projects = this.projectsWithoutYears as proj[]
    projects.forEach((el) => {
      this.ticksLabels.push(el.title as never)
    })
    this.ticksLabels.reverse()
  }
}
</script>

<style>
#slider {
  position: fixed;
  right: 20px;
  padding-left: 8vw;
  top: 25vh;
  z-index: 1000;
  transition: 50ms;
}
.v-slider {
  height: 270px;
}

#slider:hover {
  padding-right: 35vw;
  right: 0;
}

@media screen and (min-width: 1300px) and (max-width: 1500px) {
  #slider:hover {
    padding-right: 30vw;
  }
  .v-slider {
    height: 230px;
  }
}

@media screen and (min-width: 1300px) {
  #slider:hover {
    padding-right: 26vw;
  }
  .v-slider {
    height: 450px;
  }
  .v-slider__tick-label {
    max-width: 25vw !important;
  }
}

@media screen and (min-width: 950px) and (max-width: 1300px) {
  #slider:hover {
    padding-right: 40vw;
  }
  .v-slider {
    height: 500px;
  }
  .v-slider__tick-label {
    max-width: 35vw !important;
  }
}

@media screen and (min-width: 800px) and (max-width: 950px) {
  #slider:hover {
    padding-right: 47vw;
  }
  .v-slider {
    height: 450px;
  }
  .v-slider__tick-label {
    max-width: 45vw !important;
  }
}

@media screen and (min-width: 600px) and (max-width: 800px) {
  #slider:hover {
    padding-right: 53vw;
  }
  .v-slider {
    height: 500px;
  }
  .v-slider__tick-label {
    max-width: 50vw !important;
  }
}

@media screen and (max-width: 600px) {
  .v-slider {
    height: 470px;
  }
  #slider {
    padding-left: 8vw;
    right: 18px;
  }
  #slider:hover {
    padding-right: 71vw;
    padding-left: 0;
    right: 0;
  }
  .v-slider__tick-label {
    max-width: 70vw !important;
  }
}

.v-slider__tick-label.slider_current {
  background: rgba(0, 0, 0, 0.77);
}
.v-slider__tick-label.slider_near {
  background: rgba(0, 0, 0, 0.65);
}
.v-slider__tick-label:hover {
  background: var(--gradient-from);
  cursor: pointer;
  opacity: 0.9;
}

.v-slider__tick {
  width: 0 !important;
}
.v-slider__tick-label {
  background: rgba(0, 0, 0, 0.28);
  -webkit-backdrop-filter: saturate(1.2) blur(12px);
  backdrop-filter: saturate(1.2) blur(10px);
  border-radius: 3px;
  padding: 8px;
  transition: 0.4s ease-out;
  padding-top: 6px;
  padding-bottom: 6px;
  white-space: break-spaces !important;
  width: 600px;
  max-width: 34vw;
  font-weight: 600;
}

.v-slider--vertical .v-slider__track-container {
  width: 7px !important;
}
.v-slider__track-background,
.v-slider__track-fill {
  border-radius: 3px;
}
p > a.grad-accent {
  word-break: break-word;
  white-space: pre-wrap;
}
hr.v-divider {
  border-color: antiquewhite !important;
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
