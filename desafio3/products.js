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
          "Se produjo un error al intentar guardar el archivo. " + error
        );
      });
  }

  getRandom() {
    let item = {};
    const maxId = Math.max(...this.file.map((file) => file.id));
    do {
      const randomId = Math.floor(Math.random() * (maxId + 1));
      item = this.file.find((object) => object.id === randomId);
    } while (item === undefined);
    if (Object.entries(item).length) {
      return item;
    } else {
      return "No hay productos guardados";
    }
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
      throw new Error("No se ha podido eliminar el producto. " + error);
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
      throw new Error("La operación no ha podido ser realizada " + error);
    }
  }
}

const products = new Contenedor("productos");

const saveProducts = () => {
  products.save({
    title: "Hamburguesa con panceta y mayonesa",
  price: 1300,
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamb3.jpg?alt=media&token=9e19428b-c41b-4a36-aae0-74b7ea0d7785",
  });
  products.save({
    title: "Hamburguesa con huevo",
  price: 1150,
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamb5.jpg?alt=media&token=b3adda66-2daa-4ca0-99e9-28916f45a86b",
  });
  products.save({
    title: "Hamburguesa con aros de cebolla",
    price: 1250,
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/mi-primer-react-444a3.appspot.com/o/hamb8.jpg?alt=media&token=1e9be460-cd0c-401c-aa15-06bedda2738b",
  });
};

module.exports = { products, saveProducts };