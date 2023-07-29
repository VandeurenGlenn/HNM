import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import {readdir, unlink} from 'fs/promises'
import { join } from "path";
import inline from 'rollup-plugin-material-symbols'

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


const views = (await readdir('./src/views')).map(view => `./src/views/${view}`)
const themes = (await readdir('./src/themes')).map(theme => `./src/themes/${theme}`)

export default [{
  input: ['./src/shell.js', ...views],
  output: [{
    dir: 'www',
    format: 'es'
  }],
  plugins: [
    cleanWWW(),
    inline({
      elements: ['md-icon']
    }),
    nodeResolve(),
    terser()
  ]
}, {
  input: themes,
  output: [{
    dir: 'www/themes',
    format: 'es'
  }]
}]