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

**二分查找**
```js
// 存在：返回目标值所在数组索引
function binarySearch(arr, target){
    var left = 0, right = arr.length - 1;
    let mid = 0;
    while(left <= right){
        mid = left + Math.floor( (right - left) / 2);
        if(arr[mid] === target){
            return mid;
        }else if(arr[mid] < target){
            left = mid + 1
        }else{
            right = mid -1
        }
    }
    return false
}

//leetcode 35. 搜索插入位置
function searchInsert(nums, arr){
    var l = 0, r = nums.length -1, ans = r + 1;
    while(l <= r){
        let mid = (r - l >> 1) + l; //向下取整
        if(target <= nums[mid]){
            ans = mid
            r = mid - 1
        }else{
            l = mid + 1
        }
    }
    return ans
}

function searchInsert(nums, arr){
    var l = 0, r = nums.length -1;
    while(l <= r){
        //向下取整，left + (right - left) / 2 就和(left + right) / 2 效果相同，但前者能避免值溢出
        let mid = (r - l >> 1) + l; 
        if(target < nums[mid]){
            r = mid - 1
        }else{
            l = mid + 1
        }
    }
    return l
}
```

leetcode 401 [https://leetcode-cn.com/problems/binary-watch/]
```js
function readBinaryWatch(n){
    let res = [];
    dps(0, res, 0, n);
    return res;
}
/*
* time 二进制表示的时间, res结果数组, index判断当前是否亮灯索引, n剩余可亮灯数量 
*/
function dps(time, res, index, n){
    const hr = time >> 6, min = time & 0b111111;
    if(hr > 11 || min > 59){
        return;
    }
    if(n === 0){
        res.push(`${hr}:${min > 10 ? min: ('0'+min)}`);
        return;
    }
    while(index <= 10 - n){
        dps(time | (1 << index), res, ++index, n-1);
    }
}
```
DFS (Depth First Search) 深度优先搜索 <br>
BFS (Breadth-First Search) 广度优先搜索
DP(Dynamic Plan) 动态规划 <br>
backtrack 回溯

Math.floor // floor地板
Math.ceil   // ceil天花板


反转链表
```js
var reverseList = function(head) {
    /* 
        类比思考 反转数组思路 双端指针实现
        while (l < r) swap(a, l++, r--)
        数组位置的交换是这样 [a[i], a[j]] = [a[j], a[i]]
        但是 单链表只能依次通过 next 访问 不能通过索引访问 
        链表的交换需要扩展一个指针 即next
        cur 当前项
        prev 上一项
        cur.next 当前指针指向
        [ cur.next, prev, cur ] = [prev, cur, cur.next]
        上面这段ES6语法表示
        当前cur 的指针next 指向prev上一项 并且 交换迭代prev 和 next
    */
    let [p, c] = [null, head]

    while (c) [c.next, p, c] = [p, c, c.next]

    return p
};

var reverseList = function(head) {
    let pre = null;
    let node = head;
    while(node){
        let temp = node.next;
        node.next = pre;
        pre = node;
        node = temp;
    }
    return pre;
};

/* 递归实现 */
var reverseList = function(head){
    if(head.next === null) return head;
    var last = reverseList(head.next);
    head.next.next = head;
    head.next = null

    return last
}
```

```js
//数组缓存
function fibonacci(n){
    var arr = new Array(n).fill(0)
    arr[0] = arr[1] = 1
    for(var i=2; i<n; i++){
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr[n-1]
}
// 变量缓存
function fibonacci(n){
    var resn = pre1 = pre2 = 1
    for(var i=2; i<n; i++){
        [resn, pre1] = [pre1+pre2, pre2]
        pre2 = resn
    } 
    return resn
}
//数组递归
function fibonacci(n){
    var arr = [1, 1]
    if(arr[n-1] === void(0)){
        return arr[n-1] = fb(n-1) + fb(n-2)
    }
    return arr[n-1]
}
```
数字转千分位
```js
function parseNum(str){
    return str.replace(/\d{1,3}(?=(\d{3})+$)/g, function(s){return s+','})
}

num.toLocaleString('en-US') 
// 如(12345678.234566677).toLocaleString() 输出  "12,345,678.235"

function parseNum(num){
    //异常处理
    var [left, right] = num.toString().split('.');
    left = left.split('').reverse();
    var i=0;
    while(i < left.length && left[i+2]){
        left[i+3] += ',';
        i += 3;
    }
    right = right ? ('.'+right):'';
    return left.reverse().join('')+ right;
}

```


https://www.cnblogs.com/onepixel/p/7674659.html

labuladong： https://mp.weixin.qq.com/mp/homepage?__biz=MzAxODQxMDM0Mw==&hid=1&sn=85a6bce3d32ba586bac86ccdbd4eb01e&scene=18#wechat_redirect
