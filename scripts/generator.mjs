import fs from 'fs'
import path from 'path'
import i18n from "../i18n/index.mjs";

const {getLanguage} = i18n
//获取传入的参数
const args = process.argv.splice(2)
const lang = args[0] || 'us'
const language = getLanguage(lang)
//读取对应language的国际化文件
const languageFile = await import(`../i18n/${language}.mjs`)
const languageObj = languageFile.default


const handleGetViewPath = (mode) => {
  return path.resolve(`./${mode}/views`)
}
const handleGetFolders = (path) => {
  return fs.readdirSync(path, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

//获取pc和h5的views文件地址
const pcPath = handleGetViewPath('pc')
const h5Path = handleGetViewPath('h5')
//获取pc和h5的views文件夹下面的文件夹
const pcFolders = handleGetFolders(pcPath)
const h5Folders = handleGetFolders(h5Path)

//遍历pcFolders和h5Folders，读取对应的index.html文件，复制一份prod-index-${lang}.html文件
const h5CopyFile = new Promise((resolve) => {
  h5Folders.forEach(async (item, index) => {
    await fs.readFile(`${h5Path}/${item}/index.html`, 'utf8', (err, data) => {
      fs.writeFile(`${h5Path}/${item}/prod-index-${lang}.html`, data, 'utf8', (err) => {
        if (err) throw err
        if (index === h5Folders.length - 1) {
          resolve()
        }
      })
    })
  })
})
const pcCopyFile = new Promise((resolve) => {
  pcFolders.forEach(async (item, index) => {
    await fs.readFile(`${pcPath}/${item}/index.html`, 'utf8', (err, data) => {
      fs.writeFile(`${pcPath}/${item}/prod-index-${lang}.html`, data, 'utf8', (err) => {
        if (err) throw err
        if (index === pcFolders.length - 1) {
          resolve()
        }
      })
    })
  })
})
//读取h5和pc的模板文件，替换对应的值

//处理模板内容
const handleGetTemp = (res, data) => {
  //模板的正则
  const regTemp = /%%-[\s\S]*?-%%/g
  const matchArr = data.match(regTemp)
  let newData = data
  let allCss = ``
  matchArr?.forEach((temp) => {
    //模板的中{{}}替换为对应的值
    const valueObj = res[temp].valueObj
    Object.keys(valueObj).forEach((key) => {
      const reg = new RegExp(`{{${key}}}`, 'g')
      res[temp].tempData = res[temp].tempData.replace(reg, valueObj[key])
    })
    newData = newData.replace(temp, res[temp].tempData)
    allCss = `${allCss}\n${res[temp].tempDataCss}`
  })
  newData = newData.replace(/<\/head>/g, `<style>\n${allCss}\n</style>\n</head>`)
  //替换国际化 国际化模板为[i18][/i18]
  const regI18n = /\[i18][\s\S]*?\[\/i18]/g
  const matchI18nArr = newData.match(regI18n)
  matchI18nArr?.forEach((temp) => {
    const tempText = temp.replace(/\[i18]/g, '').replace(/\[\/i18]/g, '')
    //获取对应的国际化文案
    const nameList = tempText.split('.')
    let text = JSON.parse(JSON.stringify(languageObj))
    nameList.forEach((name) => {
      if (text && text[name]) {
        text = text[name]
      } else {
        text = ''
      }
    })
    newData = newData.replace(temp, text)
  })
  return newData
}
h5CopyFile.then(() => {
  pcFolders.forEach(async (item) => {
    await handleReadTemplates("h5", item).then((res) => {
      fs.readFile(`${h5Path}/${item}/prod-index-${lang}.html`, 'utf8', (err, data) => {
        const newData = handleGetTemp(res, data)
        fs.writeFile(`${h5Path}/${item}/prod-index-${lang}.html`, newData, 'utf8', (err) => {
          if (err) throw err
        })
      })
    })
  })
})
pcCopyFile.then(() => {
  pcFolders.forEach(async (item) => {
    await handleReadTemplates("pc", item).then((res) => {
      fs.readFile(`${pcPath}/${item}/prod-index-${lang}.html`, 'utf8', (err, data) => {
        const newData = handleGetTemp(res, data)
        fs.writeFile(`${pcPath}/${item}/prod-index-${lang}.html`, newData, 'utf8', (err) => {
          if (err) throw err
        })
      })
    })
  })
})
//处理渲染模板
const handleReadTemplates = (mode, item) => new Promise((resolve) => {
  const _path = handleGetViewPath(mode)
  fs.readFile(`${_path}/${item}/prod-index-${lang}.html`, 'utf8', (err, data) => {
    const reg = /%%-[\s\S]*?-%%/g
    const matchArr = data.match(reg)
    const replaceObj = {}
    matchArr?.forEach((temp, index) => {
      const splitList = temp.replace(/%%-/g, '').replace(/-%%/g, '').replace(/\r*\n/g, '').replace(/"/g, '').split('##')
      const tempName = splitList[0].replace(/\s*/g, '')
      const ValueList = splitList.slice(1)
      const valueObj = {}
      ValueList.forEach((stringValue) => {
        const splitValue = stringValue.split('=')
        valueObj[splitValue[0]] = splitValue[1]
      })
      const tempPath = path.resolve(`./${mode}/templates/${tempName}/`)
      //读取文件夹下面index.html、css/${tempName}-h5t.css以及js/${tempName}-index.js内容
      let tempDataHtml = fs.readFileSync(`${tempPath}/index.html`, 'utf8')
      //分离出css和js
      const regCss = /<style>[\s\S]*?<\/style>/g
      const _tempDataCss = tempDataHtml.match(regCss)
      //获取css内容, 循环_tempDataCss数组，替换<style>和</style>为空
      const _tempDataCssStr = _tempDataCss?.map((item) => {
        tempDataHtml = tempDataHtml.replace(item, '')
        return item.replace(/<style>/g, '').replace(/<\/style>/g, '')
      })
      const allTempDataCss = _tempDataCssStr?.join('\n')
      const tempDataCss = fs.readFileSync(`${tempPath}/css/${tempName}-${mode}t.css`, 'utf8')
      const tempDataJs = fs.readFileSync(`${tempPath}/js/${tempName}-index.js`, 'utf8')
      const tempData = `${tempDataHtml}\n<script>\n${tempDataJs}\n</script>`
      replaceObj[temp] = {
        tempData,
        tempDataCss: `${tempDataCss}\n${allTempDataCss || ''}`,
        valueObj
      }
      if (index === matchArr.length - 1) {
        resolve(replaceObj)
      }
    })
  })
})
