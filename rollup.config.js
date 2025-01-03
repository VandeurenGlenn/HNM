import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { readdir, unlink, readFile, writeFile, cp } from 'fs/promises'
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

const sw = `
  <script type="module">
    try {
      window.registration = await navigator.serviceWorker.register('/sw.js');
      registration.onupdatefound = () => {
        document.querySelector('app-shell').notifyServiceWorkerUpdate();
      };
      console.log('Registration successful, scope is:', registration.scope);
    } catch (error) {
      console.log('Service worker registration failed, error:', error);
    }
  </script>`

const isProduction = process.env.NODE_ENV === 'production'

const prepareAndCopy = async () => {
  // execSync(`rm www/${target}/*.js`);
  let index = await readFile(`src/index.html`)
  index = index.toString()
  if (isProduction) {
    index = index.replace('<!-- @build:sw -->', sw)
    await cp('src/manifest.webmanifest', 'www/manifest.webmanifest')
  }
  await writeFile(`www/index.html`, index)
}

await prepareAndCopy()

await cp('./node_modules/@vandeurenglenn/lite-elements/exports/themes', 'www/themes', { recursive: true })
const views = (await readdir('./src/views')).map((view) => `./src/views/${view}`)
const themes = (await readdir('./src/themes')).map((theme) => `./src/themes/${theme}`)

const plugins = [
  cleanWWW(),
  nodeResolve(),
  materialSymbols({
    elements: ['md-icon'],
    placeholderPrefix: 'symbol'
  }),
  typescript()
]

if (isProduction) {
  plugins.push(
    generateSW({
      swDest: 'www/sw.js',
      globDirectory: 'www',
      globPatterns: ['**/*.{html,js,css}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true
    }),

    terser({ keep_classnames: true })
  )
}
export default [
  {
    input: ['./src/shell.ts', ...views],
    output: [
      {
        dir: 'www',
        format: 'es'
      }
    ],
    plugins
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
