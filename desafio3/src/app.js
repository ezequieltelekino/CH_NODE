//const fs = require("fs")
import fs from "fs"
import express from "express"

class Producto {
    constructor(title, description, price, thumbnail, code, stock){
        this.id = undefined
        this.title = title 
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

class ProductManager{

    constructor(path){
        this.productos= [],
        this.path = path
    }

    getProductsFromArray(){
      //  console.log("Devolviendo " + this.productos.length + " productos")
        return this.productos
    }

    getProducts(){
        //console.log("Generando un nuevo array desde " + this.path)
        this.productos = JSON.parse(fs.readFileSync(this.path))
        return this.productos
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.productos))
    }

    getProductByID(id){
        let devolver = undefined
        this.productos.forEach((x) => {
            if ( Number(id) === Number(x.id)){
                devolver = x
            }
        })
        return devolver
    }
    

    deleteProductByID(id){
        if (!this.productos.some((producto) => producto.id == id )) {
            return false
        }

        let arrayTemporal = []
    
        this.productos.forEach(producto => {
            if(producto.id !== id)
                arrayTemporal.push(producto)
        })

        // no sé si el scope me permite asignarlo directamente, así que le hago un nuevo push sobre un array vacío
        this.productos = []
        arrayTemporal.forEach(producto => {
          this.productos.push(producto)
        })

        this.saveProducts()
        return true
    }
    

    updateProduct(id , p){
        // Me parece más prolijo (y sencillo!) recibir el objeto completo que el ID y el campo a actualizar, así que lo hago de ese modo.
        let codigoExistente = false
        let actualizado = false
        this.productos.forEach(producto => {
            if(producto.id === id){
                // En caso de que el ID exista, debería actualizar el producto siempre y cuando el code no exista en otro artículo
                this.productos.forEach(x => {
                    if(x.id !== id){
                        if(x.code === p.code)
                            codigoExistente = true
                    }
                })
            
                if (!codigoExistente){  // si el id existía, pero el código no... puedo actualizar!
                    producto.title = p.title 
                    producto.description = p.description
                    producto.price = p.price
                    producto.thumbnail = p.thumbnail
                    producto.code = p.code
                    producto.stock = p.stock
                    actualizado = true
                 }
                }  
        })
        this.saveProducts()
        return actualizado
}
    

    addProduct(p){

        //valido que no exista el código (que NO es el id, sino que puede ser cualquier cosa)
        if (this.productos.some((producto) => producto.code == p.code )) {
            return false
        }

        // genero un id = 0, me quedo con el máximo del array existente, y le sumo uno (manera rústica,lo sé)
        let idDelNuevoProducto = 0
        this.productos.forEach(producto => {if(producto.id > idDelNuevoProducto)idDelNuevoProducto=producto.id})
        idDelNuevoProducto++
        p.id = idDelNuevoProducto
        this.productos.push(p)
        this.saveProducts()
        return true
    }
}

// genero algunos productos para después agregarlos
const producto1 = new Producto("manzana", "roja deliciosa", 100, "/dev/null", "manz01", 10)
const producto2 = new Producto("manzana", "verde", 110, "/dev/null", "manz01", 11)  // code repetido, debería bocharme
const producto3 = new Producto("manzana", "verde deliciosa", 120, "/dev/null", "manz02", 12)
const producto4 = new Producto("banana", "de Ecuador", 130, "/dev/null", "banana01", 13)
const producto5 = new Producto("ananá", "rasposa", 140, "/dev/null", "anana01", 14)

const administradorDeProductos = new ProductManager("productos.json")

administradorDeProductos.addProduct(producto1)
administradorDeProductos.addProduct(producto2)
administradorDeProductos.addProduct(producto3)
administradorDeProductos.addProduct(producto4)
administradorDeProductos.addProduct(producto5)

administradorDeProductos.getProductsFromArray()

// Hasta acá, es el desafio 1. ahora guardo los productos que venía usando para generar el archivo json
administradorDeProductos.saveProducts()


// Para asegurarme de que los productos se lean del disco, genero un objeto nuevo y lo muestro (vacío)
const administradorDeProductosNuevo = new ProductManager("productos.json")

administradorDeProductosNuevo.getProducts() 

const producto6 = new Producto("frutilla", "dulce", 150, "/dev/null", "frutilla01", 14)


const app = express();
app.get("/products", (req, res) => {
    let limit = req.query.limit
    let productos = administradorDeProductosNuevo.getProducts()
    if (limit === undefined)
        res.send (productos)
    else
        res.send (productos.slice(0,limit)
    )
})

app.get("/products/:pid", (req, res) => {
    let pid = req.params.pid
    res.send(administradorDeProductosNuevo.getProductByID(pid))
})

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")

})