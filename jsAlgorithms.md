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

## 2. 快排
```js
function qsort(arr, left, right){
    if(arr.length < 1 || left >= right) return arr;
    let i = left,
    j = right,
    base = arr[left];

    while(i<j){
        // 先从右边往左边找: 由于条件i < j, 若先从左往右边查找，则停留的值arr[i]可能比基数base小，交换后base反而排在前面。
        // 若想先从左往右查找，只需把base设置在右侧即可
        while(i<j && arr[j] >= base){
            j--;
        }
        while(i<j && arr[i] <= base){
            i++;
        }

        if(i<j){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    arr[left] = arr[i];
    arr[i] = base;

    qsort(arr, left, i-1);
    qsort(arr, i+1, right);
    return arr;
}
```
