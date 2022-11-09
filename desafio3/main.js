const express = require("express");
const { products, saveProducts } = require("./products");
const app = express();
const PORT = 8080;
saveProducts();

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

app.get("/productos", (req, res) => {
  res.send(products.getAll());
});

app.get("/productoRandom", (req, res) => {
  res.send(products.getRandom());
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));