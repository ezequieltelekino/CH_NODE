import fs from "fs"
import { sm } from "./app.js"
import { productModel } from './models/products.model.js';


class ProductManager{

    productModel

    constructor(path){
        this.productos= [],
        this.path = path
        this.productModel = productModel
    }

    async getProducts(){
        try{
           // this.productos = JSON.parse(fs.readFileSync(this.path))
           let res = await this.productModel.find()
           let products = []

           res.forEach((p) => {
            products.push({
                id: p._id, 
                title: p.title,
                code: p.code,
                descrition: p.description,
                price: p.price 
                //suficiente 
            })

           }
         
           )
           console.log("Recibiendo ", products.length)
           return products
        }
        catch(err){
            console.log("Error leyendo mongocosas... devolviendo productos en blanco.", err)
            this.productos = []
         //   this.saveProducts()
        }
        console.log("Cantidad de productos:", this.productos.length)

    }

    saveProducts(){
        //fs.writeFileSync(this.path, JSON.stringify(this.productos))
        
    }

    getProductByID(id){
        this.productos = this.getProducts()
        let devolver = undefined
        this.productos.forEach((x) => {
            if ( Number(id) === Number(x.id)){
                devolver = x
            }
        })
        return devolver
    }
    
    deleteProductByID(id){
        this.productos = this.getProducts()

        if (!this.productos.some((producto) => producto.id == id )) {
            return false
        }
        let arrayTemporal = []
    
        this.productos.forEach(producto => {
            if(Number(producto.id) !== Number(id))
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
        this.products = this.getProducts()

        this.productos.forEach((x) => {
            if ( Number(id) === Number(x.id)){
                for(var key in p) {
                    x[key] = p[key]
                }
                this.saveProducts()

                return true
            }
        })
        return false
}
    
    async addProduct(p){
        try{
            this.products = await this.getProducts()
            
            //valido que no exista el código (que NO es el id, sino que puede ser cualquier cosa)
            console.log("Leyendo productos en add: " , this.products.length)
            if (this.products.some((producto) => producto.code == p.code )) {
                console.log("código dupluicado:",p)
                sm.avisarQueActualizaronProductos(false)
                return false
            }

            if (p.title == ""){
                sm.avisarQueActualizaronProductos(false)
                return false
            }


            /* let idDelNuevoProducto = 0
                // genero un id = 0, me quedo con el máximo del array existente, y le sumo uno (manera rústica,lo sé)
                this.productos.forEach(producto => {if(producto.id > idDelNuevoProducto)idDelNuevoProducto=producto.id})
                idDelNuevoProducto++
                p.id = idDelNuevoProducto
                this.productos.push(p)
                this.saveProducts()
            */
        
            console.log("Por agregar:",p)
            let result = await this.productModel.create(p)
            console.log("Result: ", result)
            sm.avisarQueActualizaronProductos(result._id)
            return true    
        }
        catch(error){
            console.log("Error en add product:", error)
        }
}
}
export {ProductManager};