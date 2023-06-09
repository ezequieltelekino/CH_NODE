import express from "express";
import { ProductManager } from "../ProductManager.js";

const viewsRouter = express.Router();
const pm = new ProductManager("products.json");


viewsRouter.get("/realtimeproducts", (req, res) => {
    let listaDeProductos = pm.getProducts()
    res.render("realTimeProducts", {listaDeProductos: listaDeProductos});
});

viewsRouter.get("/", (req, res) => {
    let listaDeProductos = pm.getProducts()
    res.render("home", {listaDeProductos: listaDeProductos});
});

viewsRouter.get("/home", (req, res) => {  // no entendí si tenía que ser en la raíz, o en /home, pero lo duplico... por las dudas
    let listaDeProductos = pm.getProducts()
    res.render("home", {listaDeProductos: listaDeProductos});
});

export default viewsRouter;