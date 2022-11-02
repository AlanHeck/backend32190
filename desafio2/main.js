const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
    this.file = [];
  }

  save(object) {
    let id;
    if (!this.file.length) {
      id = 1;
      this.file.push({ ...object, id });
    } else {
      const ids = this.file.map((file) => file.id);
      id = Math.max(...ids) + 1;
      this.file.push({ ...object, id });
    }
    fs.promises
      .writeFile(`./${this.nombre}.txt`, JSON.stringify(this.file, null, 2))
      .then(() => id)
      .catch((error) => {
        throw new Error(
          "Error, archivo no guardado. " + error
        );
      });
  }

  getById(id) {
    return this.file.find((object) => object.id === id) || null;
  }

  getAll() {
    return this.file.length ? this.file : "No hay productos";
  }

  async deleteById(id) {
    const newFile = this.file.filter((object) => object.id !== id);
    this.file = newFile;
    try {
      await fs.promises.writeFile(
        `./${this.nombre}.txt`,
        JSON.stringify(newFile, null, 2)
      );
    } catch (error) {
      throw new Error("No se pudo eliminar el producto. " + error);
    }
  }

  async deleteAll() {
    this.file = [];
    try {
      await fs.promises.writeFile(
        `./${this.nombre}.txt`,
        JSON.stringify(this.file, null, 2)
      );
    } catch (error) {
      throw new Error("Operacion no realizada " + error);
    }
  }
}

const productos = new Contenedor("productos");

productos.save({
  title: "Hamburguesa con panceta y mayonesa",
  price: 1300,
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamb3.jpg?alt=media&token=9e19428b-c41b-4a36-aae0-74b7ea0d7785",
});
productos.save({
  title: "Hamburguesa con huevo",
  price: 1150,
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamb5.jpg?alt=media&token=b3adda66-2daa-4ca0-99e9-28916f45a86b",
});
productos.save({
  title: "Hamburguesa con aros de cebolla",
  price: 1250,
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamb8.jpg?alt=media&token=1e9be460-cd0c-401c-aa15-06bedda2738b",
});

console.log("obtener producto con id = 3: ", productos.getById(3));

console.log("obtener productos: ", productos.getAll());

setTimeout(() => {
  console.log("borrar producto con id 2");
  productos.deleteById(2);

  console.log("obtener producto con id = 2: ", productos.getById(2)); // null

  productos.save({
    title: "Hamburguesa vegetariana",
    price: 1050,
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamburguesa2.jpg?alt=media&token=766a9c98-9dd5-41ec-9aaf-db5aecbe7df8",
  });
  console.log("obtener productos: ", productos.getAll()); // id = 4
}, 2000);

setTimeout(() => {
  console.log("borrar todos los productos");
  productos.deleteAll();

  console.log("obtener productos: ", productos.getAll()); // No hay productos
}, 5000);