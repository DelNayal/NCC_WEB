let arr = ["a","b","c","d","e","f","a","c","c","d","a","b","e"];
let result =arr.reduce((pre,curr)=>{
    let count= pre[curr] ?? 0;
     pre[curr] = count +1;
     return pre;
    },{});
console.log(arr);
console.log(result);
