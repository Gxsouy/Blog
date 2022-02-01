# `Vue` - `Base`

> `Vue`是一套构建用户界面的渐进式`JavaScript`框架。
>
> `Vue`只关注视图层，采用自底向上增量开发的设计。

**在计算机科学中只有两件困难的事情： 缓存失效 和 命名规范。**

- **`truthy`**

  只有`false / 0 / '' / null / undefined / NaN`才会默认转成`false`, 其余都是`truthy`值。

## 单文件组件

**优点：👇**

- **提供了更好的封装性。**
- **优雅的模板支持。**
- **`scoped Css` 支持。**
- **通过`vue-loader`可以配合 各种 预处理器 进行构建。**

## 命名规则

**`camelCase / PascalCase / kabab-case`**

- **`camelCase`** - 小驼峰

  `e.g: videoExampleComponent`

  **`Js`函数 / 变量 / `props` / `data(Vue)` 等~**

  > `props: { bigProp: String }` / `data: { nikeName: 'xxx' }`

- **`PascalCase`** - 大驼峰

  `e.g: VideoExampleComponent`

  **`Js`类 / 构造函数 / 项目的组件文件。**

  > `components/(文件夹下)` - `VideoItem.vue`

- **`kabab-case`**

  `e.g: video-example-component`

  **`Html` - 因为`Html`中是大小写不敏感的。**

  > `Vue.component('video-item', {})` /
  >
  > `<video-item :big-prop="1"/> `中的标签`<video-item>`和属性`big-prop`规范来讲时这么传递的。

## 模板

### 模板语法

- `Vue.js`的模板都是 合法的 `HTML`。

- `{{}}` - 文本插值
- `v-once` - 一次性插值（请留意可能会影响到其他数据的绑定）
- `v-html` - 插入原始`Html`（易导致`Xss`攻击，绝不要对`UGC`（用户更新的一些东西） 内容使用）

### 指令

**指令是带有`v-`前缀的特殊特性**

- **`v-bind:(:)`**
- **`v-on:(@)`**

---

- **`v-if / v-else-if / v-else`**
- **`v-show`**

区别：

**`v-if`** 是"真正"的条件渲染，在切换过程中条件块内的 **事件监听器和子组件会被 适当的销毁和重建。**

**`v-if` 是 惰性 的，直到条件第一次变为真时，才会开始渲染条件块。**

> 就是 如果我只写了一个 `v-if` 只要条件为 `true` 时，才会开始渲染，不然不会触发。

**`v-show`** 是 **元素始终都会被渲染并保留在`DOM`中。**

**`v-show`只是简单地切换元素的`Css`属性`display`。**

---

- **`v-for`**

**`:key` - 就是更高的提高渲染效率，更好的执行`diffpatch`。**

---

⚠️⚠️⚠️

> **不推荐`v-for`和`v-if`在 同一元素。如果非要用，`v-for`的优先级高于`v-if`。**
>
> **如果在`dom`结构中`for-if`同时出现的话。在`Js`中，有两种情况：**
>
> **`for() { if() {} }` / `if() { for() {} }`**
>
> **在`Vue`的`Dom`中约定，为 `for` 包裹着`if`的形式。**

- **`ref`**

**直接访问子组件或者模板上的`DOM`节点时使用。**

**调用： `this.$refs.refName['DOM里面的 方法/属性']`**

**🍓🍓 是在 模板渲染后，才可以获取到的~**

- **`JSX` - `render`函数**

  - 条件渲染。

    ```js
    { // 条件渲染
      render() {
        if (this.user.age > 18) {
          return <div>Welcome, { this.user.name }</div>
        }
        return <div>No Log</div>
      }
    }
    ```

  - 列表渲染。

    ```jsx
    { // 列表渲染
      data() {
        return {
          classmates: [
            { id: '1', name: 'xxx' }
          ]
        }
      },
      render() { // 列表渲染
        return (
          <div class="hello">
            {
              this.classmates.map((p, index) => (
                <div key={p.id}>{`${index}.${p.name}`}</div>
         			))
    				},
    			</div>
        );
    	}
    }
    ```

## 数据

### `Prop & Data`

**`Vue`是 单向数据流。**

- **`Data` 为什么是函数？**

  - **因为只有返回一个 生产`data`的函数。**

  - **这个组件产生的每一个实例才能维持一份被返回对象的独立拷贝。**

    > **如果是对象的话，他们可能会引用到同一个对象, 数据可能会发生 紊乱。⚠️⚠️⚠️**

- **`Prop`**

  **子组件是不推荐 直接修改父组件 的。 (因为如果层级嵌套很多的话，不容易定位问题~)**

  **`Prop`属性校验**

  - **`type`**

    1. 类型检查，`value`为 对应类型的构造函数。
    2. `null`和`undefined`会通过任何类型验证。
    3. 多种类型传入数组`[String, Array]`

  - **`requried`**

    是否必填。

  - **`default`**

    默认值，默认值为对象或者数组的默认值，必须从 一个工厂函数获取。

  - **`validator`**

    自定义校验函数，返回`true`为通过，`false`为不通过。

### 计算属性和侦听器

- **`computed` - 计算属性 🍓🍓**

  计算属性是**基于内部的响应式依赖进行缓存的。**

  **只在相关响应式依赖发生改变时，他们才会重新求值（更新值）。**

  - **如果我们希望在模板中使用常量内容，又不希望被`data`作为响应式依赖收集。**
  - **利用`computed`的缓存特性，将其放置在`computed`里。**

  > **如果计算时间 比较长，或者数据量过大的时候，放在`computed`里 可能会阻塞渲染，所以，将其 放置在`watch`里面 是比较好的一个选择。**

- **`watch` - 侦听器 🍓🍓**

  **在数据变化后，执行 异步操作 或者 开销较大的操作。**

- **`methods` - 方法 🍓🍓**

  **无缓存。**

  **每当触发重新渲染，调用方法将重新再次执行函数。**

### 数组操作

> 这样 操作数据 无反应。👇

```js
{
  data() {
    return {
      classList: [
        { id: 1, name: 'xxx' },
      ],
    }
  },
  methods: {
    change() {
      this.classmates[2] = { id: 3, name: 'x123' };
    },
  }
}
```

- **`Object.defineProperty`**
  - **不能检测 对象 属性的 添加 或者 删除。**
  - **不能检测 数组长度变化 (通过改变`length`而增加的长度不能监测到。)**

`Vue` - **不是因为`defineProperty`的局限性， 而是处于性能考量的，不会对数组的每个元素都监听。**

**解决：🌊🌊**

1. **`Vue.set | this.$set`( 将 属性添加 配置到 响应式 依赖中 )**

   **`vue.delete | this.$delete`( 在 响应式依赖中 删除 属性 )**

2. **对 数组 的一些方法 进行了 代理封装。**

   **`push() / pop() / shift() / unshift() / splice() / sort() / reverse()`**

   以上这些方法 👆 都可以在数组操作的时候 被监听到。

## 事件&样式

**事件( 事件修饰符 ) / 双向绑定 / 样式**

### 事件

- `v-on:click (@click)`

  ```html
  <button @click="add"></button> <button @click="add2($event, num)"></button>
  ```

  ```js
  {
    methods: {
      add(event) {
        // 如果不传递参数 默认参数就是 event 原生事件
        event instanceof MouseEvent
        // true
        `${ this } 在方法里指向的是当前 Vue 实例`
      },
      add2(event, num) {
        // 如果传递参数 就是 $event 来识别 是否传递的是 原生事件
        event // 就是原生 DOM 事件
      },
    }
  }
  ```

### 事件修饰符

**为了保证`methods`方法只有纯粹的数据逻辑，(和`DOM`解耦，易于 单元测试)，不去做`DOM`相关的处理操作。**

| **`.stop`**                                    | **阻止 单击事件 继续传播**                                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`submit.prevent`**                           | **提交事件不再重载页面(对于`form`标签)**                                                                            |
| **`.stop.prevent`**                            | **修饰符可以串联 (对于`a`标签， 就是不会对页面进行跳转了)**                                                         |
| **`submit.prevent`**                           | **也可以只有 修饰符 没有方法**                                                                                      |
| **`.capture`**                                 | **添加事件监听器时，使用事件捕获模式<br />(即 内部元素触发的事件先在此处理， 然后才交由 内部元素进行处理~)**        |
| **`.self`**                                    | **只有当`event.target`时当前元素自身时才触发处理函数 <br />(即 事件不是从内部元素触发冒泡上来的，就不会处理~)**     |
| **`.once`**                                    | **点击的事件，只会触发一次**                                                                                        |
| **`scroll.passive`**                           | **滚动事件的默认行为(即滚动行为) 将会立即触发，不等待`onScroll`完成<br />(其中包含`event.preventDefault()`的情况)** |
| **`keyup.enter / keyup.page-down / keyup.13`** | **只有在`key`是`Enter`时 调用事件**                                                                                 |
| **`keyup.alt.67`**                             | **`Alt + C`**                                                                                                       |
| **`@click+ctrl`**                              | **单击 + `ctrl` (即使`alt + shift`一同按下时，也会触发)**                                                           |

### 自定义事件

**单向数据流 ( 父传子 -> `props` )**

**双向绑定 (子传父 -> `$emit`) 🍓🍓**

```jsx
<child-dom @update:msg="msg = $event"></child-dom>
<button @click="$emit('update:msg', 'hi')"></button>
// update:msg 需要声明msg - (:msg)

// 为了方便这样一种模式，子 修改 父
// 这样就 要求 事件名称需要 事件 :prop 传递进来的 key 值
<child-dom :msg.sync="msg"></child-dom>
```

### 样式

- `:class`
- `:style` - 可以用驼峰 或者 串式 - `border-color / borderColor`。

**可以使用`BEM`的命名方式，来解决 命名方式污染的 问题~ 🍓🍓🍓~**

**`scoped`通过`vue-loader`进行了一层`hash`封装，来区分不同的单文件组件。**

```html
<div data-v-154asdad class="test"></div>
.test[data-v-154asdad] {}
```

---

八皇后 - 记录

```jsx
// 样式 & 构成
父级 { float: left }
子级 { display: flow-root } // 清除浮动？

// 👇这样就 彼此不相邻的格子 形成了列 (奇数行 偶数行 各自一个颜色)
.row:nth-child(2n) .cell:nth-child(2n) { background: #999; }
.row:nth-child(2n) .cell:nth-child(2n - 1) { background: #efefef; }

<div v-for="(item, rindex) in grids"></div>
<div v-for="(cell, cindex) in grids" @click="select(rindex, cindex)"></div>
{
  select: function(rindex, cindex) {
    this.grids[rindex][cindex].ok = true;
  }
}
```

```js
// 八皇后逻辑
const grids = new Array(8).fill(1).map((_, r) => {
  return new Array(8).fill(1).map((_, c) => {
    return {
      key: `key-${r * 8 + c}`,
      ok: false,
    };
  });
});

export default {
  data() {
    return {
      grids,
    };
  },
  methods: {
    select(rindex, cindex) {
      if (this.validate(rindex, cindex)) {
        this.grids[rindex][cindex].ok = !this.grids[rindex][cindex].ok;
      } else {
        alert("当前位置不能放置皇后");
      }
    },
    validate(rindex, cindex) {
      // 横
      for (let i = 0; i < this.grids[rindex].length; i++) {
        if (this.grids[rindex][i].ok) {
          return false;
        }
      }

      // 竖
      for (let i = 0; i < this.grids.length; i++) {
        if (this.grids[i][cindex].ok) {
          return false;
        }
      }

      // 撇
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = rindex + cindex - i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      // 捺
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = rindex - cindex + i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      return true;
    },
  },
};
```
