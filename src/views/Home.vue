<template lang="pug">
.v-container.pa-4
  // Main content
  #slider
    v-slider.slider_element(
      vertical,
      v-model='sliderPos',
      @input='setScroll()',
      ticks='always',
      :tick-labels='ticksLabels',
      step='1',
      :max='$t("projects").length - 1',
      dark,
      :thumb-color='dark ? "grey lighten-2" : "grey darken-2"',
      track-color='primary',
      track-fill-color='grey'
    )
  v-layout(justify-center, align-center)
    v-flex(xs1, sm2, md2)
    v-flex(xs10, sm8, md8)
      v-layout(column)
        Project(
          v-for='(project, i) in $t("projects")',
          :key='i',
          :title='project.title',
          :type='project.type',
          :slides='project.slides',
          v-intersect='{handler: onIntersect,options: {threshold: 0.5}}',
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
      duration: 420,
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

  @Watch('dark')
  onThemeChange(dark: boolean) {
    // if (!dark)
  }
}
</script>

<style>
#slider {
  position: fixed;
  right: 10px;
  padding-left: 15vw;
  height: 300px;
  top: 25vh;
  z-index: 1;
  transition: 0.3s ease-in-out;
  cursor: none;
}
.v-slider {
  height: 300px;
}

#slider:hover {
  padding-right: 35vw;
}

@media screen and (max-width: 600px) {
  #slider {
    padding-left: 100px;
    right: 15px;
    
  }
  #slider:hover {
    padding-right: 250px;
  }
  .v-slider__tick-label {
    max-width: 54vw !important;
  }
}

.v-slider__tick-label.slider_current {
  background: rgba(0, 0, 0, 0.9);
}

.v-slider__tick-label.slider_near {
  background: rgba(0, 0, 0, 0.65);
}

.v-slider__tick-label {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  padding: 2px;
  transition: 0.4s ease-out;
  padding-top: 6px;
  padding-bottom: 6px;
  white-space: break-spaces !important;
  width: max-content;
  max-width: 34vw;
}
</style>
