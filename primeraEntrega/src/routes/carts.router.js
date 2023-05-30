import { Router } from 'express';
import{CartManager} from '../CartManager.js';

const router = Router();
let cm = new CartManager("carritos.json")

router.get("/", (req,res) => {
    res.send(cm.getCarts())
}) 

router.get("/:cid", (req,res) => {
    let cid = req.params.cid
    let devolver = cm.getCartByID(cid)
    if (!devolver){
        res.status(404).send("Carrito no encontrado")
        return
    }
    res.send(devolver)
}) 


router.post("/:cid/product/:pid", (req,res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let quantity = req.body.quantity
    if (!quantity)
        quantity = 1   // cantidad por defecto, si no mandan nada
    let resultado = cm.addProductToCart(pid, cid,quantity)
    if (resultado)
        res.status(201).send("Agregando " + quantity + " del producto " + pid + " carrito " + cid )
    else
        res.status(404).send("Carrito no encontrado")
    return

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