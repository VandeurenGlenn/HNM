import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { log } from 'console'
import { readdir, unlink, readFile, writeFile, cp, opendir, mkdir } from 'fs/promises'
import { join } from 'path'
import materialSymbols from 'rollup-plugin-material-symbols'
import { generateSW } from 'rollup-plugin-workbox'
import translate from 'translate'
import replace from '@rollup/plugin-replace'

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

const translationsMap = {}

const translatePlugin = () => {
  return {
    name: 'translatePlugin',
    transform: async (code, id) => {
      const regex = new RegExp(/(?:\$\{translate\(\')(.+)(?:\'\)\})|(?:\$\{translate\(\")(.+)(?:\"\)\})/, 'g')
      const _matches = code.match(regex) || []
      if (_matches.length > 0) {
        translationsMap['nl'] = translationsMap['nl'] || {}

        for (let i = 0; i < _matches.length; i++) {
          const match = _matches[i].replace(regex, '$1')
          // Skip if already translated
          if (translationsMap['nl'][match]) continue

          const translation = await translate(match, { from: 'en', to: 'nl' })
          translationsMap['nl'][match] = translation
        }
        return code
      }
    },
    generateBundle: async () => {
      const response = await fetch('https://admin.hellonewme.be/api/products')
      const products = await response.json()
      for (const [key, product] of Object.entries(products)) {
        const name = await translate(product.name, { from: 'en', to: 'nl' })
        const description = await translate(product.description, { from: 'en', to: 'nl' })
        translationsMap['nl'] = translationsMap['nl'] || {}
        translationsMap['nl'][product.name] = name
        translationsMap['nl'][product.description] = description
      }
      try {
        fd = await opendir('www/translations')
        fd.close()
      } catch (error) {
        await mkdir('www/translations', { recursive: true })
      }
      for (const lang in translationsMap) {
        writeFile(`www/translations/${lang}.js`, `export default ${JSON.stringify(translationsMap[lang], null, 2)}`)
      }
    }
  }
}

const plugins = [
  cleanWWW(),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
  }),
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

    terser({ keep_classnames: true }),
    translatePlugin()
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
  }
]
