const express = require('express');
const app = express();
const server = require('./services/server');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const puerto = 3000; 

server.listen(puerto, () => { 
	console.log(`Servidor Listo escuchando en el puerto ${puerto}`) 
})
