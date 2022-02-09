/*
* 读取docs目录下的md文件，通过date进行排序
* @return fileInfo 数组, 数组: 
* fileInfo: { filepath, filedata }
* filepath: 文件相对BASE_DIR路径, filedata 根据 gray-matter 获取到的数据
*/

const fs = require("mz/fs");
const globby = require("globby");
const matter = require("gray-matter");

const getFileInfo = async function (BASE_DIR){
  const rootdir = await globby( [ BASE_DIR + "**/*.md" ], {
    ignore: ['**/node_modules']
  })

  if(!rootdir || !Array.isArray(rootdir) || rootdir.length < 1) {
    new Error('No folder found for .md files!')
    return []
  }

  let tasks = []
  rootdir.forEach((item)=>{
    tasks.push(
      new Promise(async (resolve)=>{
        const file = await fs.readFile(item, "utf-8")
        const { data } = matter(file)
        resolve( {
          filepath: item,
          filedata: data
        })

      }))
  })

  const filearr = await Promise.all(tasks) 
  return filearr
}

module.exports =  getFileInfo