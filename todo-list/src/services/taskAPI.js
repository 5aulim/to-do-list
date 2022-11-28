import axios from 'axios'

const url = 'http://localhost:3000/'

export default {
  getAll: async () => {
    let data = []
    await axios.get(url + 'tarefas').then((res) => {
      data = res.data
    })
    return data
  }
}
