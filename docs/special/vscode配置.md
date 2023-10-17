---
date: 2023-10-18
title: vscode多人协作配置
tags:
  - vscode
describe: 
---

在新团队刚组件完成，或有新队员加入时，常常因为vscode配置不一致，每次修改代码自动保存时，都会自动转化格式，生成大量的diff文件。因此记录统一的配置，以减少这部分的人工成本。

在项目根目录中创建文件夹 .vscode, 并在.vscode文件夹中新建extensions.json文件和settings.json文件

```
|- .vscode
   |- extensions.json   # 配置项目中需要的插件
   |- settings.json     # 编辑器配置
```

settings.json

```json
{
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  // 当编辑器失去焦点时，自动保存更改了的编辑器
  "files.autoSave": "onFocusChange",
  // 配置文件关联 :任何 vue 后缀的文件会被认为是vue文件 
  "files.associations": {
    "*.vue": "vue"
  },
  // 编辑器字体大小
  "editor.fontSize": 18,
  // 若设置为 true，则自动从当前 Git 仓库的默认远程仓库提取提交
  "git.autofetch": true,
  // 在没有暂存的更改时提交所有更改
  "git.enableSmartCommit": true,
  // 每次保存的时候将代码按eslint格式进行修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 启用在vscode中重命名或者移动文件夹时自动更新导入路径的功能--js
  "javascript.updateImportsOnFileMove.enabled": "always",
  // 启用在vscode中重命名或者移动文件夹时自动更新导入路径的功能--ts
  "typescript.updateImportsOnFileMove.enabled": "always",
  // 每次保存的时候以下文件类型将代码按eslint格式进行修复
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
  // 路径映射
  "alias-skip.mappings": {
    "@": "/src",
    "~@/": "/src",
    "views": "/src/views"
  },
  // 在文件路径中指定要替换的前缀
  "vue-helper.componentPrefix": {  
    "alias": "@",
    "path": "src"
  },
}
```


