const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

require('dotenv/config');

const app = express();
const tarefasRoute = require('./routes/tarefas');
app.use(express.json());
app.use(cors());
app.use('/tarefas', tarefasRoute);

app.get("/outfit", (req, res) => {
    const tops = ["Black", "White", "Orange", "Navy"];
    const jeans = ["Black", "Grey", "Blue", "Navy"];
    const shoes = ["Black", "White", "Grey"];
    
    res.json({
        top: tops.at((Math.random() * 100) % tops.length),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes)
    });
});

app.get("/comments/:id", async (req, res) => {
    const id = req.params.id;
    let content;

    try{
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (err) {

    }

    res.json({
        content: content
    })
});

app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;
    
    if (!content) {
        return res.sendStatus(400);
    }
    
    await fs.mkdir("data/comments", { recursive: true});
    await fs.writeFile(`data/comments/${id}.txt`, content);

    res.status(201).json({
        id: id
    });
});

//Conectar ao BD
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('Conectado!')
);

app.listen(3000, () => console.log("API server is running..."));