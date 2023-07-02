import { ProductManager } from "./ProductManager.js";
import { Server } from "socket.io"
import { messageModel } from "./dao/models/messages.model.js";

class SocketManager{
    constructor(httpServer){
        if (SocketManager.instance){
            this.veces++
            console.log("instancia llamada " + this.veces + " veces")
            return SocketManager.instance
        }
        
        this.io = new Server(httpServer)
        this.veces = 1
        console.log("instancia llamada " + this.veces + " vez")

        this.io.on("connection", (socket) => {
            socket.broadcast.emit ("user_connected", `Usuario: ${socket.id} conectado, saluden!`);   // les llega a todos, menos al que llegó
            socket.emit("evento_para_socket_individual", `Usuario: ${socket.id}, de damos la bienvenida.`);  
            console.log("Cliente conectado al back:", socket.id)

            socket.on("solicito_agregar_producto", (product) => {
                const pm = new ProductManager("products.json")
                console.log("El cliente ", socket.id , " actualizó productos",  product)

                pm.addProduct(product)
                socket.emit("evento_para_socket_individual", `Usuario: ${socket.id}, actualizaste productos.`);  
                this.io.emit("actualizar_productos", pm.getProducts())
            });

            socket.on("enviar_mensaje", async (user, msg) => {
                console.log("El cliente ", user , " dijo: ",  msg)
                const mensaje = await messageModel.create({user: user, message: msg})
                const mensajes = await messageModel.find()
                this.io.emit("actualizar_chat", mensajes)
            });
        });

        SocketManager.instance = this
        return this
    }

    handleConnection(socket) {
        socket.broadcast.emit(
            "user_connected",
            `Usuario: ${socket.id} conectado, saluden!`
        );

        socket.emit(
            "evento_para_socket_individual",
            `Usuario: ${socket.id}, de damos la bienvenida.`
        );

        socket.on("disconnect", () => {
         this.handleDisconnection(socket);
        });
    }

    async avisarQueActualizaronProductos() {
        const pm = new ProductManager("products.json")
        let productos = await pm.getProducts()
        console.log("aviso que actualizaron productos: " + productos.length);
        this.io.emit("actualizar_productos",productos);
    }
}

export default SocketManager;