# `Js_Base` - 常见方法汇总

> 数组 / 字符串 / 数字 / 对象 / 时间 等一些常见方法的汇总。

## `Array`

### 检测数组

- **`Array.isArray(arr)`**

  **具体可访问 [MDN - `Array.isArray()` ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)**

  ```js
  let a = [1, 2, 3];
  Array.isArray(a); // true
  ```

- **`Object.prototype.toString.apply(arr)`**

  ```js
  let a = [1, 2, 3];
  Object.prototype.toString.apply(a); // "[object Array]"
  Object.prototype.toString.call(a); // "[object Array]"
  ```

- **`instanceof`**

  - **`instanceof` 运算符用来检测 `constructor.prototype` 是否存在于参数 `Object` 的原型链上。**

  - **`constructor.prototype` 是否是一个对象的长辈。**

    ```js
    let a = [1, 2, 3];
    a instanceof Array; // true
    a instanceof Object; // true
    ```

### `Methods`

#### 添加 / 删除

- `push()` - 向**数组末尾添加**一个或者更多元素，返回新的长度。

- `unshift()` - 向**数组开头添加**一个或者更多元素，返回新的长度。

- `pop()` - **删除数组最后一个**元素并返回删除的元素。

- `shift()` - **删除数组的第一个**元素并返回删除的元素。

  **必然会改变原数组。 🍌**

  **`push(后加) && unshift(前加)` - 返回数组的长度，可添加多个。**

  **`pop(后删) && shift(前删)` - 返回被删除的数据，没有参数，只能删一个。**

  ```js
  let arr = ["1"];
  arr[arr.length] = "2"; // 相当于push方法。
  ```

  **⚠️ 注：队列方法 (`FIFO`) - `push() && shift()` - `ps队列`**

  **⚠️ 注：栈方法 (`FILO`) - `push() && pop()` - `pp栈`**

#### 转换方法

- `toString()` - 把数组转换为字符串，并返回结果。

- `valueOf()` - 返回数组对象的原始值。

- `toLocaleString()` - 把数组换为本地数组，并返回结果。

- `join()` - 把数组的所有元素放入一个字符串。通过指定参数分隔符进行分隔。

  **以上方法 都不会改变原数组。 🥥**

  ```js
  // 如果有一项是 `null` 或者 `undefined` 则返回的结果是以 空字符 显示。
  let arr = [null, 1];
  arr.toString(); // ', 1'
  ```

#### 排序方法

- `reverse()` - 用来颠倒数组中元素的顺序。

- `sort` - 对数组中的元素进行排序，可接受一个参数 作为 比较条件。

  **以上方法都会改变原数组。 🍌**

  **以上的返回值 就是 改变后的数组，不生成新的数组。**

  ```js
  // sort 会调用每个数组项的 toString 然后进行比较。
  [2, 1, 10, 5].sort(); // [1, 10, 2, 5] // 因为 '5' > '10' // true
  // sort() 可以接收一个 比较函数
  // x1 < x2 - 为负数
  // x1 = x2 - 为0
  // x1 > x2 - 为正数
  function compra(x1, x2) {
    if (x1 < x2) {
      return -1;
    } else if (x1 === x2) {
      return 0;
    } else {
      return 1;
    }
  }

  // 如果调换 升降序 return 相反即可。
  // 如果 数值类型 或者 valueOf() 数值类型 直接相减即可。
  function compraA(x1, x2) {
    return x2 - x1;
  }
  let a = [1, 0, 10, 6];
  a.sort(compraA); // 降序 [10, 6, 1, 0];
  ```

#### 操作方法

- `concat` 用于连接两个或者多个数组，**不会改变原数组 🥥**，返回拼接后的数组副本。

  ```js
  // concat - 参数可以是具体的值 也可以是数组对象(拼接数组里面具体值🍓) 可多个
  `array.concat(pas, ..., pas);`; // 返回拼接后的数组副本。
  let a = [1, 2, 3];
  a.concat(4, 5, 6, [7, 8]); // [1, 2, 3, 4, 5, 6, 7, 8]
  console.log(a); // [1, 2, 3]
  ```

- `slice` 可以从已有数组中的返回选定的元素，**不会改变原数组 🥥**

  - **包头不包尾 🍓 - 开始结束都取的下标 🍓 - 不改变原数组 🍓**
  - **如果结束小于开始 返回空数组**

  ```js
  `array.slice(start, end);`;
  // start - 可选参数 - 开始位置下标 -负数从尾部开始算起(-1最后一个,-2倒数第二个..以此类推)
  // end - 可选参数 - 数组结束位置下标 - 如果没有指定就从开始截取到结尾。
  // 如果参数是负数，那么就是从数组尾部开始算起的元素。
  // 如有负数 就 length+(负数) [-2, -1] 和 [3, 4] 情况一样 (length=5的时候)
  let a = [1, 2, 3];
  let b = a.slice(); // 如果什么都不填写 返回一个新的数组
  b[1] = 6;
  console.log("a", a); // [1, 2, 3]
  console.log("b", b); // [1, 6, 3]
  a.slice(1); // [2, 3] 截取到最后
  a.slice(-2); // [2, 3] 从倒数第二个元素(第一个元素)开始截取
  a.slice(1, -1); // [2] 从第一个元素 截取到 倒数第一个(第三个元素) 但是不包括结尾
  ```

- `splice` 可以用于 **添加/删除** 数组中的元素。 **会改变原数组 🍌**

  - **会改变原数组 🍓 - 可删除(第二个参数是删除个数)可以插入(有第三个参数)**
  - **如果仅删除一个元素，则返回一个元素的数组，没有删除，就返回空数组。**

  > **删除 2 个参数 (0, 2（个数）) 从 0 开始删除 2 个**
  >
  > **插入 3 个参数 (开始 index, 删除 0, 插入的数据 可插入多个)**
  >
  > **替换 3 个参数 (index, 1, 替换的数据)**

  ```js
  `array.splice(index, howmany, item1...itemX);`;
  // index - 必需参数 - 下标 - 必须是数字
  // howmany - 可选参数 - 删除多少个元素 - 必须数字 - 可以是'0'
  // - 如果没有此参数，则从 index 删除到结尾的所有元素
  // item1...itemX - 可选参数 - 要添加到数组的新元素
  // 返回值 - 如果删除了子元素，则返回 被删除元素 的数组。
  // - 删除-返回删除项  插入-返回空值 替换-返回删除项
  let a = [1, 2, 3];
  a.splice(-1); // [3] 可接收负数 和 `slice` 情况一样 length+负数=下标
  console.log(a); // [1, 2]
  a.splice(0, 0, 3, 4, 5); // [] 返回空数组
  console.log(a); // [3, 4, 5, 1, 2]
  a.splice(1, 1, 66); // [4] 将4替换成66
  console.log(a); // [3, 66, 5, 1, 2]
  ```

#### 位置方法

- `indexOf` - 返回数组中某个指定元素的位置。

- `lastIndexOf` - 搜索数组中的元素，并返回它最后出现的位置。

  - **没有找到指定的元素返回 `-1`。**

  ```js
  // 这两个方法差不多，只是从开头 | 结尾 查找的不同。
  `array.indexOf(item,start)``array.lastIndexOf(item,start)`;
  // item - 必需 - 规定要查找的元素 - 对象等引用值也可以查找，只要指针相同即可(呃..引用对象其实都一样...)。
  // start - 可选的整数参数 - 他的值就是 0 到 length - 1 的数字
  // - indexOf 是从开始检索数组
  // - lastIndexOf 也是从开始检索数组，如果省略该参数，则从最后一个元素开始检索。
  // 返回值 - 元素在数组中的位置，如果没有搜索到则直接返回 -1
  // - lastIndexOf 不同的一点就是 返回元素在数组最后一次出现的位置(索引)。
  ```

- `findIndex` -返回传入一个测试条件(函数) 符合条件的数组第一个元素的位置。

  - 当查找到第一个返回 `true` 时，`findIndex`返回索引，之后不会再调用执行函数。
  - 如果没有符合条件的元素返回 `-1`
  - **🍓 对空数组，函数是不会执行的。 不改变原数组 🥥**

  ```js
  `array.findIndex(function(currentValue, index, arr), thisValue)`;
  // currentValue - 必需 - 当前元素
  // index - 可选 - 当前元素索引
  // arr - 可选 - 当前元素所属的数组对象(原数组对象)
  // thisValue - 可选 - 可指定执行当前函数的this值，默认为 `undefined`

  // 只要找到，就不会再执行之后的函数了。 🍓
  const arr = [1, 2, 3, 4];
  arr.findIndex((item) => {
    console.log(item); // 1 2 这里3 4就不会执行了
    return item === 2;
  }); // 1

  // 不会改变数组的原始值。
  arr.findIndex((item) => {
    item = item + 1; // 虽然这样改写了 但是不会改变原数组 只执行到 第一个 就停止了
    return item === 2;
  }); // 0 - 这里因为 item 改变 下标就为0了
  console.log(arr); // [1, 2, 3, 4]

  // 引用地址 则不同 - 只判断栈指针 指向
  const arr1 = [
    { a: 1, b: 2 },
    { a: 2, b: 5 },
  ];
  arr1.findIndex((item) => {
    item.b = 3;
    // 但是 如果是 引用值，就会发生改变(这个是肯定的 只判断引用地址的指针是否改变)
    // 但是也是 只执行到 符合条件的 就停止执行了。
    return item.a === 1;
  });
  console.log(arr1); // [{a: 1, b: 3}, {a: 2, b: 5}]
  ```

#### 迭代方法

- `every` - 数组中的每一项运行给指定函数，如果**每一项都为 `true` 才会返回 `true`**

- `some` - 数组中的每一项运行给指定函数，**只要有一项满足为`true`就会返回`true`**

- `forEach` - 对数组中的每一项运行指定函数，**没有返回值**

- `map` - 数组中的每一项运行指定函数，**并返回处理后的结果组成的新数组。**

- `filter` - 数组中的每一项运行指定函数，**返回结果为 true 的元素组成的新数组**

- `find` - **返回符合条件的数组的第一个元素值，如果找到符合条件的，之后不会再调用，没有则返回 `undefined`**

  **以上所有方法，都不会对空数组进行检测，也不会改变原始数组。🥥**

  ```js
  `array[methods-以上方法](function(currentValue, index, arr){}, thisValue)`;
  // function - 必需 - 数组中 遍历 时候使用的函数
  // currentValue - 必需 - 当前元素的值
  // index - 可选 - 当前元素索引
  // arr - 可选 - 当前元素所属的数组对象(原数组对象)
  // thisValue - 可选 - 可指定执行当前函数的this值，默认为 `undefined`

  let a = [
    {
      name: "a",
      num: 1,
    },
    {
      name: "b",
      num: 2,
    },
  ];
  let mapA = a.map((item, index, array) => {
    console.log(array, "array"); // [{…}, {…}] 如下展示
    return (item.id = item.name + item.num);
  });

  console.log("a", a); // [{…}, {…}] 如下展示 因为是执行了操作方法 所以才会对象里面添加属性
  console.log("mapA", mapA); // ["a1", "b2"] 返回的是每次函数调用的结果组成的`数组`
  // (2) [{…}, {…}]0: {name: "a", num: 1, id: "a1"}1: name: "b"num: 2id: "b2"__proto__: Objectlength: 2__proto__: Array(0) "array"
  ```

##### 归并

- `reduce` - **将数组元素计算为一个值（从左到右），并返回。**

- `reduceRight` **将数组元素计算为一个值（从右到左），并返回。**

  **返回一个最终计算后的值， 以上方法不会对空数组执行，也不会改变原始数组。🥥**

  ```js
  // 可以接受一个函数作为累加器，将数组每个值都计算一次，并返回一个最终值。
  `array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`
  `array.reduceRight(function(total, currentValue, currentIndex, arr), initialValue)`
  // function - 必需 - 数组中 遍历 时候使用的函数
  	// total - 必需 - 初始值，或者计算结束后的返回值
  	// currentValue - 可选 - 当前元素
  	// currentIndex - 可选 - 当前元素的索引值
  	// arr - 可选 - 当前元素所属的数组对象(原数组对象)
  // initialValue - 可选 - 你传递给函数的初始值

  ** 这个函数返回的任何值都会做为第一个参数自动传给下一项 **
  ```

  [友情链接~](https://www.jianshu.com/p/0a3c6cbdeb55)

## `Skill`

### 数组降维度

`flat()` 方法会移除数组中的空项。

```js
var arr4 = [1, 2, , 4, 5];
arr4.flat();
[1, 2, 4, 5];
```

- 二维数组

  ```js
  let arr = [[1], [2], [3]];
  arr = Array.prototype.concat.apply([], arr);
  // ⚠️ 这里是实用了 apply 的 第二个参数 数组参数的特性，转为二维数组了
  console.log(arr); // [1, 2, 3]

  let array = [[1], [2], [3]];
  array = array.flat(2);
  // ⚠️ flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
  // ⚠️ params1 - 指定要提取嵌套数组的结构深度，默认值为 1。
  console.log(array); // [1, 2, 3] - 返回值: 一个包含将数组与子数组中所有元素的新数组。
  ```

- 多维数组

  ```js
  // ES6之数组的flat(Infinity)扁平化，可以实现多维数组转成一维数组
  let arrMore = [1, 2, [3], [[4]]];
  // 使用 Infinity 作为深度，展开任意深度的嵌套数组
  arrMore = arrMore.flat(Infinity);
  console.log(arrMore); // (4) [1, 2, 3, 4]
  ```

### `Array fill('')` - 填充数组

```js
let arr = Array(5).fill("");
console.log(arr); // outputs (5) ["", "", "", "", ""]
```

### `new Set()` - 获取数组的唯一值

```js
const cars = [1, 2, 3, 3, 1];
const uniArrayForm = Array.from(new Set(cars));
console.log(uniArrayForm); // [1, 2, 3];

const uniSpreaOperator = [...new Set(cars)];
console.log(uniSpreaOperator); // [1, 2, 3]
```

### 使用展开运算符 合并对象和对象数组

```js
// merging an array of objects into one
const cities = [
  { name: "Paris", visited: "no" },
  { name: "Lyon", visited: "no" },
  { name: "Marseille", visited: "yes" },
  { name: "Rome", visited: "yes" },
  { name: "Milan", visited: "no" },
  { name: "Palermo", visited: "yes" },
  { name: "Genoa", visited: "yes" },
  { name: "Berlin", visited: "no" },
  { name: "Hamburg", visited: "yes" },
  { name: "New York", visited: "yes" },
];

const result = cities.reduce((accumulator, item) => {
  return {
    ...accumulator,
    [item.name]: item.visited,
  };
}, {});

console.log(result);
/* outputs
Berlin: "no"
Genoa: "yes"
Hamburg: "yes"
Lyon: "no"
Marseille: "yes"
Milan: "no"
New York: "yes"
Palermo: "yes"
Paris: "no"
Rome: "yes"
*/
```

### 数组的 `map` 方法 - `Array.from()`

- `Array.from()` 还可以接受 第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，然后将处理的值放入返回的数组中。

  ```js
  const cities = [
    { name: "Paris", visited: "no" },
    { name: "Lyon", visited: "no" },
    { name: "Marseille", visited: "yes" },
    { name: "Rome", visited: "yes" },
    { name: "Milan", visited: "no" },
    { name: "Palermo", visited: "yes" },
    { name: "Genoa", visited: "yes" },
    { name: "Berlin", visited: "no" },
    { name: "Hamburg", visited: "yes" },
    { name: "New York", visited: "yes" },
  ];

  const cityNames = Array.from(cities, ({ name }) => name);
  // ⚠️ 这里只返回 name 的值 然后组成数组。
  console.log(cityNames);
  // outputs ["Paris", "Lyon", "Marseille", "Rome", "Milan", "Palermo", "Genoa", "Berlin", "Hamburg", "New York"]
  ```

### 数组去重的多种方法

- **`Set` - 最常用**

  ```js
  Array.prototype.unique = function () {
    return [...new Set(this)];
  };
  var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5];
  array.unique();
  ```

- **`Map`**

  ```js
  Array.prototype.unique = function () {
    const tmp = new Map();
    return this.filter((item) => {
      // 数组的过滤
      return !tmp.has(item) && tmp.set(item, 1); // Map的 has 和 set(key value)
    });
  };
  var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5];
  array.unique(); // [1, 2, 3, 43, 45, 4, 5]
  ```

- **`Array.prototype.indexOf()`**

  ```js
  Array.prototype.unique = function () {
    return this.filter((item, index) => {
      return this.indexOf(item) === index;
    });
  };
  var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5];
  array.unique(); // [1, 2, 3, 43, 45, 4, 5]
  ```

- **`Array.prototype.includes()`**

  ```js
  Array.prototype.unique = function () {
    const newArray = [];
    this.forEach((item) => {
      if (!newArray.includes(item)) {
        newArray.push(item);
      }
    });
    return newArray;
  };
  var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5];
  array.unique(); // [1, 2, 3, 43, 45, 4, 5]
  ```

- **`Array.prototype.reduce()`**

  ```js
  Array.prototype.unique = function () {
    return this.sort().reduce((init, current) => {
      if (init.length === 0 || init[init.length - 1] !== current) {
        init.push(current);
      }
      return init;
    }, []);
  };
  var array = [1, 2, 3, 43, 45, 1, 2, 2, 4, 5];
  array.unique(); // [1, 2, 3, 43, 45, 4, 5]
  ```

### `filter` - 过滤空值

```js
let result1 = [1, 2, 0, undefined, null, false, ""].filter(Boolean);
console.log(result1);
```

### `Array.from()` - 快速生成一个递增小组

```js
Array.from({ length: 10 }, (val, index) => index);
// [0,1,2,3,4,5,6,7,8,9,10]
```

## `String`

### 字符方法

- `charAt()` - 返回指定位置的字符，第一个为 0，第二个为 1，依次类推。

- `charCodeAt()` - 返回指定位置字符的 `Unicode` 编码。第一个 0，第二个 1，依次类推。

  ```js
  eg:
  let str = 'hello';
  str.charAt(1) // 'e'
  str.charCodeAt(1) // '101' 返回的是字符 小e 的编码
  str[1] // 'e' 这样也可以访问
  ```

### 字符串方法

#### `concat()` - 连接字符串

**用于连接两个或者多个字符串， 返回连接后的新字符串，类似 字符串的 '+' 操作。**

#### `slice()`

#### `substr()`

#### `substring()`

**都不会改变原来的字符串 返回的都是截取的字符串 🥥**

```js
var strVal = "hello world";
// ⚠️ 三种情况 对比如下 ⬇️
// 正数情况
// 一个参数 都是截取到最后 没有毛病
console.log(strVal.slice(3)); // 'lo world'
console.log(strVal.substring(3)); // 'lo world'
console.log(strVal.substr(3)); // 'lo world'
// 两个参数 slice & substring 都是3-7不包括结尾
// substr 是从3开始 截取7个
console.log(strVal.slice(3, 7)); // 'lo w'
console.log(strVal.substring(3, 7)); // 'lo w'
console.log(strVal.substr(3, 7)); // 'lo worl'

// 负数情况
console.log(strVal.slice(-3)); // ‘rld' -3+11=8
console.log(strVal.substring(-3)); // 'hello world' 0
console.log(strVal.substr(-3)); // 'rld‘ -3+11=8
console.log(strVal.slice(3, -4)); // 'lo w' 3, 7
console.log(strVal.substring(3, -4)); // 'hel' 3, 0 调换后 0 ,3
console.log(strVal.substr(3, -4)); // ’‘（空字符串） 3, 0 取不到为空
// slice 会将传入的 负数与长度（11）相加
// substring 会将所有的负数都转为0   并且会转换小的作为起始 大的作为结束
// substr(折中) 第一个参数加长度 第二个转为0
```

#### `replace()`

**不会改变原来的字符串 🥥 返回的是一个新的，替换后的字符串**

```js
gl.replace(params1, params2);
// params1  可以是 字符 也可以是 正则。 ⚠️
// params2	可以是 字符 也可以是 函数。	⚠️

// params2 是函数的情况
// 函数参数1 - item 表示匹配到的整个内容
// 🍃 函数参数2...(之后) - 就表示 第一个原子组(左往右 数第一个括号即可) 参数3-第二个 ...往后依次

// params2 是字符串的情况, 例如 $1 需要变成字符串~ '$1' 🍓
// 🍃$1 就表示第一个原子组(左往右 数第一个括号即可) ...往后依次 $2 $3
// 🍃$`表示匹配内容的左边  $'表示匹配内容的右边  $&表示匹配到的内容
// 🍃?<别名> 这样就是给 原子组起别名 然后替换的时候 $<别名>就可以替换了。
// 		(?<别名> ...) 写在原子组括号的最前面
// 🍃?: 应用在原子组里面 就是排除查找。 然后使用match等方法匹配的时候 就匹配不到了
// 		(?: ...) 写在原子组括号的最前面

// 注意 ⚠️🍓
// 在 正则表达式里面  使用 \1 \2 来表示第一个 第二个原子组。- 简写。 ...往后依次
```

#### `repeat()`

**字符串复制指定次数， 不改变原字符串 🍓**

```js
// 复制字符串 "Runoob" 两次
var str = "Runoob";
str.repeat(2); // RunoobRunoob
```

#### `indexOf()`

- `indexOf()` 方法可返回某个指定的字符串值在字符串中首次出现的位置。

- 如果没有找到匹配的字符串则返回 -1。

- ⚠️**注意：`indexOf()` 方法区分大小写。**

  ```js
  var str = "Hello world, welcome to the universe.";
  var n = str.indexOf("welcome"); // 13
  ```

#### `lastIndexOf()`

- `lastIndexOf()` 方法可返回一个指定的字符串值最后出现的位置，如果指定第二个参数 start，则在一个字符串中的指定位置从后向前搜索。

- 如果没有找到匹配字符串则返回 -1 。

- ⚠️**注意：`lastIndexOf()` 方法区分大小写。**

- 该方法将从后向前检索字符串，但返回是从起始位置 (0) 开始计算子字符串**最后出现的位置。**

  ```js
  var str = "I am from runoob，welcome to runoob site.";
  var n = str.lastIndexOf("runoob"); // 28
  ```

#### `includes()` - 方法用于判断字符串是否包含指定的子字符串

- 如果找到匹配的字符串则返回 true，否则返回 false。

- ⚠️ 注意：**`includes()` 方法区分大小写。**

  ```js
  var str = "Hello world, welcome to the Runoob。";
  var n = str.includes("world"); // true
  ```

#### `toLocaleLowerCase()`

**方法用于把字符串转换为小写 **

```js
stringObject.toLocaleLowerCase();
// 一个新的字符串，在其中 stringObject 的所有大写字符全部被转换为了小写字符。
```

- ⚠️ 与 `toLowerCase()` 不同的是，`toLocaleLowerCase()` 方法按照本地方式把字符串转换为小写。只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与 `toLowerCase()` 一样。

#### `toLocaleUpperCase()`

**方法用于把字符串转换为大写**

```js
stringObject.toLocaleUpperCase();
// 一个新的字符串，在其中 stringObject 的所有小写字符全部被转换为了大写字符。
```

#### `toLowerCase()` - 方法用于把字符串转换为小写

#### `toUpperCase()` - 方法用于把字符串转换为小写

#### **`startsWith()`** - 查找开始的字符串

#### **`endsWidth()`** - 查找结束的字符串

```js
"string".startsWith("s"); // true // 查找开始的字符串 区分大小与 返回 true || false
"string".endsWith("s"); // fasle // 查找结束的字符串 区分大小与 返回 true || false
```

## `Math`

- 随机数~

  ```js
  function generateRandomNum(minNum, maxNum) {
    let totalNum = maxNum - minNum + 1; // 2-5 4个数  但5-2=3 所以加一
    return Math.floor(Math.random() * totalNum + minNum);
  }
  generateRandomNum(2, 5); // 「2 3 4 5」 随机
  ```

- `Math.floor()` **下舍入 整数**

- `Math.ceil()` **上舍入 整数**

- `Math.abs()` **绝对值**

- `Math.random()` **返回 0 ~ 1 之间的随机数。**

- `Math.min()` & `Math.max()` **可以传递 1 到 多个 值; 不可以传递一个数组进去~**

- `Math.round()` **可把一个数字舍入为最接近的整数**

- `Number.toFixed(保留几位)` **虽然是`Number`的方法 - 可把 Number 四舍五入为指定小数位数的数字。**

- `Number.toString()` **`Number`方法 - 可把一个 Number 对象转换为一个字符串，并返回结果。**

---

```js
Math.max([1, 2, 3, 6]); // NaN
Math.max.apply(null, [1, 2, 3, 6]); // 6
```

---

### `++`操作

**既然 `n+=2` 那么 `%= |= x= /=` 都是可以的**

`++n` &`n++` 不参与运算的时候结果都是一样的，**参与运算的时候就需要注意了**~

```js
// 1+ ++n -> n=n+1; 1+n;
// 1+ n++ -> 1+n; n=n+1;
```

## `Object`

### `Object.keys/values/entries`

- `Object.keys`

  返回一个由一个**给定对象的自身可枚举属性组成的数组**，数组中属性名排列顺序和正常循环遍历对象时返回的顺序一致。

  ```js
  var arr = ["a", "b", "c"];
  console.log(Object.keys(arr)); // console: ['0', '1', '2']

  var obj = { 0: "a", 1: "b", 2: "c" };
  console.log(Object.keys(obj)); // console: ['0', '1', '2']
  // 随机排列的类数组对象
  var anObj = { 100: "a", 2: "b", 7: "c" };
  console.log(Object.keys(anObj)); // console: ['2', '7', '100']
  ```

- `Object.values`

  **返回一个给定对象自身的所有可枚举属性值的数组**，值的顺序与使用`for...in`循环顺序相同。

  ```js
  var obj = { foo: "bar", baz: 42 };
  console.log(Object.values(obj)); // ['bar', 42]

  var obj = { 0: "a", 1: "b", 2: "c" };
  console.log(Object.values(obj)); // ['a', 'b', 'c']

  console.log(Object.values("foo")); // ['f', 'o', 'o']

  // 使用数字键时，根据键按数字顺序返回的值
  var an_obj = { 100: "a", 2: "b", 7: "c" };
  console.log(Object.values(an_obj)); // ['b', 'c', 'a']
  ```

- `Object.entries`

  **返回一个给定对象自身可枚举属性的键值对数组**，其排列与使用 `for...in`循环遍历该对象时返回的顺序一致

  ```js
  const obj = { foo: "bar", baz: 42 };
  console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

  const myObj = Object.create(
    {},
    {
      getFoo: {
        value() {
          return this.foo;
        },
      },
    }
  );
  myObj.foo = "bar";
  console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]

  const obj = { a: 5, b: 7, c: 9 };
  for (const [key, value] of Object.entries(obj)) {
    console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
  }

  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
  });
  ```

  - 将 `Object` 转换成 `Map`

    `new Map()` 构造函数接受一个可迭代的 `entries`。 很容易将对象转换成`Map`。

    ```js
    var obj = { foo: "bar", baz: 42 };
    var map = new Map(Object.entries(obj));
    console.log(map); // Map { foo: "bar", baz: 42 }
    ```

### `Object.freeze/seal/isExtensible`

- `Object.freeze` && `Object.isFrozen`

  > `Object.freeze`
  >
  > **冻结**一个对象。**被冻结的对象是不可变的。**
  >
  > 1. 一个被冻结的对象再也不能被修改；
  > 2. 冻结了一个对象则**不能向这个对象添加新的属性**，**不能删除已有属性**。
  > 3. **不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。**
  > 4. **冻结一个对象后该对象的原型也不能被修改。**
  >
  > **但也不总是这样。下例展示了冻结对象不是常量对象**（**浅冻结**）。
  >
  > ```js
  > obj1 = {
  >   internal: {},
  > };
  >
  > Object.freeze(obj1);
  > obj1.internal.a = "aValue";
  >
  > obj1.internal.a; // 'aValue'
  > // 要使对象不可变，需要 递归冻结 每个类型为对象的属性（深冻结）。
  > ```

  > `Object.isFrozen`
  >
  > **判断一个对象是否被冻结**
  >
  > 返回值 - `Boolean`

- `Object.seal` && `Object.isSealed`

  > `Object.seal`
  >
  > **封闭**一个对象，**密封的对象可以改变其现有属性值。**
  >
  > 1. **阻止添加新属性并将所有现有属性标记为不可配置。**
  > 2. **当前属性的值只要原来是可写的就可以改变。**
  >
  > 密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。
  >
  > 属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义

  > `Object.isSealed`
  >
  > **判断一个对象是否被密封。**
  >
  > 返回值 - `Boolean`

- `Object.preventExtensions` && `Object.isExtensible`

  > `Object.preventExtensions`
  >
  > 让一个对象变的**不可扩展**，**也就是永远不能再添加新的属性。**
  >
  > 1. 不可扩展对象的属性可能仍然可被*删除*。尝试将新属性添加到不可扩展对象将静默失败或抛出 `TypeError`
  > 2. **仅阻止添加自身的属性。但其对象类型的原型依然可以添加新的属性。**
  > 3. **一旦将对象变为不可扩展的对象，就再也不能使其可扩展。**

  > `Object.isExtensible`
  >
  > **判断一个对象是否是可扩展。**
  >
  > 返回值 - `Boolean`

### `Object.assign`

**将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。**

```js
`Object.assign(target, ...sources)`; // 返回值 - 目标对象
// target - 目标对象
// sources - 源对象

// 如果目标对象中的属性 具有相同的键 ，则属性将被源对象中的属性覆盖。
// 后面的源对象的属性将类似地覆盖前面的源对象的属性。

const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

- **深浅拷贝问题**

  **`Object.assign` 拷贝的可 可枚举的属性值。**

  **假如源值是一个对象的引用，它仅仅会复制其引用值。🍓**

### `Object.create`

**创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。**

```js
`Object.create(proto[, propertiesObject])`;
// 返回值 - 一个带有指定原型和属性的 新对象
// proto - 必需 - 新创建对象的原型对象。
// propertiesObject - 可选 - 需要传入一个对象。
```

- **[可用 `Object.create`实现类式继承 - MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)**

### `Object.defineProperty/defineProperties`

- `Object.defineProperty`

  - `configurable` - **是否可以被删除 或者 重新被配置.**
  - `enumerable` - **是否可以遍历 枚举...**
  - `value` - **值**
  - `writable` - **是否可以修改**

  **会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。**

- `Object.defineProperties`

  **一次对多个属性进行设置**

```js
`Object.defineProperty(obj, prop, descriptor)`;

Object.defineProperty(user, "name", {
  value: "郭霖",
  writable: false, // 属性不可以修改~ 严格模式下就会有提示
  enumerable: false, // Object.keys for...in 啥的遍历
  configurable: false, // 不可以被删除 或者不可以被 重新配置(defineProperty)~ 严格模式下就会有提示
});
console.log(user.name); // 郭霖
delete user.name;
Object.defineProperties(user, {
  // 一次对多个属性进行设置  就用这个~
  name: {},
  age: {},
});
```

### `Other`

- `Object.fromEntries`

  **把键值对列表转换为一个对象。**

  ```js
  // 参数需要是一个可迭代对象 iterable
  const entries = new Map([
    ["foo", "bar"],
    ["baz", 42],
  ]);

  const obj = Object.fromEntries(entries);

  console.log(obj);
  // expected output: Object { foo: "bar", baz: 42 }
  ```

- `Object.getOwnPropertyDescriptor/getOwnPropertyDescriptors`

  - `Object.getOwnPropertyDescriptor`

    **查找特定属性的 特征**

  - `Object.getOwnPropertyDescriptors`

    **这个返回的就是 对象所有属性的特征**

  ```js
  const object1 = {
    property1: 42,
  };

  const descriptor1 = Object.getOwnPropertyDescriptor(object1, "property1");

  console.log(descriptor1.configurable);
  // expected output: true

  console.log(descriptor1.value);
  // expected output: 42
  ```

- `Object.getOwnPropertyNames`

  返回一个由指定**对象的所有自身属性的属性名**（**包括不可枚举属性**但不包括 Symbol 值作为名称的属性）组成的数组。

  > **一个对象，其自身的可枚举和不可枚举属性的名称被返回。**
  >
  > 返回值 - **在给定对象上找到的自身属性对应的字符串数组。**

  ```js
  var arr = ["a", "b", "c"];
  console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

  // 类数组对象
  var obj = { 0: "a", 1: "b", 2: "c" };
  console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

  // 使用Array.forEach输出属性名和属性值
  Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
    console.log(val + " -> " + obj[val]);
  });
  // 输出
  // 0 -> a
  // 1 -> b
  // 2 -> c

  //不可枚举属性
  var my_obj = Object.create(
    {},
    {
      getFoo: {
        value: function () {
          return this.foo;
        },
        enumerable: false,
      },
    }
  );
  my_obj.foo = 1;

  console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
  ```

- `Object.getPrototypeOf`

  - `Object.getPrototypeOf`

    **返回指定对象的原型**

    ```js
    const prototype1 = {};
    const object1 = Object.create(prototype1);

    console.log(Object.getPrototypeOf(object1) === prototype1);
    ```

    **说明 🍓： `Object.getPrototypeOf(Object) 不是 Object.prototype`**

    - ```js
      // 正确的方法是，Object.prototype是构造出来的对象的原型。
      var obj = new Object();
      Object.prototype === Object.getPrototypeOf(obj); // true
      Object.prototype === Object.getPrototypeOf({}); // true
      ```

- `Object.is`

  **判断两个值是否为同一个值。**

  ```js
  `Object.is(value1, value2)`;
  // value1 - 被比较的第一个值。	 value2 - 被比较的第二个值。
  // 返回值 - 一个 Boolean 类型标示两个参数是否是同一个值。
  ```

  **`Object.is()` 方法判断两个值是否为 `同一个值` 如果满足以下条件则两个值相等:**

  - 都是 `undefined`

  - 都是 `null`

  - 都是 `true` 或 `false`

  - 都是相同长度的字符串且相同字符按相同顺序排列

  - 都是相同对象（意味着每个对象有同一个引用）

  - 都是数字且

    - 都是 `+0`
    - 都是 `-0`
    - 都是 `NaN`
    - 或都是非零而且非 `NaN` 且为同一个值

    与 `==` `===` 不相同，不强制转换，不会将 `+0` 和 `-0`判为相等。

- `Object.prototype.toString.call/apply`

  **区分 `引用数据` 的类型， 判断某个对象属于哪种内置类型。**

  ```js
  // 可以判断出这些类型 `[object Null]` - 下列类型再判断时首字母大写~🍓
  // null、string、boolean、number、undefined
  // array、function、object、date、math
  ```

## `Date`

```js
const a = new Date(); // - 返回对象 可以 +new Date() 变成时间戳
const a = Date(); // - 返回字符串 就不可以进行转换操作了 会变成NaN
Date.now(); // 这样也能返回时间戳
```

### 打印`Log`

```js
console.time("for");
console.timeEnd("for"); // 标志一样就行
```

### 转换时间戳

```js
let date = new Date("1997-7-5 08:10:23");
console.log(+date); // 868061423000
console.log(Number(date)); // 868061423000
console.log(date.valueOf()); // 868061423000
console.log(date.getTime()); // 868061423000
```

### 封装一个 时间处理 库

**获取月份的时候 是从 0 开始的 需要加一**

```js
function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}
console.log(dateFormat(new Date("1997-7-5 08:10:23"))); // 1997-7-5 8:10:23
console.log(dateFormat(new Date("1997-7-5 08:10:23"), "YYYY年MM月")); // 1997年7月
```

**优秀的 日期处理库 `momentjs` - 🍓 还是有很多便捷的 时间相关的方法 - 减少重复造轮子的过程**

## `Sub`

---

**`'use strict'` - 多使用 严格模式编写代码**

---

### `true` && `false`

```js
false || 执行的代码;
true && 执行的代码;
```

### DOM

**`DOM` 节点元素 可以使用`for...of`来遍历**

**`\t\t` `\n` 在字符串中可以识别，但是`html`中只识别一个空格，如果还需要再加那就是 `&nbsp`**

```js
document.querySelectorAll("div, span"); //  - 这样可以一次查找多个~
```

### `typeof` - 判断定义变量

```js
typeof function a() {}  // function
typeof 也可以用来判断 有没有定义变量 如果没有返回 undefined; 如果只声明但是未赋值 也是 undefined
let a;
console.log(typeof a); // undefined
console.log(typeof ab); // undefined
```

### 模版字符串&&`label`

- **模版字符串是可以嵌套的**

  ```js
  let a = "a1";
  let b = "b1";
  console.log(`a=${a + `b=${b}`}`); // a=a1b=b1 模版字符串是可以进行嵌套的
  ```

### 标签模版

- **可以对标签里面的变量进行二次处理~**

  ```js
  let a = "haha";
  let b = "hbhb";
  tag`a=${a},b=${b}`;
  function tag(strings, ...args) {
    console.log(args); // ["haha", "hbhb"]
    // 字符串的数量 是大于变量的 在 字符串的 标签模版里面~
    console.log(strings); // ["a=", ",b=", "", raw: Array(3)]
  }
  ```

### 对手机号进行模糊处理

```js
function phone(mobile, len = 3) {
  return String(mobile).slice(0, len * -1) + "*".repeat(len);
}
console.log(phone(15122266151, 8)); // 151********
```

### 类型转换使用技巧

```js
// string - number
string*1 +string Number(string) // -有字符串的话就返回NaN (parseInt parseFloat)-如果字符串在前面就是 NaN了
// number - string
number+'' String(number) number.toString()
// string - array
stringify.split('')
// array - string
array.join('-') array.toString()
```

```js
let str = "123";
typeof str; // string
let str1 = new String("123");
typeof str1; // object
```

**为什么 `str` 也能 调对象的方法呢，是因为系统会 隐式的帮助你转换 并 调用方法**

```js
1 == true  // 两个等号的时候 会隐式转换成 数值类型 false-0 true-1
if (1) // 相当于 Boolean(1) 去判断的
let arr = [];
console.log(arr == 0); // true 会隐式转换成数字 Number([]) === 0
console.log(Number([2])); // 2
console.log(Number([1, 2, 3])); // NaN 多个数值 就会转换成 NaN
// 但是 [] 是引用类型 所以 就会判断为true if判断的时候 引用类型 也就都为true
Boolean({}) // true
Boolean([]) // true
```

### 显示转换成 `Boolean`

```js
!!!(
  // ! 一个 感叹号 做两件事情 取反和转换布尔类型
  Boolean()
);
```

### 值类型 和 引用类型的关联

```js
new String()  new Number() new Boolean()  - 这个 引用类型 object
'123' 123 true - 这是 值类型 但是不妨碍 我们使用里面的方法 会隐式转换成对象来调用~
let a = 88;
console.log(typeof a.valueOf()); // number
console.log(typeof a.toString()); // string
Number.isInteger() // 判断是不是一个 整数
Number.isNaN() // 判断是不是一个 NaN
Object.is(Number('askjdksa'), NaN) // 判断是不是一个 NaN
number.toFixed(2) // 保留几位小数 整数就是 .0000 啥的-保留几位留几位 - 转换之后是字符串类型
NaN == NaN // false
Number({}) // NaN
Number({ valueOf() {return '78'} }) // 78
```

### `null` && `undefined`

- **`null`- 引用类型 与`undefined` - 基本类型值类型**

- **如果要保存 引用类型 赋空 就是`null` 基本值类型就是 `undefined`**

- **未声明 或者 声明了未赋值 都是 `undefined`**

### `let` - `const`

- **`TDC` - 暂时性死区...**
- **`let / const` - 不影响 `window` 变量**

### `for` 循环

**for 循环参数**

> - `params1`- 初始值
> - `params2`- 为`true`执行
> - `params3`-改变变量(也可以作为执行代码)

**`break` - `continue` 是针对循环的，`return` 是针对当前函数的。**

#### `for`循环作 `label` 标签跳转

**`continue` - `break`都可以搭配标签做 运算**

```js
// for循环做label标签跳转
// 这种状态最适合 多层嵌套的时候使用
gl: for (let i = 1; i < 10; i++) {
  if (i % 3) continue gl;
  console.log(i); // 3 6 9
}
```

###
