# `Js_Adv` - 常用函数

> `Js`的一些常用函数说明，组合函数`compose` / 高阶函数 / 防抖节流 / 柯里化 等等。

## `compose` & `pipe`

### 将需要 嵌套执行 的函数平铺。

### `compose`

嵌套执行 指的是，**一个函数的返回值 将作为 另外一个函数的参数。**

**将几个有特点的函数 拼凑在一起，合成一个崭新的函数。**

> 实现函数式编程中的`Pointfree`，使我们专注于转换而不是数据。

```js
// 典型的命令式编程
let calculate = (x) => (x + 10) * 10;
console.log(calculate(10));
```

```js
// 改进 - 关注动作 + *
let add = (x) => x + 10;
let multiply = (y) => y * 10;
console.log(multiply(add(10)));
```

```js
// 根据 复合函数 的定义，我们需要将上述两个函数 合成 一个函数
let compose = (f, g) => {
  // 闭包
  return function (x) {
    return f(g(x));
  };
};
let calculate1 = compose(multiply, add); // 从右往左🍓的执行顺序，add先 multiply后。
console.log(calculate1(10));
```

```js
// 🍓 复合函数 执行的顺序 是 自右向左 依次执行
let compose1 = function() {
  let args = [].slice.call(arguments);
  return function(x) {
    // reduce - 从左往右执行  reduceRight - 从右往左执行
    return args.reduceRight(function(res, cb) => {
                            return cb(res);
					 									}, x)
}
}
let calculate2 = compose1(multiply, add); // 传递参数 依旧是从左往右传⚠️⚠️执行是 从右往左执行⚠️⚠️⚠️
```

```js
// es6写法
let add = (x) => x + 10;
let multiply = (y) => y * 10;
const calculate3 =
  (...args) =>
  (x) =>
    args.reduceRight((res, cb) => cb(res), x);
let fn = calculate3(add, multiply);
fn(2); // 30
```

- **`compose` 可以设计 和 复用函数逻辑**

- **`compose`的存在 一般是服务于中间件的**

  `redux`中间件 就是通过`compose`实现的。

  `webpack loader` 也是从右往左 执行，也是 选择了`compose`来实现的。

### `pipe`

函数组合，**组合是 函数式编程中 非常重要 的思想，就是将 多个函数组合在一起 ，以便能形成一个 新函数。**

**函数式编程中，纯函数 是 只做一件事， 实现多个功能，就利用函数组合 来实现。🍓🍓🍓**

- **`pipe` 是 `compose` 函数的复制品， 唯一修改的就是 数据流方向。**

- **`pipe`是从参数左往右传递，执行是从左往右执行**

```js
let add = (x) => x + 10;
let multiply = (y) => y * 10;
const pipe =
  (...args) =>
  (x) =>
    args.reduce((res, cb) => cb(res), x);
let fn = pipe(add, multiply);
fn(2); // 120
```

## 高阶函数

**`Js`中的函数都是 指向某个变量，函数的参数又可以接收某个变量， 所以可以接收另一个函数作为参数。这种函数就叫高阶函数。**

> 函数 既可以被当作参数，又可以被当作 输出值。
>
> 高阶函数 是对其他函数进行操作的函数，可以将他们作为参数 或返回 它们。

**高阶函数是一个函数，他接收 函数作为参数 或者将 函数作为输出 返回。**

### `map / reduce / filter`

- **`map`需求：创建一个新数组， 其中的值是原数组值的两倍。**

```js
const arr1 = [1, 2, 3, 3];
```

```js
// for
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}
console.log(arr2);
```

```js
// map
const arr3 = arr1.map((item) => item * 2);
console.log(arr3);
```

- **`reduce`需求：对数组实现求和**

```js
let sum = arr1.reduce((prev, cur) => {
  return prev + cur;
}, 0);
console.log(sum);
```

- **`reduce`需求：数组去重**

```js
let newArr = arr1.reduce((prev, cur) => {
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
}, []);
console.log(newArr);
```

**`filter` - 对数组进行过滤和筛选，返回新数组。**

### `flat`

**数组扁平化，该方法会返回一个新数组，对原数组没有影响。🍓🍓🍓**

```js
let arr = [1, 2, 3, [5, 6]];
let arr6 = arr.flat(); // flat 默认数值为1
console.log(arr6); // [ 1, 2, 3, 5, 6 ]

let arr7 = [1, 2, 3, [5, 6, [7, 8]]].flat(2);
console.log(arr7); // [ 1, 2, 3, 5, 6, 7, 8]

let arr = [1, 2, 3, 4, [5, 6, [7, 8, [9, 10, [11, 12, [13, 14]]]]]];
let arr1 = arr.flat(Infinity);
console.log(arr1);
// ⚠️ 如果我们不知道 嵌套数组对层级 可以传递  Infinity
// ⚠️ flat 目前还没有被 所有浏览器 兼容  包括 node 个别版本
```

### 实现

**函数作为 参数 传递**

**函数作为 返回值 输出**

- 参数为函数的 高阶函数

```js
function too(f) {
  // 判断实参，是否为 函数
  if (typeof f === "function") {
    f();
  }
}
f(function () {});
```

- 返回值为函数的 高阶函数

```js
function foo() {
  return function () {};
}
let f = foo();
```

- **高阶函数 的实际运用**

```js
const callback = (val) => {
  console.log(val);
};
const foo = (val, fn) => {
  if (typeof fn === "function") {
    fn(val);
  }
};
foo("hello", callback);
```

**高阶函数 就是对基本函数的再度抽象，虽然不是`Js`的专利， 但绝对是开发时候的利器。**

> 在 `React` 也是受到高阶函数的启发，才会有了 高阶组件 的概念。

## 常用函数

### `memozition` - 缓存函数

缓存函数是指**将上次对计算结果缓存起来， 当下次调用的时候，如果遇到相同的参数，就直接返回缓存中的数据。**

```js
let add = (a, b) => a + b;
// 假设 memoize 函数可以实现缓存 🍓
let calculate = memoize(add);
calculate(1, 2); // 3
calculate(1, 2); // 相同的参数 第二次调用时， 从缓存中取出数据 而非重新计算一次。
```

- **实现原理： 🍓🍓🍓**

  **把参数和对应的结果数据存到一个对象中，调用时，判断参数对应的数据是否存在，存在就返回对应的结果数据。**

```js
let memoize = function (func) {
  let cache = {};
  return function (key) {
    if (!cache[key]) {
      cache[key] = func.apply(this, arguments);
    }
    return cache[key];
  };
};
```

**改进版**

```js
let memoize = function (func, hasher) {
  // 多了一个 hash
  var memoize = function (key) {
    var cache = memoize.cache;
    // 如果 传入 hash 就用 hash 函数来计算key 并当作key
    var address = "" + (hasher ? hasher.apply(this, arguments) : key);
    if (cache[address]) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};
```

- **适用场景**

  - **需要大量重复的计算，或者大量计算又依赖于之前的结果~**

  - **对于 计算量 较大 的递归调用，可以加快速度~**

    > 可以拿 斐波那契数列 来测试。

### `curry` - 柯里化函数

在 数学和计算机科学中，**柯里化是一种将使用多个参数的一个函数，转换成 一系列使用 一个参数的函数的技术。**

```js
// 正常函数
function girl(name, age, single) {
  return `我叫${name}, 我今年${age}岁，我${single}单身`;
}
let lincancan = girl("林", 18, "是");
console.log(lincancan);

// curry 函数
function girl(name) {
  return function (age) {
    return function (single) {
      return `我叫${name}, 我今年${age}岁，我${single}单身`;
    };
  };
}
let lin = girl("林")(18)("不是");
```

- 需求 - **检测字符串中是否包含空格**

```js
// 封装函数
let matching = (reg, str) => reg.test(str);
matching(/\s+/g, "hello world"); // true

// 柯里化
let curry = (reg) => {
  return (str) => {
    return reg.test(str);
  };
};
let hasSpace = curry(/\s+/g);
hasSpace("hello world"); // true
```

- 需求 - **获取数组对象中的`age`属性的值**

```js
let person = [
  { name: "1", age: 2 },
  { name: "2", age: 3 },
];
// 不使用柯里化
let getAge = person.map((item) => item.age);
console.log(getAge); // [2, 3]

// 柯里化 的概念 平时用的不多，而且 实现也比较难。理解概念。
// Lodash 是 一致性/模块化/高性能 的 Js 库
// - Lodash 通过降低 array number objects string 等等的使用难度从而让 js 变得更简单。🍓
const _ = require("lodash");
let getProp = _.curry((key, obj) => {
  // lodash 里面的 curry
  return obj[key];
});
let ages = person.map(getProp("age"));
console.log(ages); // [2, 3] - getProp 函数可复用
```

### 偏函数

**柯里化 是将一个多参函数，转换成多个单参数函数，也就是将一个 `n`元函数转换成 `n`个 一元函数。** 🍎🍎🍎

**`f(a, b, c) = f(a)(b)(c);`**

**偏函数 是固定一个函数的一个或者多个参数，也就是将一个`n`元函数转换成 `n-x` 元函数。**🍎🍎🍎

**`f(a, b, c) = f(a, b)(c);`**

> 元 - 函数个数

- **使用`bind`实现**

  ```js
  let add = (x, y) => x + y;
  let rst = add.bind(null, 1);
  rst(2); // 3
  ```

## 防抖 & 节流

### 防抖`debounce`

当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，**如果设定的时间到来之前，又一次触发了事件，就重新开始延时。**

> **前端开发 过程中 `resize / scroll / mousemove / mousehover` 等， 会被频繁地触发，不做限制的话，有可能一秒之内执行几十次、几百次。** > **如果函数内部执行了其他函数，尤其是执行操作了 DOM 函数，那不仅会造成计算机资源的浪费，还会降低程序运行速度，甚至造成浏览器卡死，崩溃。 🍓🍓🍓**
>
> `e.g.` - 重复的`ajax`调用，不仅会造成网络阻塞，还会造成 数据关系的混乱。

**函数防抖 - 关键在于，在一个动作发生一定时间之后，才执行特定事件。**

```js
let deBounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer); // 进来就 清除定时器，保持 无限延后。

    timer = setTimeout(() => {
      // 这里 绑定 this 可以使用 function + apply 绑定
      // 也可以 使用 ()=>{} 直接绑定 当前 this
      fn(...args);
    }, delay);
  };
};
```

### 函数节流`throttle`

当持续触发事件时，保证一定时间段内，只调用一次事件处理函数。**当持续触发事件时，保证一定时间段内 只调用一次事件处理函数。**

```js
// 定时器
let throttle = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) return; // 进来就 return 不触发，保持 频率触发。

    timer = setTimeout(() => {
      // 这里 绑定 this 可以使用 function + apply 绑定，也可以 使用 ()=>{} 直接绑定 当前 this
      fn(...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
};

// 锁lock
let throttle2 = (fn, delay) => {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;

    timer = setTimeout(() => {
      // 这里 绑定 this 可以使用 function + apply 绑定，也可以 使用 ()=>{} 直接绑定 当前 this
      fn(...args);
      flag = true;
    }, delay);
  };
};
```

### 适用场景

- **防抖 - `input`输入**
- **节流 - `ajax`请求**

## 深浅拷贝

### 原理

**传值 & 传址(内存地址)** - 栈`stack` 堆`heap`

- `stack`里面存了 **基本数据类型的`key & value`**
- `stack`里面存了 **引用类型的`key`**，**`heap`里面存了 引用类型的 `value`**

> 严格来讲`V8`里面存的都是 堆内存， 因为`V8`引擎里面 都是对象。

- 传值 就是 **直接把 值 赋给 变量~** 🍓

  ```js
  let a = 1;
  let b = a;
  b = 12;
  console.log(a, b); // 1 12
  ```

  - 栈 里面 开辟内存空间，存放 1 之后，将变量 a 和 1 关联起来。
  - a 的初始值值是 undefined。
  - 创建 b 然后将 a 的值 赋给 b。
  - 然后 存值 12。 将 12 和 b 关联起来。
  - 所以就是 1 和 12。

- 传址 就是 **直接将 内存地址 和 变量 相关联~** 🍓

  ```js
  let obj1 = { a: 10 };
  let obj2 = obj1; // 复制的是 引用地址。
  obj2.a = 100;
  console.log(obj1, obj2); // { a: 100 } { a: 100 }
  ```

  - 在 堆区 声明一个值`{ a: 10 }` - 地址是 `16进制` 的地址 (假如是) `0X123`
  - 在 栈区 声明 `值0X123 - 变量 obj1`, 关联起来
  - 然后 在 栈区 声明 `值 0X123 - 变量 obj2`, 关联起来
  - `obj2.a = 100; ` 改变之后。 因为都是修改同一块地址`0X123` 所以 `obj1` 就改变了。

**对于 原始数据类型 来说，是没有 深浅拷贝 的区别。深浅拷贝 都是对于 引用数据 类型而言的。**

**如果我们要 赋值 对象的所有属性 都不是引用类型的时候，我们可以使用浅拷贝 - 遍历 并 赋值。**

> `obj2.a = obj1.a`

都是基础类型的话， 所以 就都 独立建立值。

### 适用场景

**都是复杂对象，即对象的属性还是对象。**

**`({ a: 1, b: { b1: 1 } });`**

### 浅拷贝实现

**只复制一层对象，当对象的 属性 是引用类型的时候， 实质复制的是其引用。🍓🍓🍓**

**当 引用值指向发生改变时，也会跟着改变**

- **`for...in` + 赋值**

  ```js
  let shallowCopy = (obj) => {
    let rst = {};
    for (const key in obj) {
      // hasOwnProperty 只复制 本身拥有的属性， (非继承过来的属性) 枚举属性。
      if (Object.hasOwnProperty.call(obj, key)) {
        rst[key] = obj[key];
      }
    }
    return rst;
  };
  let start = {
    name: "Gl",
    age: 19,
    friend: {
      name: "Zs",
    },
  };

  let otherStar = shallowCopy(start);
  otherStar.name = "GG";
  otherStar.age = 10;
  otherStar.friend.name = "Hl";
  console.log(start); // { name: 'Gl', age: 19, friend: { name: 'Hl' } }
  // 第二层 对象 改变了~🍓
  ```

- **`Object.assign();`**

  > **可以将`n`个源对象拷贝到 目标对象中去。**
  >
  > **第一级别属性是 深拷贝，以后级别 是浅拷贝。🍓🍓**

  `es6`中的方法。 - `Object.assign(Target, ...source)`

  ```js
  let kaixin = { name: "kaixin", info: { hobby: "吃饭睡觉" } };
  let Gl666 = Object.assign({}, kaixin);
  console.log("Gl666", Gl666); // { name: 'kaixin', info: { bobby: '吃饭睡觉' } }
  Gl666.name = "Gl";
  Gl666.info.hobby = "喝热水";
  console.log("kaixin", kaixin); // { name: 'kaixin', info: { hobby: '喝热水' } }
  ```

- **扩展运算符`...`**

  > **第一级别属性是 深拷贝，以后级别 是浅拷贝。🍓🍓**

  ```js
  let c1 = { name: "1" };
  let c2 = { ...c1 };
  c2.name = "2";
  console.log(c1); // { name: '1' }; 但是 深浅拷贝 永远是基于 复杂对象 来说的。

  let c3 = { name: { a1: "1" } };
  let c5 = { ...c3 };
  c5.name.a1 = "2";
  console.log(c3); // { name: { a1: '2' } }
  ```

  > **扩展运算符，它的`value`是原始数据类型的时候，是深拷贝。 当`value`是引用类型的时候， 是浅拷贝。**

### 深拷贝实现

**深拷贝是另外申请了一块内存， 所以原对象发生变化的时候， 拷贝之后的变量不会发生改变。**

- **`JSON.parse(JSON.stringify(obj));`**

  ```js
  let objC1 = { name: "小明", dog: ["1", "2"] };
  let objC2 = JSON.parse(JSON.stringify(objC1));
  objC2.name = "小红";
  objC2.dog[0] = "3";
  console.log(objC1, objC2); // { name: '小明', dog: [ '1', '2' ] } { name: '小红', dog: [ '3', '2' ] }
  ```

  **`JSON`的 问题 ⚠️ 注意的点。**

  ```js
  let rg = [{ name: "1", car: ["0"], deive: function () {}, age: undefined }];
  let by = JSON.parse(JSON.stringify(rg));
  console.log(by); // [ { name: '1', car: [ '0' ] } ]
  // ⚠️ deive age 都没有被 复制过来。
  ```

  **`JSON.stringify` 的原理就是，能够`JSON`化的值 都` JSON`化。 `JSON.parse`再生成一个`JSON`对象。🍓**

  **`function` `undefined` 都不能被`JSON`化 所以就给 丢掉了。🍓**

  **在处理 循环引用 的时候 会被报错的。 ⚠️⚠️⚠️**

  > `JSON.parse(JSON.stringify(obj));` 可以 深拷贝 的前提是 **🍓 - 纯的`JSON`数据，不包含循环引用。**

- **递归实现 深拷贝。**

  ```js
  let deepClone = (obj) => {
    let newObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          if (obj[key] && typeof obj[key] === "object") {
            newObj[key] = deepClone(obj[key]);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    return newObj;
  };
  let rg1 = [{ name: "1", car: ["0"], deive: function () {}, age: undefined }];
  let by1 = deepClone(rg1);
  console.log(by1);
  // [
  //   { name: '1', car: [ '0' ], deive: [Function: deive], age: undefined }
  // ]
  ```

### 扩展

**深浅拷贝 的使用场景 都是复杂对象。 🍓🍓🍓**

- **深浅拷贝 的使用场景 🍓 - 混合模式 合并/扩展方法~**

  > 混合模式 - `Mixin` - (`Vue` 里面的`Mixin`，`jQ`里面的`extens`)
  >
  > 是一种不是用继承就可以 复用的模式。

  ```js
  let mixin = {
    say() {
      console.log(`${this.name} 在说话`);
    },
    run() {
      console.log(`${this.name} 在跑步`);
    },
  };

  // 没有任何 方法的
  class Student {
    constructor(name) {
      this.name = name;
    }
  }

  // class Person {
  //   ... 这里面有很多方法 Student 继承过来 所以就 会有很多方法
  //   ⚠️🐷 除去继承 还有 Mixin的 深浅拷贝 也可以使用这些方法
  // }
  ```

  **不通过 继承 去扩展方法 👇**

  **`mixin` 挂载到`prototype`上面, 如果挂载`class`上面`new`一个 就会有 一些方法，这样就比较占用内存**

  **定义在 原型上 可以避免 内存的重复占用。 🍓 原型共享！！！🍓**

  ```js
  Object.assign(Student.prototype, mixin);
  let s = new Student("王二");
  s.run(); // 王二 在跑步
  ```

  **`Vue`里面 也有。 混入模式`Vue.mixin();` 可以重复 定义方法和 data，都挂载在`Vue`实例的`prototype`上了~**

- **深浅拷贝 的使用场景 🍓 - `pick`**

  ```js
  const _ = require("underscore");

  let obj = {
    name: "开心",
    age: 30,
  };

  // 返回了 一个 obj 的副本
  let age = _.pick(obj, "age");
  console.log(age); // { age: 30 };
  console.log(obj); // { name: '开心', age: 30 };
  // - 原先 obj 的 数据模式也 没有改变~
  ```

  **模拟`underscore`**

  ```js
  (function () {
    // 基础架构 已经差不多
    var root = this;
    var _ = {};
    root._ = _;

    // 在这里定义自己的方法
    _.reverse = (string) => {
      return string.split("").reverse().join("");
    };
  })();

  let a = _.reverse("hello");
  console.log(a); // olleh
  ```
