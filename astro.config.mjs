import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

const base = process.env.PUBLIC_BASE_PATH ?? '/'

export default defineConfig({
  site: 'https://kniazevgeny.github.io',
  base,
  output: 'static',
  integrations: [react()],
})
