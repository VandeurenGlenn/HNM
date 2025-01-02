import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { cpSync } from 'fs'
import { readdir, unlink } from 'fs/promises'
import { join } from 'path'
import materialSymbols from 'rollup-plugin-material-symbols'
import { generateSW } from 'rollup-plugin-workbox'
const cleanWWW = async () => {
  return {
    name: 'clean-www', // this name will show up in warnings and errors
    generateBundle: async () => {
      const files = await readdir('www')
      for (const file of files) {
        if (file.endsWith('.js') && !file.includes('sw.js') && !file.includes('workbox'))
          await unlink(join('www', file))
      }
      return
    }
  }
}

cpSync('./node_modules/@vandeurenglenn/lite-elements/exports/themes', 'www/themes', { recursive: true })
const views = (await readdir('./src/views')).map((view) => `./src/views/${view}`)
const themes = (await readdir('./src/themes')).map((theme) => `./src/themes/${theme}`)

export default [
  {
    input: ['./src/shell.ts', ...views],
    output: [
      {
        dir: 'www',
        format: 'es'
      }
    ],
    plugins: [
      cleanWWW(),
      nodeResolve(),
      materialSymbols({
        elements: ['md-icon'],
        placeholderPrefix: 'symbol'
      }),
      terser({ keep_classnames: true }),
      typescript(),
      generateSW({
        swDest: 'www/sw.js',
        globDirectory: 'www',
        globPatterns: ['**/*.{html,js,css}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  },
  {
    input: themes,
    output: [
      {
        dir: 'www/themes',
        format: 'es'
      }
    ]
  }
]
