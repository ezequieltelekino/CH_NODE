import express from 'express';
import productsRouter from "./routes/products.router.js" 
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { ProductManager } from "./ProductManager.js";

const app = express();
const httpServer = app.listen(8080, () => console.log("Escuchando en 8080")); 
const socketsServer = new Server(httpServer)

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set ("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));

app.use (express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)
const pm = new ProductManager("products.json");

socketsServer.on("connection", (socket) => {
   
    socket.broadcast.emit ("user_connected", `Usuario: ${socket.id} conectado, saluden!`);   // les llega a todos, menos al que llegó
    socket.emit("evento_para_socket_individual", `Usuario: ${socket.id}, de damos la bienvenida.`);  

    socket.on("actualizar_lista", (data) => {
        let listaDeProductos = pm.getProducts()
        socket.emit("evento_para_todos", {listaDeProductos})
    });
    
});