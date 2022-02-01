# `Js_Adv` - `Function`函数

> `Js`的函数相关说明，`this` / 闭包 / 箭头函数 / 尾递归 / 尾调用等等。

## `this`

**全局环境中的`this`指向全局对象 (不管是 严格模式 还是 普通模式~)**

**箭头函数 使用`bind call apply`，没有效果的 也改变不了 `this` 指向 🍓🍓🍓**

### 函数中的`this`

**普通函数中的 `this`， 取决于函数是如何被调用的**

**如果 函数作为普通函数 使用`this`指向全局，没有返回值的话就是 `undefined`**

```js
function C() {
  console.log(this); // Window
}
let o = C();
console.log(o); // undefined
```

- **简单调用**

  ```js
  function f() {
    // 'use strict' 这里如果使用 严格模式 this 就是 undefined
    console.log(this); // Window
  }
  fn();
  ```

  > `'use strict'` - 这里如果使用 严格模式 `this` 就是 `undefined`

- **对象方法调用**

  ```js
  let obj = {
    f() {
      console.log(this); // obj
      function g() {
        console.log(this); // Window 这里是自调用 所以是window
      }
      g(); // 修改可以使用 call apply bind 都可以
    },
  };
  obj.f();
  ```

- `call` & `apply` 来修改 `this` 指向

- **构造函数调用**

  ```js
  function C() {
    this.a = "a";
    // new操作后，相当于加了个 return this
  }
  let o = new C();
  console.log(o.a); // 'a';
  ```

  ```js
  let obj = {
    a: "b",
  };
  function C() {
    this.a = "a";
    return obj;
  }
  let o = new C();
  console.log(o.a); // 'b'
  console.log(o === obj); // true
  ```

## 函数的双重职能

- **函数内部有两个不同的方法 `[[Call]]` 和 `[[Constructor]]`。**

- **当使用普通方法调用函数的时候 `[[Call]]` 会被执行**

- **当使用构造函数调用时` [[Constructor]]`方法会被执行， 会创建一个`new Tager`对象去执行函数体**

  **箭头函数的调用 例外。**

### 判断函数是以何种方式被调用的 🍓🍓~

```js
function Person(name) {
  if (this instanceof Person) {
    this.name = name;
  } else {
    throw new Error("You must use new with Person");
  }
}
let person = new Person("John");
let person2 = Person("John"); // Error
```

### `new.target`元属性

**当以构造函数的形式调用函数时，`new.target`指向的是构造函数本身。**

```js
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error("You must use new with Person");
  }
}
let person = new Person("John");
let person2 = Person("John"); // Error
```

### 构造函数 👆 Vs 工厂模式

```js
function Person(name) {
  let obj = this;
  if (new.target !== Person) {
    obj = new Person();
  }
  obj.name = name;
  return obj;
}
let person = new Person("John");
let person2 = Person("John");
```

## 函数参数的传递

**按值传递** - 函数形参的值是调用函数所传入实参的副本。

**按引用传递** - 函数形参的值是调用函数所传入实参的引用。- **这就意味着 在里面修改之后，外面也会修改。**

```js
let a = "a",
  obj = { x: 1 },
  obj1 = { x: 2 };
function fn(x, y, z) {
  x = "b";
  y = { a: 1 };
  z.x = 3;
}
fn(a, obj, obj1);
console.log(a); // 'a'
console.log(obj); // { x: 1 }
console.log(obj1); // { x: 3 }
```

## 函数的基本应用

### 立即执行函数 `IIFE`

**`(function() {})();` - 这里使用`let`变量就是自己的局部变量~**

> 可以在函数里面添加`'use strict'`严格模式 然后实现自己的业务逻辑代码

**`(function() {}());` - 立即执行函数的变体**

**`!function() {}();` - 还可以用 `+ - ~ void new`**

**`(function(win) {})(window);` - 不推荐在立即执行函数中直接引用全局变量 可以通过参数传入**

- **`ES6`不需要`IIFE`， 使用块级作用域 就可以解决**

  **或者给`sciprt`标签加一个`module`属性， 他就是 块级代码。**

  ```js
  {
    let page = {
      init() {
        console.log(666);
      },
    };
    page.init();
  }
  ```

### 闭包

**闭包是指 访问了另外一个 作用域中的变量的函数**

```js
function foo() {
  var a = 1;
  function bar() {
    return ++a;
  }
  bar();
}
foo();
```

**可以通过闭包来解决 异步`for`循环的问题 或者 异步点击`dom`元素 啥的**

```js
function foo() {
  for (var i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }
}
foo();

// 使用闭包 或者 let 都可以解决
function foo() {
  for (var i = 0; i < 10; i++) {
    function bar(j) {
      setTimeout(() => {
        console.log(j);
      }, 0);
    }
    bar(i);
  }
}
foo();
```

- **闭包 + 立即执行函数的应用：封装（信息隐藏）**

  ```js
  let obj = {
    name: "John",
    getName() {
      return this.name;
    },
  };
  console.log(obj.getName());

  // 阻止用户直接访问obj.name, 需要通过 obj.getName() 修改如下👇
  let obj = (function () {
    let name = "John";
    return {
      getName() {
        return name;
      },
    };
  })();
  ```

### 递归 (在函数中调用函数本身)

- **斐波那契数列`1 1 2 3 5 8...`**

  ```js
  function fib(n) {
    if (n === 1 || n === 2) {
      return 1;
    }
    return fib(n - 1) + fib(n - 2);
  }
  fib(10);
  ```

### 回调函数 - [ 同步 / 异步 ]回调

- **同步回调**

  ```js
  function foo(n, func) {
    ++n;
    func(n);
  }
  foo(1, function (n) {
    console.log(n);
  }); // 2

  const items = [1, 2, 3];
  const copy = [];
  items.forEach((item) => copy.push(item));
  ```

- **异步回调**

  ```js
  function foo(n, callback) {
    setTimeout(() => {
      ++n;
      callback(n);
    }, 1000);
  }
  foo(1, function () {
    console.log(n); // 2
  });
  ```

### 柯里化

**柯里化 是把接收多个参数的函数变换成接收一个单一参数的函数，并且返回接收余下参数以及返回返回的结果的 新函数技术。**

- **需求: 实现生成唯一`id` 的函数**

  1. 可以传入一个 起始`id`， 之后返回的`id` 要从这个值开始算。
  2. 还可以传入一个数字，返回的值是 上次的`id` 加上这个数字。如果没有传入数字，就返回上次的`id`加上 1。

  > 普通实现

  ```js
  let id = 0;
  function getId(step, startId) {
    // 加一个 id 是否为0的判断
    // 保证只有第一次调用传入的 startId 是有效的
    if (startId && id === 0) {
      id = startId;
    }
    id += step || 1;
    return id;
  }
  // 第一次调用 传入的 起始值有效
  getId(12, 1000);
  // 第二次调用 传入的 起始值有效
  getId(15, 1000);
  ```

  > 柯里化实现

  ```js
  function initId(startId) {
    let id = startId || 0;
    return function (step) {
      // 闭包
      id += step || 1;
      return id;
    };
  }
  let genId = initId(1000);
  genId(12);
  genId(15);
  ```

### 函数式编程

**接收 函数作为 参数**

```js
function not(fn) {
  // 接收 函数作为 参数 执行结果 取反并返回。
  return function () {
    var result = fn.apply(this, arguments);
    return !result;
  };
}
var even = function (x) {
  return x % 2 === 0;
};
var odd = not(even);
var result = [1, 1, 3, 3, 5].every(odd);
console.log(result); // true
```

### 箭头函数

- 与普通函数的**区别**👇

  - **没有自己的`this、super、arguments、new.target`，他们是离 该箭头函数最近的非箭头函数 的绑定**
  - **不能使用`new`来调用**
  - **没有原型对象**
  - **内部的`this`无法改变， 无法通过`apply、call、bind`来改变**
  - **形参名称不能重复**

- **语法**

  - **参数 => 函数体**

    ```js
    var fn = (val) => val * 2; // 直接返回 🍓
    var fn = (a, b) => a * b; // 有两个参数
    var fn = () => "john"; // 只有返回值
    var fn = () => {}; // 没有返回没有参数
    var fn = (id, name) => ({ id, name }); // 直接返回对象 用括号括起来~🍓
    ```

  - **宽松绑定**

    `=>` 的优先级比较低 👇

    ```js
    const f = (x) => x % 2 === 0; // f(1)-false \ f(2)-true
    // 如果要想提升优先级的话，就需要添加大括号了
    ```

  - 函数体为表达式【 生成值】或者 函数体为语句【 执行语句 】不需要大括号包裹

    ```js
    const f1 = (x) => console.log(x); // 表达式
    const f2 = (x) => typeof x; // 表达式
    const f3 = (x) => {
      throw x;
    }; // 语句
    ```

  - 返回对象的时候

    ```js
    const f1 = x => ({ bar: 123 }); // 当作整体返回  { bar: 123 }
    const f2 = x = > { bar: 123 }; // 也返回 但是是 `undefined`
    ```

- **箭头函数没有自己的`this`**

  **箭头函数 使用`bind call apply`，没有效果的 也改变不了 `this` 指向 🍓🍓🍓**

  ```js
  let obj = {
    name: "John",
    getName() {
      setTimeout(function () {
        console.log(this.name);
        // 这样打印呢 this 就是 window
        // 解决 - 绑定 this
        // - setTimeout 上定义 let that = this;
        // - setTimeout(function() {}.bind(this), 1000);
        // - setTimeout(() => {}, 1000)

        // 🍓 箭头函数中的this 就是 计时器函数 所在作用域函数的this 就是 getName 的this
        // 🍓 箭头函数 使用 bind call apply ，没有效果的 也改变不了 this 指向
        // 🍓 异步点击的时候 或者 addEventListener 绑定事件的时候 也可以适用 箭头函数
      }, 1000);
    },
  };
  obj.getName();
  ```

- **不能使用`new`来调用**

  ```js
  let People = () => {};
  let person = new People(); // TypeError People is not a constructor
  ```

- 可以简化 操作数组的 写法...

- 使用箭头函数创建立即执行函数

  ```js
  ((a) => {
    // use strict
    console.log(a); // 箭头函数 和 严格模式 没有关系 怎么使用都行
  })(1);
  ```

### 尾调用优化

> `es6`要求 `Js` 引擎对 尾调用做出优化。

**在执行某个函数的时候，如果最后一步是一个函数调用，并且被调用函数的返回值，直接被当前函数返回，就成为 尾调用`(Tail Call)`**

其实就是 - **某个函数的最后一步是调用另一个函数。**

```js
function f() {
  return g(); // Tail Call
}
```

- **尾调用的要求**

  - 尾调用不需要访问当前`stack / frame`中的变量，也就是**没有闭包。**
  - 返回到尾调用处时，**不能再做其他事情。**
  - **尾调用的返回值，直接返回给调用它所在函数的调用者。**

  ```js
  function g(x) {
    return x;
  }

  function f1(x) {
    g(x); // 不是尾调用 没有return
  }

  function f2(x) {
    return 1 + g(x); // 尾调用的时候 做了 其他的事情
  }

  function f3() {
    let num = 1;
    let g = () => num;
    return g(); // 闭包了 使用了 外部的变量
  }
  // f1 f2 f3 都不是 尾调用函数
  ```

- **我理解的尾调用函数**

  - **就是优化了存放栈中的 一个流程， 少了一次 入栈和出栈 的过程。**
  - **执行到尾调用函数的时候`return g(x);`就回去先销毁 之前的 存放在 栈的一个信息，然后直接替换成 `g(x)` 的返回结果**

  - **因为尾调用 没有用到外面的变量，也不参与运算，还是可以进行优化的**

### 尾递归

> **递归时，如果函数调用函数本身时是一个尾调用，则称为 尾递归。**

**函数调用自身，称为递归。如果尾调用自身，就称为尾递归。**

```js
function f(n) {
  if (n === 1 || n === 0) return 1;
  return f(n - 1) + f(n - 2);
} // 不是一个 尾递归， 因为最后不是一个尾调用 因为做了其他的事情~
console.log(f(10)); // 55
console.log(f(100)); // 堆栈溢出  直接卡死
```

- **修改成尾递归**

```js
function fibonacci(n, a = 1, b = 1) {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return b;
  }
  return fibonacci(n - 1, b, a + b); // f(n - 1) + f(n - 2); 这个逻辑呢 就通过 a+b 来解决了~
}
fibonacci(100); // 354224...
fibonacci(10000); // Infinity 就不会有 堆栈溢出的问题了
```

- **尾递归前后对比**

```js
// 尾递归之前
function factorial(n) {
  if (n == 1) return 1;
  return n * factorial(n - 1);
}

// 尾递归之后
function factorial(n, total) {
  if (n == 1) return total;
  return factorial(n - 1, n * total);
}
```

> **我理解的是 用变量去保存上一次的结果，然后表达式的一边去 递减或者累加 另外一边去 执行运算结果。空间复杂度降低 🍓**

尾递归的实现，往往需要改写递归函数，**确保最后一步只调用自身**。做到这一点的方法，**就是把所有用到的内部变量改写成函数的参数**。 如 👆 所示

```js
// 增加一个函数 来 使得👆函数 参数传递正常
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5); // 120
```

```js
// 使用柯里化 来 使得👆函数 参数传递正常
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n); // 😯神奇~ 还利用了闭包
  };
}

function tailFactorial(n, total) {
  // 尾调用 - 尾递归
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5); // 120
```

```js
// 使用Es6默认值做法 来使得👆函数 参数传递正常
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5); // 120
```
