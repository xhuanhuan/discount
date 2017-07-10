<template>
  <div>
    <button @click='addstudent'>push student</button>
    <button @click='addandchange'>push then change</button>
    <ul v-for='student in students'>
      <li>name:{{student.name}},age:{{student.age}}</li>
    </ul>
    <ul v-for='student in array'>
      <li>{{student}}</li>
    </ul>
  </div>
</template>

<script>
export default{
  name:'testarray',
  created:function(){
    console.log(this.students)
    // var students = []
    // Object.defineProperty(students,student)
  },
  methods:{
    addstudent:function(){
      this.students.push({
        name:'xiaobo'+Math.floor(Math.random()*100),
        age:Math.floor(Math.random()*100)
      })
    },
    addandchange:function(){
      this.student ={
        name:'xiaobo'+Math.floor(Math.random()*100),
        age:Math.floor(Math.random()*100)
      }
      this.students.push(this.student)
      console.log(this.students)
      console.log(this.array)
      var that = this
      setTimeout(function(){
        that.student.name='123'
        that.student.age = '23'
      },2000)


      // var student ={
      //   name:'xiaobo'+Math.floor(Math.random()*100),
      //   age:Math.floor(Math.random()*100)
      // }
      // this.students.push(student)
      // console.log(this.students)
      // var that = this
      // setTimeout(function(){
      //   student.name='123'
      //   student.age = '23'
      // },2000)
    }
  },
  data(){
    return {
      students:[
        // {
        //   name:'xiaobo',
        //   age:'20'
        // },
        // {
        //   name:'xiaohuan',
        //   age:'20'
        // },
        // {
        //   name:'xiaoqi',
        //   age:'20'
        // }
      ],
      student:{},
      array:[1,2,3]
    }
  }
}
</script>
