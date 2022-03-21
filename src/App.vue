<template lang="pug">
v-app(
  :dark='$store.state.dark',
  :class='$store.state.dark ? "grey darken-4" : "grey lighten-4"'
)
  Navbar
  Snackbar
  v-main(style='transition: none; padding-top: 200px')
    router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/Navbar.vue'
import Snackbar from '@/components/Snackbar.vue'
import store from '@/store'
import { i18n } from '@/plugins/i18n'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({ components: { Navbar, Snackbar } })
export default class App extends Vue {
  @AppStore.State dark!: boolean
  @SnackbarStore.Mutation hideSnackbar!: () => void

  get style() {
    return {
      'background-color': this.dark ? '#303030' : '#fafafa',
    }
  }

  created() {
    this.$vuetify.theme.dark = this.dark

    const query = document.querySelector('meta[name="theme-color"]')
    if (query) {
      query.setAttribute('content', this.dark ? '#303030' : '#fafafa')
    }

    this.hideSnackbar()

    document.title = i18n.t('title') as string
  }

  get metaInfo() {
    return {
      title: i18n.t('title') as string,
    }
  }
  
  mounted() { }
}
</script>
<style>
body, p, a, span {
  font-family: 'Bitter', serif !important;
}
.h, .v-card__title {
  font-family: 'Roboto Slab', serif;
  font-weight: 600 !important;
}
</style>