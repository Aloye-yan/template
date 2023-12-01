import {defineConfig} from 'vite'
import fs from 'fs'
import scss from 'rollup-plugin-scss';

// eslint-disable-next-line
const isServe = process.env.npm_lifecycle_event === 'serve'
console.log(isServe)
const config = {}
if (!isServe) {
  // eslint-disable-next-line
  const argv = process.argv.slice(2)
  const mode = argv[argv.length - 1]
//根据mode获取是view下面还是templates下面的文件
  const folderPath = (mode) => {
    if (mode === 'pc') {
      return 'pc/views'
    } else if (mode === 'h5') {
      return 'h5/views'
    } else if (mode === 'pct') {
      return 'pc/templates'
    } else if (mode === 'h5t') {
      return 'h5/templates'
    }
  }
  const basePath = folderPath(mode)
//根据mode获取对应views下面的所有的文件名称
  const folders = fs.readdirSync(`${basePath}`, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
//根据folders获取对应的入口文件
  const entry = {}
  folders.forEach(folder => {
    entry[folder] = `${basePath}/${folder}/index.js`
  })
  config.build = {
    plugins: [scss({
      output: (styles, styleNodes) => {
        let folderPath = []
        for (let path in styleNodes) {
          //获取文件夹名称
          folders.forEach(folder => {
            if (path.split('/').includes(folder)) {
              folderPath.push({
                name: folder,
                path: `${path.split(folder)[0]}\\${folder}\\`,
                code: styleNodes[path]
              })
            }
          })
        }
        folderPath.map(folder => {
          fs.writeFile(`${folder.path}css/${folder.name}-${mode}.css`, folder.code, (err) => {
            if (err) throw err
          })
        })
      }
    })],
    build: {
      rollupOptions: {
        input: entry,
        output: {
          entryFileNames: (chunkInfo) => {
            return `${chunkInfo.name}/js/${chunkInfo.name}-index.js`
          }
        }
      },
      outDir: `${basePath}`,
      emptyOutDir: false
    }
  }
} else {
  const argv = process.argv.slice(2)
  const mode = argv[argv.length - 1].split(',')
  config.build = {
    assetsDir: 'assets',
    server: {
      host: "localhost",
      port: 8080,
      open: `${mode[0]}/views/${mode[2]}/prod-index-${mode[1]}.html`,
    },
  }
}
//异步抛出配置

export default defineConfig({
  ...config?.build
})

