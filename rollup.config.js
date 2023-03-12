import nodeResolve from "@rollup/plugin-node-resolve";
import {readdir} from 'fs/promises'

const views = (await readdir('./src/views')).map(view => `./src/views/${view}`)

export default [{
  input: ['./src/shell.js', ...views],
  output: [{
    dir: 'www',
    format: 'es'
  }],
  plugins: [
    nodeResolve()
  ]

}]