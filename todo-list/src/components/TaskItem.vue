<template>
    <div >
        <div   >
        <div>
          <button type="button" class="btn"
          v-if="!isModalVisible"
          @click="showModal">Abrir</button>
          <button type="button" class="btn"
          v-if="isModalVisible"
          @click="closeModal">Fechar</button>
          <label class="text">{{ todo.title }}</label>
        </div>
        <div v-show="isModalVisible">
          <Modal @close="closeModal"
          :item-body="todo"/>
        </div>
        </div>
    </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'TaskItem',
  props: ['todo'],
  components: {
    Modal
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  },
  data () {
    return {
      isModalVisible: false
    }
  }
}
</script>

<style>
.view {
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 20px;
  padding: 0px 1px;
}

.btn {

  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  font-weight: bold;
  transition: 0.3s;
  background-color: #298106;
}
.btn:after {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 0;
  height: 100%;

  z-index: -1;
  -webkit-transition: width 150ms ease-in-out;
  transition: width 150ms ease-in-out;
}
.btn:hover {
  color: #fff;
}
.btn:hover:after {
  width: 110%;
}
.text {
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
</style>
