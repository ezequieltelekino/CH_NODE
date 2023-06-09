import express from "express";
import { ProductManager } from "../ProductManager.js";

const viewsRouter = express.Router();
const pm = new ProductManager("products.json");


viewsRouter.get("/realTimeProducts", (req, res) => {
    let listaDeProductos = pm.getProducts()
    res.render("realTimeProducts", {listaDeProductos: listaDeProductos});
});

viewsRouter.get("/home", (req, res) => {
    let listaDeProductos = pm.getProducts()
    res.render("home", {listaDeProductos: listaDeProductos});
});

export default viewsRouter;