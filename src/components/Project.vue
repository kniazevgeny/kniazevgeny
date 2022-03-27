<template lang="pug">
v-lazy(
  v-model='isActive',
  :options='{ threshold: 0.8 }',
  min-height='550',
  transition='fade-transition'
)
  v-card.project.mt-10.pb-9.mb-6(
    v-intersect='{handler: onIntersect,options: {threshold: 0.7}}'
  )
    v-carousel(
      continous,
      :cycle='!hasDemo',
      hide-delimiters,
      height='auto',
      :interval='interval'
    )
      v-carousel-item(v-for='(slide, i) in slides', :key='i', height='auto')
        //- If has youtube demo
        iframe.mb-6(
          v-if='hasDemo && i === 1',
          :style='isVertical ? "width: 100%; height: calc(70vw / 1.76)" : "width: calc(60vh * 1.76); height: 60vh"',
          :src='embedURL + (isVertical ? "controls=1&" : "")',
          title='Video player',
          frameborder='0',
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen
        )
        //- Else show images
        v-img(
          v-else,
          :aspect-ratio='hasDemo ? "1.76" : "1.5"',
          :src='slide',
          :lazy-src='lazySlides[i]'
        )
          template(v-slot:placeholder)
            v-row.fill-height.ma-0(align='center', justify='center')
              v-progress-circular(indeterminate, color='grey')
      //- Use templates because of different icons. Otherwise 
      //- initial icon pack freezes all the content loading 
      template(v-slot:prev='{ on, attrs }')
        v-icon(large, v-bind='attrs', v-on='on') arrow_left
      template(v-slot:next='{ on, attrs }')
        v-icon(large, v-bind='attrs', v-on='on') arrow_right
      h3.proj_type {{ type }}
    v-tooltip(bottom)
      template(v-slot:activator='{ on, attrs }')
        v-btn.proj_expand(icon, v-bind='attrs', v-on='on')
          v-icon(color='white') open_in_full
      span open project page
    h2.pa-3.pb-0.pr-10.h(style='word-break: break-word')
      a.grad-accent(:href='link', rel="noopener noreferrer", target="_blank") {{ title }}
    p.pl-3.mb-0.pt-3(
      v-for='(text, i) in paragraphs',
      v-show='expanded ? true : i == 0'
    ) {{ text }}
    div(v-show='expanded')
      //- Download buttons
    a.pl-3.grad-accent(
      style='text-decoration: underline !important',
      @click='expanded = true',
      v-if='paragraphs.length - 1 && !expanded'
    ) {{ $t("home.showMore") }}
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
  public link!: string | null

  @Prop({})
  public lazySlides?: string[]

  @Prop({})
  public hasDemo?: boolean

  @Prop({})
  public embedURL?: string

  @Prop({ required: true })
  private _slides!: string[]

  get slides() {
    if (this.hasDemo)
      return Array.prototype.concat(this._slides[0], this._slides)
    return this._slides
  }

  @Prop({ required: true })
  public paragraphs!: string[]

  get isVertical() {
    return window.innerWidth / window.innerHeight < 1.2
  }

  isIntersecting = false
  onIntersect(
    entry: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ) {
    this.isIntersecting = isIntersecting
  }

  get interval() {
    if (this.isIntersecting) return 32000 / this.slides.length - 2000
    return 24000
  }

  expanded = false
  isActive = true
}
</script>
<style scoped>
.project {
  max-width: calc(60vh * 1.778);
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
  font-family: 'Roboto Slab', monospace !important;
  font-weight: 600;
  background: linear-gradient(-45deg, var(--gradient-colors));
  background: -webkit-linear-gradient(-45deg, var(--gradient-colors));
  /* backdrop-filter: saturate(1.5) blur(12px) brightness(0.7); */
  /* -webkit-backdrop-filter: saturate(1.5) blur(12px) brightness(0.7); */
  color: white;
}

.proj_expand {
  position: absolute;
  margin-top: 12px;
  right: 6px;
}

.anchor {
  bottom: 0;
  display: inline-block;
  left: 0;
  margin: 0 -0.7em;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.anchor:hover {
  outline-width: 0;
}
</style>