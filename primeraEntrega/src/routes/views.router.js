import express from "express";
import { ProductManager } from "../ProductManager.js";

const viewsRouter = express.Router();
const pm = new ProductManager("products.json");


viewsRouter.get("/realTimeProducts", (req, res) => {
    let listaDeProductos = pm.getProducts()


  //  socket.emit("evento_para_todos", {listaDeProductos: "listaDeProductos"})
    res.render("realTimeProducts", {listaDeProductos: listaDeProductos});
    
 //   res.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`);

});


export default viewsRouter;