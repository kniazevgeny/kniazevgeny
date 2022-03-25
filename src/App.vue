<template lang="pug">
v-app(
  :dark='$store.state.dark',
  :class='$store.state.dark ? "grey darken-4" : "grey lighten-4"'
)
  Navbar
  Snackbar
  v-main(style='transition: none')
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
  
  mounted() {
    let gradients = [
      ["rgb(226, 190, 170)", "rgb(221, 116, 75)", "rgb(248, 164, 85)"],
      ["rgb(219, 112, 144)", "rgb(223, 173, 153)", "rgb(139, 228, 198)"],
      ["rgb(146, 70, 233)", "rgb(152, 175, 226)", "rgb(224, 173, 79)"]
    ]
    let i = Math.round(Math.random() * 2)
    // set random gradient
    document.body.style.setProperty("--gradient-from", gradients[i][0])
    document.body.style.setProperty("--accent-color", gradients[i][1])
    document.body.style.setProperty("--gradient-to", gradients[i][2])
  }
}
</script>
<style>
body,
p,
a,
span {
  font-family: 'Bitter', monospace !important;
}
.h,
.v-card__title {
  font-family: 'Roboto Slab', monospace;
  font-weight: 600 !important;
  width: fit-content;
}

body {
  --gradient-from: rgb(146, 70, 233);
  --accent-color: rgb(152, 175, 226);
  --gradient-to: rgb(224, 173, 79);
  --gradient-colors: var(--gradient-from), var(--gradient-to);
}
.grad-accent {
  background: linear-gradient(-45deg, var(--gradient-colors));
  background: -webkit-linear-gradient(-45deg, var(--gradient-colors));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>