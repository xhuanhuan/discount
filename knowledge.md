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

### 2017.07.10 晓博
1. vue的数组响应式：
   问题1：
   push 能够触发重新渲染，**因为vue重写了数组的push方法**,vue称之为变异方法，也就是mutation method，这个方法重写了数组的原生push方法，当调用的时候，**如果push的内容是对象，则会为这个对象新增getter/setter，从而实现响应式**
   问题2：
   this.data1.push(obj) obj={},则不会引发响应式，是因为obj为引用数据类型，直接赋值会新建一个空间存储obj，原来的空间如果不存在引用，会被回收，但是此处存在引用，虽然push进去的obj是响应式的，但是该空间的内容并没有发生改变，所以不会导致dom的更新，而执行this.data1.push(obj) obj.someobj='value1',会触发dom的更新
