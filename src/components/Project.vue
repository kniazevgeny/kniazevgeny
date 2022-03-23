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
      span.proj_type {{ type }}
    v-card-title.pa-3(style='word-break: break-word') {{ title }}
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
  max-width: calc(60vh * 1.5);
  border-radius: 10px !important;
  margin: auto;
}
.project.theme--light {
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff !important;
}
.proj_type {
  font-size: 12px;
  font-weight: bold;
  align-self: center;
  position: absolute;
  bottom: 7px;
  right: 6px;
  padding: 3px 8px 3px 8px;
  border-radius: 3px;
  font-family: 'Roboto Slab', serif !important;
  font-weight: 600;
  backdrop-filter: saturate(1.5) blur(12px) brightness(0.7);
  -webkit-backdrop-filter: saturate(1.5) blur(12px) brightness(0.7);
  color: white;
}
</style>