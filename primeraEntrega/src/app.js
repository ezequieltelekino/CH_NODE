import express from 'express';
import productsRouter from "./routes/products.router.js" 
import cartsRouter from "./routes/carts.router.js"

const app = express();

app.use (express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const server = app.listen(8080, ()=> console.log("Escuchando en 8080")); 