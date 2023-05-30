import { Router } from 'express';
import{ProductManager} from '../ProductManager.js';
import {Product} from '../Product.js';

const router = Router();
const pm = new ProductManager("products.json");
 
router.get("/", (req,res) => {
    res.send(pm.getProducts())
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

router.post("/", (req, res) => {
    let x = req.body
    let imagenes = []  // thumbnails es optativo, le dejo esto hardcodeado
    imagenes.push("primerPath")
    imagenes.push("segundoPath")
    let p = new Product(x.title, x.description, x.price, imagenes, x.code, x.stock )
    if (pm.addProduct(p))
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