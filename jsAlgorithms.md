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
```
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