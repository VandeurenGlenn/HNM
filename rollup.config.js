import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { cpSync } from "fs";
import {readdir, unlink} from 'fs/promises'
import { join } from "path";
import inline from 'rollup-plugin-md-icon-inline'

const cleanWWW = async () => {
  return {
    name: 'clean-www', // this name will show up in warnings and errors
    generateBundle: async ()=> {
      const files = await readdir('www')
      for (const file of files) {
        if (file.endsWith('.js') && !file.includes('sw.js') && !file.includes('workbox')) await unlink(join('www', file))
        
      }
      return 
    }
  };
}

cpSync('./node_modules/@vandeurenglenn/lit-elements/exports/themes', 'www/themes', { recursive: true })
const views = (await readdir('./src/views')).map(view => `./src/views/${view}`)
const themes = (await readdir('./src/themes')).map(theme => `./src/themes/${theme}`)

export default [{
  input: ['./src/shell.ts', ...views],
  output: [{
    dir: 'www',
    format: 'es'
  }],
  plugins: [
    cleanWWW(),
    inline(),
    nodeResolve(),
    terser({keep_classnames: true}),
    typescript()
  ]
}, {
  input: themes,
  output: [{
    dir: 'www/themes',
    format: 'es'
  }]
}]