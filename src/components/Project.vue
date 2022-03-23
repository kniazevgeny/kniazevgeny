<template lang="pug">
v-lazy(
  v-model='isActive',
  :options='{ threshold: 0.8 }',
  min-height='550',
  transition='fade-transition'
)
  v-card.project.mt-10.pb-9.mb-6
    v-carousel(cycle, hide-delimiters, height='auto')
      v-carousel-item(v-for='(slide, i) in slides', :key='i', height='auto')
        v-img(aspect-ratio='1.5', :src='slide')
    v-flex(xs12 row).pa-3
      v-flex(xs8)
        v-card-title.pa-3(style='word-break: break-word;') {{ title }}
      v-flex(xs1)
      v-flex(xs3 style='align-self: center;')
        span.pa-3(style='font-size: 12px; font-weight: bold') {{type}}
    a show more
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
  isActive = true
}
</script>
<style scoped>
.project {
  width: 100%;
  border-radius: 10px !important;
}
</style>