import { Router } from 'express';
import{ProductManager} from '../ProductManager.js';
import {Product} from '../Product.js';

const router = Router();
const pm = new ProductManager("products.json");
 
router.get("/", async (req,res) => {
    console.log("En el router tengo ", productos.length)
    const productos = await pm.getProducts()
    console.log("En el router tengo ", productos.length)
    res.send(productos)
    console.log("En el router tengo ", productos.length)
}) 

router.get("/:pid", (req,res) => {
        let id = req.params.pid
        let devolver = pm.getProductByID(pid)
        if (!devolver){
            res.status(404).send("Producto no encontrado")
            return
        }
        res.send(devolver)
    }) 

router.post("/", async (req, res) => {
    let x = req.body
    let imagenes = []  // thumbnails es optativo, le dejo esto hardcodeado
    imagenes.push("primerPath")
    imagenes.push("segundoPath")
    let p = new Product(x.title, x.description, x.price, imagenes, x.code, x.stock )
    let result = await pm.addProduct(p) 
    if (result)
        res.status(201).send(" Producto agregado correctamente")
    else
        res.status(404).send(" Error al agregar producto: El código ya existía.")
})


router.put("/:pid", (req, res) => {
    let nuevoObjeto = {}
    for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
            if (!(key == "id" || key == "code")){  // no puedo actualizar id ni código
                nuevoObjeto[key] = req.body[key]
            }
        }
      }

    if (pm.updateProduct(req.params.pid, nuevoObjeto))
        res.status(201).send(" Producto actualizado correctamente")
    else
        res.status(404).send(" Error al actualizar el producto: ID inexistente.")
})

router.delete("/:pid", (req, res) => {
 
    if (pm.deleteProductByID(req.params.pid))
        res.status(201).send(" Producto eliminado correctamente")
    else
        res.status(404).send(" Error al eliminar el producto: ID inexistente.")
})

export default router;