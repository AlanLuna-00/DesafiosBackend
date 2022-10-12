class Usuario {
    nombre;
    apellido;
    libros;
    mascotas;

    constructor(nombre,apellido,libros,mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() { return `${this.nombre} ${this.apellido}`;}

    addMascotas(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() { return this.mascotas.length; }

    addBooks(nombre, autor) {
        this.libros.push({ nombre: nombre, autor: autor });
    }

    getBooksNames() { 
        let listBooksNames = [];
        this.libros.forEach((libro) => listBooksNames.push(libro.nombre))
        return listBooksNames
     }
}

let usuario1 = new Usuario('Alan', 'Luna',
                [
                    {nombre:'El principito', autor: 'Antoine de Saint-Exupéry'},
                    {nombre:'Don Quijote de la Mancha', autor:'Miguel de Cervantes'}
                ],
                ['Rubio', 'Operada']
)

// Obtengo el nombre
console.log(usuario1.getFullName())

// Pusheo las mascotas
usuario1.addMascotas('Hoshi')
usuario1.addMascotas('Fiu')
usuario1.addMascotas('Tobi')

// Obtengo la cantidad de mascotas
console.log(usuario1.countMascotas())

// Pusheo libros
usuario1.addBooks('Maldito Karma', 'David Safier')
usuario1.addBooks('Clean Code', 'Robert C. Martin')

// Obtengo los nombres de los libros
console.log(usuario1.getBooksNames())