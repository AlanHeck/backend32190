const express = require('express');
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));
const router = Router();

const productos = [];

function getProductById(id) {
    const producto = productos.find(producto => producto.id === id);
    return producto;
}

function deleteProductById(id) {
    const producto = getProductById(id);
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
}

function replaceProduct(id, nuevoProducto) {
    const producto = getProductById(id);
    producto.title = nuevoProducto.title;
    producto.price = nuevoProducto.price;
    producto.thumbnail = nuevoProducto.thumbnail;
    const index = productos.indexOf(producto);
    productos[index] = producto;
}

//Middleware
function productExist(req, res, next) {
    if (!productos.some(product => product.id === Number(req.params.id))) {
        res.json({ error: "Producto no encontrado" })
    } else {
        next();
    }

}

function getLastId() {
    if (productos.length === 0) {
        return 0;
    }

    const lastId = productos[(productos.length - 1)].id;
    return lastId;
}

router.get("/", (req, res) => {
    res.json(productos);
});

router.get("/:id", productExist, (req, res) => {
    const id = Number(req.params.id);
    const productoBuscado = getProductById(id);
    res.json(productoBuscado);
});

router.post("/", (req, res) => {
    const producto = req.body;
    const idAsignado = getLastId() + 1;
    producto.id = idAsignado;
    productos.push(producto);
    res.json(producto);
});

router.put("/:id", productExist, (req, res) => {
    const id = Number(req.params.id);
    const nuevoProducto = req.body;
    replaceProduct(id, nuevoProducto);
    res.json({ status: "Producto reemplazado" });
});

router.delete("/:id", productExist, (req, res) => {
    const id = Number(req.params.id);
    deleteProductById(id);
    res.json({ status: "Producto eliminado" });
});

app.use('/api/productos', router);

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor: ${error}`));