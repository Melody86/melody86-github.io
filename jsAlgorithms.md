## 1. 数组去重 
  nums = [1,2,3,3,4,5,6,6,7] 通过 without(nums, 1,3,5) 去重1,3,5. 返回 [2,4,6,6,7]

```js
function without(){
    let nums = arguments[0];
    let args = Array.prototype.slice.call(arguments, 1);
    if(!Array.isArray(nums) || nums.length === 0){
        return [];
    } 
    if(args.length === 0){
        return nums;
    }
    nums.sort((a,b)=>{ return a -b });
    args.sort((a,b)=>{ return a -b });

    let res = [];
    let index = 0;
    nums.forEach((num)=>{
        let isContain = false;
        args.forEach((arg)=>{
            if(arg === num){
                isContain = true;
            }
        })
        if(!isContain){
            res.push(num);
        }
    })

    console.log('res', res)
    return res;
}
```

算法复杂度 m的n次

## 2.  