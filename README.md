# page-template

国际官网站点项目模板

## 项目运行

### 一、模板创建

[//]: # (代码块开始)

```bash
创建组件命令： npm run create-template
创建页面命令： npm run create-page
```

[//]: # (代码块结束)

### 二、组件模板及页面说明

关于组件加载组件，以%%-{templateName}-%%,组件会替换index.html页面中的相关组件，index-prod.html为最终呈现效果。
动态加载相关信息 以##开头，例如 ##title = 123,会替换index.html页面中{{title}}为123

### 三、项目运行

[//]: # (代码块开始)

```bash
npm run watch
监听项目文件修改，自动打包
``` 

[//]: # (代码块结束)

### 四、项目打包及国际化

```bash
npm run generate -- {{lang}}
打包项目，lang为语言，例如：npm run generate -- de,默认为en
国际化模板[i18]{*}[/i18],例如：[i18]banner.title[/i18]
国际化css部分需要在html页<style></style>标签中添加，例如：.banner{background-image: url([i18]banner.bg[/i18]);}
```
