<template lang="pug">
.v-container.pa-4
  // Main content
  #slider
    v-slider(
      vertical,
      v-model='sliderPos',
      @input='setScroll()',
      ticks='always',
      :tick-labels='ticksLabels',
      step='1',
      :max='projectsWithoutYears.length - 1',
      dark,
      thumb-color='transparent',
      :track-color='dark ? "grey lighten-3" : "grey darken-3"',
      :track-fill-color='dark ? "grey darken-2" : "grey lighten-2"'
    )
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
        h1.pt-3.h.grad-accent {{ $t("home.myProjectsTitle") }}
        //- Projects
        div(
          v-for='(yearProjects, i) in $t("projects")'
          :key='i',
        )
          v-row.mt-8.mb-8
            v-divider.mt-3.ml-4.mr-4
            .h.grad-accent {{yearProjects.year}}
            v-divider.mt-3.ml-4.mr-4
          Project(
            v-for='(project, j) in yearProjects.projects',
            :key='j',
            :title='project.title',
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

  get isMobile() {
    return window.innerWidth <= 800 && window.innerHeight <= 900
  }

  get projectsWithoutYears() {
    let result = []
    for (let y=0; y < this.$t('projects').length; y++)
      // @ts-ignore
      for (let j=0; j < this.$t('projects')[y].projects.length; j++)
        // @ts-ignore
        result.push(this.$t('projects')[y].projects[j])
    return result
  }

  get howManyProjectsBeforeYear() {
    let result: number[] = [0]
    for (let y=0; y < this.$t('projects').length; y++)
      result.push(
        // @ts-ignore
        this.$t('projects')[y].projects.length
        + (result.length ? result[y] : 0)
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

  mounted() {
    interface proj {
      title: string
    }
    let projects = this.projectsWithoutYears as proj[]
    // projects.reverse()
    projects.forEach((el) => {
      this.ticksLabels.push(el.title as never)
    })
    this.ticksLabels.reverse()

    // paint v-slider navigation before any scroll
    window.setTimeout(() => {
      this.onRealPosChange(0, 0)
    }, 50)
  }

  @Watch('realPos')
  onRealPosChange(value: number, oldValue: number) {
    // change styles of tick-labels

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
}
</script>

<style>
#slider {
  position: fixed;
  right: 20px;
  padding-left: 10vw;
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

@media screen and (min-width: 1500px) {
  #slider:hover {
    padding-right: 25vw;
  }
  .v-slider {
    height: 250px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1300px) {
  #slider:hover {
    padding-right: 40vw;
  }
  .v-slider {
    height: 400px;
  }
  .v-slider__tick-label {
    max-width: 35vw !important;
  }
}

@media screen and (max-width: 600px) {
  .v-slider {
    height: 400px;
  }
  #slider {
    padding-left: 8vw;
    right: 18px;
  }
  #slider:hover {
    padding-right: 270px;
    padding-left: 0;
    right: 0;
  }
  .v-slider__tick-label {
    max-width: 63vw !important;
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
</style>
