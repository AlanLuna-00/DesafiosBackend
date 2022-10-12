const express = require('express');
const fs = require('fs/promises'); 
const path = require('path');

const app = express();

const filePath = path.resolve(__dirname, './users.json'); 
console.log(filePath); 

app.use(express.json()); // Para que el body sea un objeto de JS
app.use(express.urlencoded({ extended: true })); // Para que el body sea un objeto de JS

app.get('/usuarios', async (req, res) => { 
	const fileData = await fs.readFile(filePath, 'utf-8');
	const usuarios = JSON.parse(fileData);
	res.json({ 
		data: usuarios,
	});
});

app.get('/usuarios/:id', async (req, res) => {
	const id = req.params.id // Lo que recibo por parámetro del cliente
	const fileData = await fs.readFile(filePath, 'utf-8'); // Leo el archivo
	const usuarios = JSON.parse(fileData); // Parseo el archivo

	const indice = usuarios.findIndex(unUsuario => unUsuario.id == id); // Busco el índice del usuario que quiero

	if(indice < 0){ // Si no lo encuentro, devuelvo un error
		return res.status(404).json({
			msg: "el usuario no existe"
		})
	}

	res.json({ // Si lo encuentro, devuelvo el usuario
		msg: `devolviendo el usuario con id ${id}`,
		data: usuarios[indice]
	});
});


app.post('/usuarios', async (req, res) => { 
	const data = req.body; // Lo que recibo por parámetro del cliente
	console.log(req.body); 

	const { nombre, edad, goles } = req.body; // Desestructuro el body

	if(!nombre || !edad || !goles) { // Si no me mandan los datos, devuelvo un error
		return res.status(400).json({
			msg: "Campos invalidos :( "
		})
	}

    // Leo el archivo antes de crear el nuevo usuario asi le puedo asignar un id
    const fileData = await fs.readFile(filePath, 'utf-8');
    const usuarios = JSON.parse(fileData); 

	const nuevoUsuario = { // Creo el nuevo usuario
        id: usuarios.length + 1, // Le asigno un id
		nombre,
		edad,
		goles
	}

	usuarios.push(nuevoUsuario); // Agrego el nuevo usuario al array de usuarios

	await fs.writeFile(filePath, JSON.stringify(usuarios, null, '\t')); // Escribo el archivo

	res.json({ // Devuelvo el nuevo usuario
		msg: 'ok',
		data: nuevoUsuario
	})
});

app.put('/usuarios/:id', async (req, res) => { 
	const id = req.params.id; // Lo que recibo por parámetro del cliente
	const {nombre, edad, goles} = req.body; // Desestructuro el body

	const fileData = await fs.readFile(filePath, 'utf-8');
	const usuarios = JSON.parse(fileData);

	const indice = usuarios.findIndex(unUsuario => unUsuario.id == id);

	if(indice < 0){
		return res.status(404).json({
			msg: "el usuario no existe"
		})
	}

	if(!nombre || !edad || !goles) { // Si no me mandan los datos, devuelvo un error
		return res.status(400).json({
			msg: "Campos invalidos :( "
		})
	}

	const usuarioActualizado = { // Creo el usuario actualizado
		id: usuarios[indice].id,
		nombre,
		edad,
		goles
	}

	usuarios.splice(indice, 1, usuarioActualizado); // Reemplazo el usuario en el array de usuarios

	await fs.writeFile(filePath, JSON.stringify(usuarios, null, '\t')); // Escribo el archivo

	//actualizar
	res.json({ // Devuelvo el usuario actualizado
		msg: `Modificando objet con id ${id}`,
		data: usuarioActualizado,
	})
});

app.delete('/usuarios/:id', async (req, res) => {
	const id = req.params.id; // Lo que recibo por parámetro del cliente
	const fileData = await fs.readFile(filePath, 'utf-8');
	const usuarios = JSON.parse(fileData);

	const indice = usuarios.findIndex(unUsuario => unUsuario.id == id);

	if(indice < 0){ // Si no lo encuentro, devuelvo un error
		return res.json({
			msg: "user not found"
		})
	}

	usuarios.splice(indice, 1); // Elimino el usuario del array de usuarios
	await fs.writeFile(filePath, JSON.stringify(usuarios, null, '\t'));

	//borrar
	res.json({ // Devuelvo el usuario eliminado
		msg: `Borrando objet con id ${id}`,
	})
})


const puerto = 8080; 

app.listen(puerto, () => { 
	console.log(`Servidor Listo escuchando en el puerto ${puerto}`) 
})
