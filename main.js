class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombreDeMascota){
        this.mascotas.push(nombreDeMascota);
    }

    countMascotas() {
        return `${this.mascotas.length}`;
    }

    addBook(nombreDelLibro, autorDelLibro) {
        this.libros.push({
            nombre: nombreDelLibro,
            autor: autorDelLibro,
        });
    }

    getBookNames() {
        return this.libros.map(function (item){
            return item.nombre
        });
    }
}

const usuario = new Usuario ("Alan", "Heck", [
    {
        nombre: "El Hobbit",
        autor: "Tolkien"
    },
    {
        nombre: "El Señor de los Anillos",
        autor: "Tolkien"
    }
],
["Irelia", "Pepe", "Roma"]
);

usuario.getFullName()
usuario.addMascota("Chicho")
usuario.addMascota("Betun")
usuario.countMascotas()
usuario.addBook("El Simarillion", "Tolkien")
usuario.getBookNames()

console.log(usuario)
console.log(usuario.countMascotas())
console.log(usuario.getFullName())
console.log(usuario.getBookNames())

