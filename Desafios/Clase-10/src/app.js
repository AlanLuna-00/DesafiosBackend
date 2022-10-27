const express = require('express');
const app = express();
const server = require('./services/server.js');
const path = require('path');

app.use(express.static('../public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, '../views');
app.set('views', viewsPath);
app.set('view engine', 'pug');

const puerto = 3000; 

server.listen(puerto, () => { 
	console.log(`Servidor Listo escuchando en el puerto ${puerto}`) 
})