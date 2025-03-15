const union = require('./union');

console.log(union([1,2,3], [2,3,4]));

console.log(union(['a'],['b']));

console.log(union([{a:{b:10}}],[{a:{b:20}}]));

console.log(union([{b:10, c:{z:{t:5, _t:5},f:[4]}},2],[{b:10,c:{z:{t:5,_t:5},f:[4]}},'2']));