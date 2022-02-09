/*
* 读取docs目录下的md文件，通过date进行排序
*/

import { globby } from "globby"
import { fs } from "mz"
import { matter } from "gray-matter"

/*
* 格式化日期
*/
function rTime(date) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

/*
* 对vitepress中日期排序
*/
var compareDate = function (obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
};


/*
* 读取跟目录下的子目录列表，作为博客的一级目录
*/
async function getFirstDir(root){
  const dirs = await globby( [ BASE_DIR ], {
    onlyFiles: false, 
    deep: 1, 
    ignore: ["node_modules"],
  })

  return dirs
}


const getPages =  async (basedir) => {
  // 获取docs下目录数组
  const rootdir = await getFirstDir(basedir)

  //目录为空
  if(!rootdir || !Array.isArray(rootdir) || rootdir.length < 1) {
    new Error('No folder found for .md files!')
    return {
      sortAll: [],
      divdeAll: []
    }
  }

  const sortAll = []
  const divdeAll = []     //返回的对象
  const divdeArrObj = {}  //保存一级分类的数组对象

  //读取目录下所有文件
  let index = 0
  const pagesInfo = []
  for(let i=0; i<2; i++){
    pagesInfo[0] = [] // md内容数组
    pagesInfo[1] = [] // 完整路径数组
  }

  for(let i=0; i<rootdir.length; i++){
    let files = await globby([ rootdir[i] + '/*.md' ])
    if(files.length < 1){
      console.log('No .md files found in: ', rootdir[i])
      continue
    }
    divdeArrObj[rootdir[i]] = []
    for(let j=0; j<files.length; j++){
      pagesInfo[0].push(fs.readFile(files[j], "utf-8"))
      pagesInfo[1].push(files[j])
      divdeArrObj[rootdir[i]].push(index) //保存目录下对应 pagesInfo 的索引
      index++
    }
  }
  
  const pages = await Promise.all(pagesInfo[0])

  pages.forEach((item, index)=>{
    const { data } = matter(item)
    if(!data.date){
      new Error('No date attribute found in .md file: ', item)
    }else{
      data.date = rTime(data.date); 
    }

    let obj = {
      frontMatter: data,
      regularPath: `/${pagesInfo[1][index].replace(".md", ".html")}`,
      relativePath: pagesInfo[1][index],
    }
    sortAll.push(obj)

  })

  for(item of Object.keys(divdeArrObj)){
    divdeArrObj[item] = divdeArrObj[item].map(sub=>{
      const { data } = matter(pages[sub])
      return {
        text: data.title, link: `/${pagesInfo[1][sub].replace(".md", "")}`
      }
    })
  }


  sortAll.filter((item) => !item.frontMatter.page);

  //根据日期进行排序
  sortAll.sort(compareDate);

  return {
    sortAll,
    divdeAll: divdeArrObj
  };
  

  // Promise.all(
  //   await rootdir.map(async (item)=>{

  //     let files = await globby([ item + '/*.md' ])
  //     if(files.length < 1){
  //       console.log('No .md files found in: ', item)
  //       return
  //     }

  //     pages.divdeAll[item] = []
      
  //     await files.map(async (file)=>{
  //       const content = await fs.readFile(file, "utf-8")
  //       const { data } = matter(content)
  //       if(!data.date){
  //         new Error('No date attribute found in .md file: ', file)
  //       }else{
  //         data.date = rTime(data.date); 
  //       }

  //       let obj = {
  //         frontMatter: data,
  //         regularPath: `/${file.replace(".md", ".html")}`,
  //         relativePath: file,
  //       }
  //       let divideObj = {
  //         text: data.title, link: `/${file.replace(".md", "")}`
  //       }
  //       pages.sortAll.push(obj)
  //       pages.divdeAll[item].push(divideObj)
  //     })

  //   })
  // )





  // 获取docs目录下md文件, 目录分为两层，方便进行分类
  // const paths = await globby(["docs/**/*.md"], {
  //   ignore: ["node_modules"],
  // });

  // let pages = await Promise.all(
  //   paths.map(async (item) => {
  //     const content = await fs.readFile(item, "utf-8");
  //     const { data } = matter(content);
  //     if(!data.date){
  //       console.log(data)
  //     }
      
  //     data.date = rTime(data.date); 
  //     return {
  //       frontMatter: data,
  //       regularPath: `/${item.replace(".md", ".html")}`,
  //       relativePath: item,
  //     };
  //   })
  // );
  // console.log('await Pages:  ', pages)

  //去除最外层 README.md文件, page: true为标识, 用于区分index.md (home: true)
  // pages.sortAll.filter((item) => !item.frontMatter.page);

  // //根据日期进行排序
  // pages.sortAll.sort(compareDate);

  // return pages;
};


export default getPages