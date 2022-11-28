const express = require("express");
const Tarefa = require("../models/Tarefa");

const router = express.Router();
//Pegar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.json(tarefas);
    } catch (err) {
        res.json({message: err});
    }
});
//Inserir tarefas
router.post('/', async (req, res) => {
    const tarefa = new Tarefa({
        title: req.body.title,
        description: req.body.description,
        finished: req.body.finished
    });

    try {
        const savedTarefa = await tarefa.save();
        res.json(savedTarefa);
    } catch (err) {
        res.json({message: err});
    }
});
//Pegar tarefa específica
router.get('/:tarefaId', async(req, res) => {
    try {
        const tarefa = await Tarefa.findById(req.params.tarefaId);
        res.json(tarefa);
    } catch (err) {
        res.json({message: err});
    }
});
//Apagar tarefa específica
router.delete('/:tarefaId', async (req, res) => {
    try {
        const tarefaApagada = await Tarefa.deleteOne({_id: req.params.tarefaId});
        res.json(tarefaApagada);
    } catch (err) {
        res.json({message: err})
    }
});
//Alterar uma tarefa
router.patch('/:tarefaId', async (req, res) => {
    try {
        const tarefaAlterada = await Tarefa.updateOne(
            {_id: req.params.tarefaId}, 
            {$set: {title: req.body.title,
                description: req.body.description,
                finished: req.body.finished}});
        res.json(tarefaAlterada);
    } catch (err) {
        res.json({message: err});
    }
})

module.exports = router;
