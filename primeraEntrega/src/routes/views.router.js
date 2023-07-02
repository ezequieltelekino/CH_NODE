import express from "express";
import { ProductManager } from "../ProductManager.js";
import { messageModel } from "../dao/models/messages.model.js";

const viewsRouter = express.Router();
const pm = new ProductManager("products.json");


viewsRouter.get("/realtimeproducts", async (req, res) => {   
    let listaDeProductos = await pm.getProducts()
    res.render("realTimeProducts", {listaDeProductos: listaDeProductos});
});

viewsRouter.get("/", async (req, res) => {
    let listaDeProductos = await pm.getProducts()
    console.log("En el router tengo ", listaDeProductos)

    res.render("home", {listaDeProductos: listaDeProductos});

});

viewsRouter.get("/home", (req, res) => {  // no entendí si tenía que ser en la raíz, o en /home, pero lo duplico... por las dudas
    let listaDeProductos = pm.getProducts()
    res.render("home", {listaDeProductos: listaDeProductos});
});



export default viewsRouter;