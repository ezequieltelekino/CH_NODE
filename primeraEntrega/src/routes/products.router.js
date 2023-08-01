import { Router } from 'express';
import{ProductManager} from '../ProductManager.js';
import {Product} from '../Product.js';

const router = Router();
const pm = new ProductManager("products.json");
 
router.get("/",  (req,res) => {
    const limit = req.query.limit
    console.log("limit es " + limit)
    const productos =  pm.getProducts(limit)
    res.send(productos)
}) 

router.get("/:pid", async(req,res) =>  {
        let pid = req.params.pid
        try{
            let devolver =  await pm.getProductByID(pid)
            res.send(devolver)
        }   
        catch{
            res.status(404).send("Producto no encontrado")
        }
    }) 

router.post("/", (req, res) => {
    let x = req.body
    let imagenes = []  // thumbnails es optativo, le dejo esto hardcodeado
    imagenes.push("primerPath")
    imagenes.push("segundoPath")
    let p = new Product(x.title, x.description, x.price, imagenes, x.code, x.stock )
    let result =  pm.addProduct(p) 
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

router.delete("/:pid", async (req, res) => {
    let result = await pm.deleteProductByID(req.params.pid)
    if (result === true)
        res.status(201).send(" Producto eliminado correctamente")
    else
        res.status(404).send(" Error al eliminar el producto: ID inexistente.")
})

export default router;