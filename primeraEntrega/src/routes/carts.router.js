import { Router } from 'express';
import{CartManager} from '../CartManager.js';
import {Product} from '../Product.js';


const router = Router();
let cm = new CartManager("carritos.json")

router.get("/", (req,res) => {
    res.send(cm.getCarts())
}) 

router.get("/:cid", (req,res) => {
    let id = req.params.cid
    let devolver = cm.getCartByID(id)
    if (!devolver){
        res.status(404).send("Carrito no encontrado")
        return
    }
    res.send(devolver)
}) 

router.post("/", (req, res) => {
    cm.carts = cm.getCarts()
    let carrito = cm.addCart()
    if (carrito)
        res.status(201).send(" Carrito " + carrito +" agregado correctamente")
    else
        res.status(404).send(" Error al agregar carrito: No se me ocurre cuál pueda llegar a ser el error.")
})

export default router;