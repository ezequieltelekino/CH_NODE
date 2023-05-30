import { Router } from 'express';
import{CartManager} from '../CartManager.js';
import {Product} from '../Product.js';


const router = Router();
let carritos = new CartManager("carritos.json")

router.get("/", (req,res) => {
    res.send(carritos.getCarts())
}) 


router.post("/", (req, res) => {
    carritos.carts = carritos.getCarts()
    let carrito = carritos.addCart()
    if (carrito)
        res.status(201).send(" Carrito agregado correctamente")
    else
        res.status(404).send(" Error al agregar carrito: No se me ocurre cuál pueda llegar a ser el error.")
})

export default router;