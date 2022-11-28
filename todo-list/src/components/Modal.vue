<template>
    <transition name="modal-fade">
      <div class="modal">
        <slot name="header"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
            <input class="input" v-model="itemBody.title"/>
        </slot>
        <slot name="body">
            <label class="text-finished" v-if="itemBody.finished">Finalizado</label>
        </slot>
        <slot name="footer">
            <button class="btn-modal" @click="finalizar(itemBody)" v-if="!itemBody.finished">Finalizar</button>
            <button class="btn-modal" @click="apagar(itemBody)">Apagar</button>
            <button class="btn-modal" @click="editar(itemBody)">Editar</button>
        </slot>
      </div>
</transition>
</template>

<script>
import axios from 'axios'

const url = 'http://localhost:3000/'
export default {
  name: 'Modal',
  props: ['itemBody'],
  methods: {
    close () {
      this.$emit('close')
    },
    apagar (tarefa) {
      axios.delete(url + `tarefas/${tarefa._id}`)
        .then(() => {
          console.log('APAGADO')
        })
    },
    finalizar (tarefa) {
      axios.patch(url + `tarefas/${tarefa._id}`, {finished: true})
        .then(() => {
          console.log('MODIFICADO')
        })
    },
    editar (tarefa) {
      axios.patch(url + `tarefas/${tarefa._id}`, {title: this.itemBody.title})
        .then(() => {
          console.log('MODIFICADO')
        })
    }
  }
}
</script>

<style>
.btn-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  border-radius: 10px;
  width: 100%;
  height: 40px;
  font-weight: bold;
  transition: 0.3s;
  background-color: #298106;
}
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  .text-finished {
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: black;
}
</style>
