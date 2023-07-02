import express from 'express';
import productsRouter from "./routes/products.router.js" 
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import SocketManager from "./SocketManager.js"
import mongoose from 'mongoose';

const app = express();
const httpServer = app.listen(8080, () => console.log("Escuchando en 8080")); 
const sm = new SocketManager(httpServer) ;
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set ("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));

app.use (express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
const MONGO_URL = "mongodb+srv://ezequieltelekino:puqG7MAMwJHA1F9q@cluster0.jwb08ed.mongodb.net/ecommerce"
const connection = mongoose.connect(MONGO_URL).then((conn) => {
    console.log("Conectado correctamente con Atlas");
}).catch ((err) =>{
    console.log("Error:" +  err)
})
 export {sm}
