<template lang="pug">
.v-container.pa-4
  // Main content
  #slider
    v-slider(
      vertical,
      hint,
      thumb-label='always',
      v-model='scrollY',
      @drag='setScroll()'
    )
  v-layout(justify-center, align-center)
    v-flex(xs1, sm2, md2)
    v-flex(xs10, sm8, md8)
      v-layout(v-for='(project, i) in projects', :key='i')
        Project(
          :title='project.title',
          :type='project.type',
          :slides='project.slides'
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
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  scrollY = 0

  projects = [
    {
      title: 'ECharge',
      type: 'MVP',
      slides: [
        require('../assets/echarge-1.png'),
        require('../assets/echarge-2.png'),
        require('../assets/echarge-3.png'),
      ],
    },
    {
      title: 'Стратегия развития банка для самозанятых',
      type: 'Кейс',
      slides: ['https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'],
    },
    {
      title: 'Бронирование парковки',
      type: 'MVP',
      slides: ['https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'],
    },
    {
      title: 'Роль сообществ в цифровой экономике',
      type: 'Аналитический обзор',
      slides: ['https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'],
    },
    {
      title: 'The Matrix: ЕГЭ',
      type: 'Видео',
      slides: ['https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'],
    },
    {
      title: 'Сравнение уровня развития ВИЭ в РФ и Канаде',
      type: 'Исследование',
      slides: ['https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'],
    },
  ]

  isScrolling = false
  setScroll() {
    // prevent scrollY update during using timeline navigation
    this.isScrolling = true
    window.setTimeout(() => {
      this.isScrolling = false
    }, 25)
    window.scrollTo(0, (this.scrollY / 100) * document.body.offsetHeight)
  }

  mounted() {
    window.addEventListener('scroll', this.onScrollYChange, true)
  }

  onScrollYChange() {
    let docHeight = document.body.offsetHeight - window.innerHeight

    if (!this.isScrolling)
    this.scrollY = (window.scrollY / docHeight) * 100
  }
}
</script>

<style>
#slider {
  position: fixed;
  right: 5vw;
  top: 25vh;
}
</style>
