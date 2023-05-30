import { Router } from 'express';
import{ProductManager} from '../ProductManager.js';
import {Product} from '../Product.js';
//import { ProductManager } from "../ProductManager.js"
//import { Product } from "../Product.js"

const router = Router();
const pm = new ProductManager("products.json");
 
router.get("/", (req,res) => {
    console.log("get de todos los productos: ", pm.getProducts())
    res.send(pm.getProducts())
}) 

router.get("/:id", (req,res) => {
        let id = req.params.id
        let devolver = pm.getProductByID(id)
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
export default router;