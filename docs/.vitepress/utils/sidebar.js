/*
* 读取docs目录下的md文件，通过date进行排序
*/

const loadfile = require('./loadfile.js')
const BASE_DIR = 'docs/';  

const filterFileByPath = function(filelist, path){
    return filelist.filter((item)=>{
        return item.filepath.indexOf(path) >= 0
    })
}

const getFilterFileArr = async function(path){
  const loadfileList = await loadfile(BASE_DIR)
  if(!Array.isArray(loadfileList) || loadfileList.length < 1){
    console.log('loadfileList error, empty file directory !')
    return []
  }

  if(path === '/'){
    return loadfileList.length > 0 ? loadfileList.map((item)=>{
      return {
        text: item.filedata.title || '标题被ci了', 
        link: "/" + item.filepath.replace(".md", "").replace('docs/', ""), 
    }}) : []
  }

  const filearr = filterFileByPath(loadfileList, path)
  // console.log(path, ' 111111111 path 22222222222222 filearr: ',  filearr)
  return filearr.map(item=>{
    return {
      text: item.filedata.title || '标题被ci了', 
      link: "/" + item.filepath.replace(".md", "").replace('docs/', ""), 
    }
  })
}

const sidebar = async ()=>{
  return {
    '/basics/': [{
      text: '基础',
      children: await getFilterFileArr('/basics/'),
    }],
    '/special/': [{
      text: '进阶',
      children: await getFilterFileArr('/special/'),
    }],
    '/resume/': [{
      text: '简历',
      children: await getFilterFileArr('/resume/'),
    }],
    '/': [{
      text: '首页',
      children: await getFilterFileArr('/')
    }]
  }
}

module.exports = sidebar