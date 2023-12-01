import inquirer from 'inquirer'
import path from "path";
import fs from "fs";
import {exec} from "child_process";

const handleGetViewPath = (mode) => {
  return path.resolve(`./${mode}/views`)
}
const handleGetFolders = (path) => {
  return fs.readdirSync(path, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

//启动服务选择pc还是h5,选择启用的语言,然后读取相应模板views下面的文件夹名称形成选择列表选择
const {prompt} = inquirer
prompt([
  //询问创建pc还是h5
  {
    type: 'list',
    name: 'choice',
    message: '请选择你启动的项目：',
    choices: [
      'pc',
      'h5'
    ]
  }
]).then(answers => {
  const {choice} = answers
  const folderPath = handleGetViewPath(choice)
  const foldersList = handleGetFolders(folderPath)
  prompt([
    {
      type: 'list',
      name: 'page',
      message: '请选择你启动的页面：',
      choices: foldersList
    },
    {
      type: 'list',
      name: 'lang',
      message: '请选择你启用的语言：',
      choices: [
        'us',
        'de',
        'fr',
        'it',
        'es',
        'jp',
        'ca',
        'au',
        'uk',
        'in',
        'mx',
        'br',
        'cn'
      ]
    }
  ]).then(pageAnswers => {
    const {page, lang} = pageAnswers
    //启动服务
    const cmdStr = `vite serve --mode ${choice},${lang},${page}`;
    exec(cmdStr, function (err, stdout, stderr) {
      if (err) {
        console.log('启动服务失败');
        console.log(err);
      } else {
        console.log('启动服务成功');
      }
    });
    //启动npm run watch
    const cmdStrWatch = `npm run watch -- ${lang}`;
    exec(cmdStrWatch, function (err, stdout, stderr) {
      if (err) {
        console.log('启动watch失败');
        console.log(err);
      } else {
        console.log('启动watch成功');
      }
    });
  })
})
