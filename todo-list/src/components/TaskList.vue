<template>
  <div class="root">
    <input class="input"
        @keyup.enter="createTask"
        v-model="novaTask.title"
        placeholder="Qual tarefa precisa fazer?"
        >
    <button class="button" v-on:click="getTasks"> Atualizar </button>
    <ul class="list">
    <li v-for="(todo, index) in todoList" class="todo" :key="index">
      <task-item class="item" :todo="todo" v-on:click="showModal"></task-item>
    </li>
  </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem'
import Modal from './Modal'
import axios from 'axios'

const url = 'http://localhost:3000/'

export default {
  name: 'TaskList',
  props: ['todoList'],
  components: {
    TaskItem,
    Modal
  },
  methods: {
    listarTasks: () => {
      console.log(this.todoList)
    },
    getTasks () {
      axios.get(url + 'tarefas').then(res => {
        this.todoList = res.data
        this.listas = res.data
      })
    },
    createTask () {
      axios.post(url + 'tarefas', {
        title: this.novaTask.title,
        finished: false
      })
        .then((res) => {
          console.log(res.data)
          this.novaTask.title = ''
        })
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  },
  data () {
    return {
      listas: [],
      isModalVisible: false,
      novaTask: {
        title: ''
      }
    }
  }
}
</script>

<style>
:root {
--main-bg-color: #f0f0f0;
--item-hover-bg: #8e44ad;
--item-hover-color: #fff;
--item-bg-color: #fff;
--box-header-bg: #9b59b6;
--box-header-color: #fff;
}

.body {
font-family: 'Roboto', sans-serif;
display: flex;
justify-content: center;
align-items: center;
background: var(--main-bg-color);
}

.box {
width: 300px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.box-header {
padding: 10px 50px;
display: flex;
justify-content: center;
align-items: center;
background: var(--box-header-bg);
color: var(--box-header-color);
}

.list {
position: relative;
padding: unset;
margin: 0;
width: 100%;
}

.item {
list-style-type: none;
padding: 15px 40px;
box-shadow: 0 5px 25px rgba(0,0,0,.1);
position: relative;
background: var(--item-bg-color);
cursor: pointer;
transition: all 0.3s;
}

.item:hover {
transform: scale(1.1);
z-index: 100;
background: var(--item-hover-bg);
color: var(--item-hover-color);
}

.item i {
color: var(--item-hover-bg);
}

.item:hover i {
color: var(--item-hover-color);
}
.input {
  transition: width 0.4s ease-in-out;
  height: 30px;
}
.button {
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  font-weight: bold;
  background-color: #298106;
}
</style>
