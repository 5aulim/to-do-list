<template>
  <section class="todoapp">
    <header class="header">
      <h1 class="text-logo">Tarefas</h1>
      <task-list :todo-list="tasks"></task-list>
    </header>
  </section>
</template>

<script>
import TaskList from './components/TaskList'
import TaskAPI from '@/services/taskAPI'

export default {
  name: 'App',
  components: {
    TaskList
  },
  methods: {
    addTask (task) {
      this.tasks.push(task)
    },
    mounted () {
      TaskAPI.getAll().then(res => {
        console.log(res.data)
      })
    },
    data () {
      return {
        tasks: []
      }
    }
  }
}
</script>

<style>
.text-logo {
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
</style>
