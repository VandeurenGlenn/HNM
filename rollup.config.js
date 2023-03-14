import nodeResolve from "@rollup/plugin-node-resolve";
import {readdir} from 'fs/promises'
import rimraf from 'rimraf'

rimraf.sync('www/*.js')

const views = (await readdir('./src/views')).map(view => `./src/views/${view}`)
const themes = (await readdir('./src/themes')).map(theme => `./src/themes/${theme}`)

export default [{
  input: ['./src/shell.js', ...views],
  output: [{
    dir: 'www',
    format: 'es'
  }],
  plugins: [
    nodeResolve()
  ]
}, {
  input: themes,
  output: [{
    dir: 'www/themes',
    format: 'es'
  }]
}]