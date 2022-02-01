# `Js_Adv` - 代码质量

> 代码质量与其整洁度成正比。干净的代码，既在质量上较为可靠，也为后期维护、升级奠定了良好基础。

## 代码质量 - 测试

**测试是一种 验证我们的代码 是否可以按预期 工作的方法。**

单元测试是指 **对 软件中最小可测试单元 进行检查和验证。**

> **判断某个特定条件 或者 某个特定场景下的一个特定行为 进行的测试工作。**

被测试的对象，可以是**样式 - 功能 - 流程 - 组件等。**

### 意义

- 检测出潜在的`bug`
- 快速反馈功能输出，验证代码是否达到预期
- 保证代码重构的安全性
- 方便协作开发

### 单元测试代码

被测试对象 `<->` 测试代码

**被测试对象为程序中的最小组成单元(函数、功能等等)，可以做到 孤立的验证。**

```js
let add = (a, b) => a + b;
let subtraction = (a, b) => a - b;

// 测试代码
let expect = (res) => {
  // res 实际值
  return {
    toBe: (actual) => {
      // actual 期望值
      if (res !== actual) {
        throw new Error("预期值 与 实际值 不符");
      }
    },
  };
};
expect(add(1, 2)).toBe(3); // 测试通过 不打印
// expect(add(1, 2)).toBe(2); // Uncaught Error: 预期值 与 实际值 不符
```

```js
let test = (desc, fn) => {
  try {
    fn();
  } catch (e) {
    console.log(`${desc}没有通过，具体原因为 ${e}`);
  }
};
test("加法测试", () => {
  expect(add(1, 2)).toBe(3); // 测试通过 不打印
  // expect(add(1, 2)).toBe(2); // 加法测试没有通过，具体原因为 Error: 预期值 与 实际值 不符
});
```

### `Jest` 的基础使用

> 安装 `Node`
>
> `npm i -D jest` 或者 `yarn add -D jest`
>
> `npm ls jest` 查看是否安装成功。（出现版本号 则安装成功）

```js
// math.js
let add = (a, b) => a + b;
module.exports = { add };
// math.test.js
const { add } = require('./math');
test('加法测试', () => {
  exprct(add(1, 2).toBe(3));
})
// package.json
"script": {
  test: "jest",
}
// npm run test - 就会有打印
```

- **使用**

  1. 创建被测试对象`math.js`
  2. 创建`test`文件 `math.test.js`
  3. 修改 `package.json` 文件
  4. 执行`npm test`

  > 只有更好的完成单元测试，才能更好的完成 **集成测试、功能测试** 等等。

- 练习代码

  ```js
  // 被测试对象
  let add = (a, b) => a + b;

  // 测试代码
  let expect = (res) => {
    return {
      toBe: (actual) => {
        if (res !== actual) {
          throw new Error("期望值与预期值不符");
        }
      },
    };
  };
  ```

## 代码质量 - 可靠性

### 函数式编程

**函数式编程是一种编程范式，是一种构建计算机程序结构和元素的风格，它把计算看作是对数学函数的评估，避免了状态的变化和数据的可变。**

- 给数组中的 每一项加一

  ```js
  // low
  let arr = [1, 2, 3, 4];
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i] + 1);
  }
  console.log(newArr); // [2, 3, 4, 5]

  // middle...
  let newArr = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res.push(arr[i] + 1);
    }
    return res;
  };
  console.log(newArr); // [2, 3, 4, 5]
  ```

  **👆 以上的都可以被 称之为 命令式编程。**

  **命令式编程： 详细的命令机器怎么去处理一件事情以达到你想要的结果。**

  ```js
  // good
  let newArr = (arr, fn) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res.push(fn(arr[i]));
    }
    return res;
  };
  let add = (item) => item + 5;
  let sum = newArr(arr, add); // [6, 7, 8, 9];
  ```

  **👆 以上的都可以被 称之为 函数式编程。**

函数式编程： 主张**将复杂的函数组合成简单的函数，将运算过程尽量写成一系列的 函数调用。**

**当我们 再去将 数组的每一项进行逻辑处理的时候，只需要 编写一个 逻辑函数即可。**

- **函数式编程 🍓**

  **将我们程序分解为一些更可重用，更可靠且更易于理解的部分，然后再将他们组合起来，形成一个更易推理的程序整体。**

  **我们将一个任务 拆分成 多个最小颗粒的函数，然后通过组合的方式来完成我们的任务。 和组件化类似~**

  我们就 只需完成我们想要完成的功能代码即可，无需去关心其他内部的实现。

### 纯函数

**如果函数的调用参数相同，则永远返回相同的结果**，他不依赖于程序执行期间函数外部任何状态或数据的变化，**必须只依赖于其输入参数。**

```js
let discount = 0.8;
const calcuatePrice = (price) => price * discount;
let price = calcuatePrice(200);
console.log(price);
```

👆 不是一个纯函数 ⚠️ 因为使用了**没有作为参数传递给函数的变量**

> `discount`是**外部获取，不能保证相同输出~**

```js
const calcuatePrice = (price, discount) => price * discount;
let price = calcuatePrice(200 * 0.8);
console.log(price);
```

👆 就是纯函数 🍓 - **相同的输入 永远会得到 相同的输出，没有副作用。**

> 虽然没有必要 所有函数都是纯函数， 但是我们**可以用纯函数来处理拼接 函数**，以此来减少 不纯函数 的数量~

- **函数副作用 - 纯函数没有副作用**

  - **当调用函数时，除了返回函数值之外，还对主调用函数产生附加的影响。**

    例如：修改全局变量`函数外的变量` 或者 修改参数。

    **严格的函数式语言要求 函数必须没有副作用**，但是在面向对象中，可变和副作用就很常见...

  ```js
  let a = 5;
  let foo = () => (a = a * 5);
  foo();
  console.log(a); // 50
  // 👆 除了调用外部变量以外，还修改了外部变量，这个就是 函数副作用~

  let arr = [1, 2, 3, 4, 5, 6];
  arr.slice(1, 3); // 纯函数 返回 [2, 3] 原数组不变~ 🍓🍓🍓
  arr.splice(1, 3); // 非纯函数， 返回 [2, 3, 4] 原数组改变 ⚠️⚠️⚠️
  arr.pop(); // 非纯函数，返回 6，原数组改变 ⚠️⚠️⚠️
  ```

**编写出没有副作用的程序是不可能的，而且有的程序副作用是不可避免的~**

所有 我们只要 **尽可能的减少函数副作用。**

### 不纯的函数

```js
const foo = (something) => {
  const dt = new Date().toISOString();
  console.log(`${dt}:${something}`);
  return something;
};
foo("hello");
// 违背了 相同的输入总是会得到相同的输出原则~
```

- **依赖注入 进行改进**

  ```js
  const foo = (d, log, something) => {
    const dt = d.toISOString();
    return log(`${dt}:${something}`);
  };
  const something = "你好";
  const d = new Date();
  const log = console.log.bind(console);
  foo(d, log, something);
  ```

  > 不纯的部分提取出来，不纯的代码 远离 核心代码。
  >
  > `foo` 函数 变纯了...

**把不确定性 尽量 减到最小~ 将其保存起来，进行集中管理~**

- **保证函数无副作用的特性**
  - **函数入口使用参数运算，而不修改它**
  - **函数内 不修改 函数外的变量**
  - **原算结果通过函数返回给外部~**

### 可变性 & 不可变性

**可变性，是指一个变量创建以后可以任意修改。**

不可变性 是指一个变量，一旦被创建，就永远不会发生改变，**不可变性是函数式编程的核心概念。**

> 因为没有它，程序中的数据流是有损的

```js
let data = { count: 1 };
let foo = (data) => {
  data.count = 3;
};
console.log(data.count); // 1
// 调用 foo 函数
foo(data);
console.log(data.count); // 3
```

- **`Js` 中没有 原生的不可变性**

  **可以通过深拷贝 来解决这个问题。**

  ```js
  let data = { count: 1 };
  let foo = (data) => {
    // 深拷贝
    // let lily = { ...data }; // 扩展运算符 - 只能对 第一层级 进行深拷贝~
    let lily = JSON.parse(JSON.stringify(data)); // JSON - 对多个层级进行深拷贝~ 也是数据的不可变性~
    lily.count = 3;
  };
  console.log(data.count); // 1
  // 调用 foo 函数
  foo(data);
  console.log(data.count); // 1
  // 这样就保证了 数据的不可变性 🍓
  ```
