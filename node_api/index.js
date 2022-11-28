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


//Conectar ao BD
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('Conectado!')
);

app.listen(3000, () => console.log("API server is running..."));