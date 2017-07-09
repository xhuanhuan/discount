### 2017.07.06 晓博
1. v-if的使用和v-show的选择？各自的优势

### 2017.07.07 晓博
1. transition 的v-if v-else的配合使用，此处有点疑问:
    ```vue
    <div v-if='loading'>
      <transition name='test'>
        <div>123</div>
      </transition>
    </div>
    <div v-else>
      <transition name='test'>
        <div>321</div>
      </transition>
    </div>
    ```
在上述代码中，修改loading的值，并不能触发transition,原因是虚拟dom在做对比时，发现transition内部只有内容发生了改变，那么就认为这个标签没有发生移除和进入操作，从而导致过渡效果没有触发。要解决这个问题，方案有3：
1. 改变内部元素标签，class的修改没有作用
2. 内部元素添加key
3. 将transition从外部进行包围，同时添加key或者最外层内部元素标签
