import inquirer from 'inquirer'
import fs from 'fs'
import ejs from 'ejs'

const {prompt} = inquirer
prompt([
  {
    type: 'input',
    name: 'name',
    message: '请输入你创建文件的模板的名称：'
  },
  //询问创建pc还是h5
  {
    type: 'list',
    name: 'choice',
    message: '请选择你创建的模板类型：',
    choices: [
      'pc',
      'h5'
    ]
  }
], {})
  .then(answers => {
    const {name, choice} = answers
    const folderPath = `./${choice}/templates/`
    try {
      //首先检查pc/templates/文件夹是否存在，如果不存在则创建
      fs.readdir(folderPath, async (err, files) => {
        if (err) throw err
        if (files.includes(name)) {
          console.log('该文件已经存在')
        } else {
          //通过name在pc/templates/文件夹下面创建相应的name文件夹
          await fs.mkdir(`${folderPath}fly-${name}`, {recursive: true}, (err) => {
            if (err) throw err
          })
          //在创建的文件下面创建scss、css、js文件夹，并且文件夹包含index.scss文件
          await fs.mkdir(`${folderPath}fly-${name}/scss`, {recursive: true}, (err) => {
            if (err) throw err
          })
          await fs.mkdir(`${folderPath}fly-${name}/css`, {recursive: true}, (err) => {
            if (err) throw err
          })
          await fs.mkdir(`${folderPath}fly-${name}/js`, {recursive: true}, (err) => {
            if (err) throw err
          })
          //在创建的文件夹scss下面创建index.scss文件
          await fs.writeFile(`${folderPath}fly-${name}/scss/index.scss`, `.fly-${name}-${choice}{\n}`, (err) => {
            if (err) throw err
          })
          await fs.writeFile(`${folderPath}fly-${name}/js/index.js`, '', (err) => {
            if (err) throw err
          })
          //在创建的文件夹下面创建index.js文件.index.js引入index.scss
          await fs.writeFile(`${folderPath}fly-${name}/index.js`, `import './scss/index.scss' \n import './js/index.js'`, (err) => {
            if (err) throw err
          })
          //在文件夹下面创建index.html文件，写入模板内容
          await fs.writeFile(`${folderPath}fly-${name}/index.html`, ejs.render(`<div class="fly-${name}-${choice}"></div>`), (err) => {
            if (err) throw err
          })
          //外层main.js引入/templates/name/index.mjs,不替换之前的内容
          const folders = fs.readdirSync(`${choice}/templates`, {withFileTypes: true})
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

          //根据folders获取对应的入口文件
          const insertMainJs = folders.map(folder => {
            return `import '${folderPath}${folder}/index.js'`
          }).join('\n')
          //读取main.js文件，将main.js文件中的内容替换为insertMainJs
          await fs.readFile(`${choice}/temp.main.js`, 'utf8', (err, data) => {
            if (err) throw err
            //合并字符串
            fs.writeFile(`${choice}/temp.main.js`, insertMainJs, 'utf8', (err) => {
              if (err) throw err
            })
          })

        }
      })
    } catch (e) {
      console.log(e)
    }
  });
