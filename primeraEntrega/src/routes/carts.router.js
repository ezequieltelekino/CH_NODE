import { Router } from 'express';
import{CartManager} from '../CartManager.js';
import { cartModel } from '../dao/models/carts.model.js';

const router = Router();
let cm = new CartManager("carritos.json")

router.get("/", async (req,res) => {
     res.send(await cm.getCarts())
}) 

router.get("/:cid", async (req,res) => {
    let cid = req.params.cid
    let devolver
    try{
        devolver =  await cartModel.find({_id: cid})
        res.send(devolver)
    } 
    catch{
        res.status(404).send("Carrito no encontrado")
    }    
}) 


router.post("/:cid/product/:pid", async (req,res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let quantity = req.body.quantity
    if (!quantity)
        quantity = 1   // cantidad por defecto, si no mandan nada
    let resultado = await cm.addProductToCart(pid, cid,quantity)
    if (resultado)
        res.status(201).send("Agregando " + quantity + " del producto " + pid + " carrito " + cid )
    else
        res.status(404).send("Carrito no encontrado")
    return

}) 

router.post("/", async (req, res) => {
   // cm.carts = cm.getCarts()
    console.log("Agregando carrito")
   // let carrito = cm.addCart()
   let carrito = await cartModel.create([{}])

    if (carrito)
        res.status(201).send(" Carrito " + carrito +" agregado correctamente")
    else
        res.status(404).send(" Error al agregar carrito: No se me ocurre cuál pueda llegar a ser el error.")
})

export default router;