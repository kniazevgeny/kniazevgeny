<template lang="pug">
.v-container.pa-4(v-scroll='onScrollYChange')
  // Main content
  #slider
    v-slider(
      vertical,
      hint,
      v-model='sliderPos',
      @input='setScroll()',
      ticks='always',
      :tick-labels='ticksLabels',
      step='1',
      :max='$t("projects").length - 1'
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
          v-intersect="{handler: onIntersect,options: {threshold: 0.7}}",
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
import { Interface } from 'readline'

@Component({ components: { Project } })
export default class Home extends Vue {
  @AppStore.Mutation setUser!: (user: User) => void
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
      easing: 'easeInCubic',
    })
    // window.scrollTo(0, (this.scrollY / 100) * document.body.offsetHeight)
  }

  onIntersect(
    entry: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ) {
    if (
      !this.isScrolling &&
      isIntersecting
    ) {
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

  onScrollYChange() {
    let docHeight = document.body.offsetHeight - window.innerHeight
    // if (!this.isScrolling) this.scrollY = 100 - (window.scrollY / docHeight) * 100
  }
}
</script>

<style>
#slider {
  position: fixed;
  right: 15vw;
  top: 25vh;
}
</style>
