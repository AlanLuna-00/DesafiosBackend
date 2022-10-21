const express = require('express');
const mainRouter = require('../routes/index');
const app = express();

app.use(express.json()); // Para que el body sea un objeto de JS
app.use(express.urlencoded({ extended: true })); // Para que el body sea un objeto de JS


app.use(express.static('public')); // Para que el servidor sirva archivos estáticos
app.use('/api', mainRouter);


module.exports = app;