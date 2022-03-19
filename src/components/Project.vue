<template lang="pug">
v-card.project.mt-3.pa-1
  v-card-title {{ title }}
  v-carousel(cycle, show-arrows-on-hover, height='auto')
    v-carousel-item(v-for='(slide, i) in slides', :key='i' height='auto')
      v-img(aspect-ratio='1.5', :src='slide')
  a show more
  span {{ type }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
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
  slide1 = "../assets/echarge-1.png"
}
</script>
<style scoped>
.project {
  width: 100%;
  border-radius: 10px !important;
}
</style>