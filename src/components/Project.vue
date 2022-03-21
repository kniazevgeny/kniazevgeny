<template lang="pug">
v-lazy(
  v-model='isActive',
  :options='{ threshold: 0.8 }',
  min-height='550',
  transition='fade-transition'
)
  v-card.project.mt-10.pa-3.pb-9.mb-6
    v-card-title.pl-0 {{ title }}
    v-carousel(cycle, show-arrows-on-hover, height='auto')
      v-carousel-item(v-for='(slide, i) in slides', :key='i', height='auto')
        v-img(aspect-ratio='1.5', :src='slide')
    a show more
    span {{ type }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { i18n } from '@/plugins/i18n'
import * as api from '@/utils/api'
import { namespace } from 'vuex-class'

@Component
export default class Project extends Vue {
  @Prop({ required: true })
  public title!: string

  @Prop({ required: true })
  public type!: string

  @Prop({ required: true })
  public slides!: string[]

  expanded = false
  isActive = false
}
</script>
<style scoped>
.project {
  width: 100%;
  border-radius: 10px !important;
}
</style>