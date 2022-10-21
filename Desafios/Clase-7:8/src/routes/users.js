const { Router } = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = Router();

const filePath = path.resolve('/Users/alanluna/Devs/DesafiosBackend/Desafios/Clase-7:8/users.json');
console.log(filePath); 

// Middleware
const nameValidator = (req, res, next) => {
    const { name } = req.headers;
    if (!name) {
        return res.status(400).json({ msg: 'No se recibio nombre' });
    }
    console.log(`Request from ${name} - Middleware users`);
    next();
}

router.get('/',nameValidator , async (req, res) => { 
	const fileData = await fs.readFile(filePath, 'utf-8');
	const usuarios = JSON.parse(fileData);
	res.json({ 
		data: usuarios,
	});
});

router.get('/:id', async (req, res) => {
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


router.post('/', async (req, res) => { 
	const data = req.body; // Lo que recibo por parámetro del cliente
	console.log(data); 

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

router.put('/:id', async (req, res) => { 
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;