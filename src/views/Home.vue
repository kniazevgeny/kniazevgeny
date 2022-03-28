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
      :max='$t("projects").length - 1',
      dark,
      thumb-color='transparent',
      :track-color='dark ? "grey lighten-3" : "grey darken-3"',
      :track-fill-color='dark ? "grey darken-2" : "grey lighten-2"'
    )
  v-layout(justify-center, align-center)
    v-flex(xs1, sm2, md2)
    v-flex(xs10, sm8, md8)
      v-layout(column)
        h1.h.grad-accent My Story
        p.pt-2 blah blah blah
        p blah blah blah
        p blah blah blah
        h1.pt-3.h.grad-accent My Projects
        //- Projects
        Project(
          v-for='(project, i) in $t("projects")',
          :key='i',
          :title='project.title',
          :type='project.type',
          :link='project.link',
          :_slides='project.slides',
          :lazySlides='project.lazySlides',
          :paragraphs='project.paragraphs',
          v-intersect='{handler: onIntersect,options: {threshold: 0.7}}',
          :hasDemo='project.hasDemo == true'
          :embedURL='project.embedURL'
          :id='"p" + i'
        )

    v-flex(xs1, sm2, md2)

  v-layout(column, justify-center, align-center)
    v-flex.pt-4
      .caption
        router-link(to='/privacy') {{ $t("home.privacy") }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
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

  sliderPos = 0
  realPos = 0
  scrollY = 100
  ticksLabels = []

  isScrolling = false
  setScroll() {
    // prevent scrollY or sliderPos update during using timeline navigation
    this.isScrolling = true
    window.setTimeout(() => {
      this.isScrolling = false
    }, 450)
    this.realPos = (this.$t('projects').length as number) - 1 - this.sliderPos
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
      this.sliderPos = (this.$t('projects').length as any) - 1 - this.realPos
    }
  }

  mounted() {
    interface proj {
      title: string
    }
    let projects = this.$t('projects') as any as proj[]
    // projects.reverse()
    projects.forEach((el) => {
      this.ticksLabels.push(el.title as never)
    })
    this.ticksLabels.reverse()

    // paint v-slider navigation before any scroll
    window.setTimeout(()=>{this.onRealPosChange(0,0)}, 50)
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
    if (value < (this.$t('projects').length as any) - 1)
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
  background: var(--accent-color);
  cursor: pointer;
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
</style>
