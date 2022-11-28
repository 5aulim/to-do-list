const mongoose = require('mongoose');

const TarefaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tarefa', TarefaSchema);