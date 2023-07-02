import fs from "fs"
import { cartModel } from "./dao/models/carts.model.js"

class CartManager{

    cartModel

    constructor(path){
        this.carts = [],
        this.path = path
        this.cartModel = cartModel
    }

    saveCarts(){
        fs.writeFileSync(this.path, JSON.stringify(this.carts))
    }

    async getCarts(){
        try{
            let res = await this.cartModel.find()
            let carts = []

            res.forEach((p) => {
             carts.push({
                 id: p._id, 
                 products: p.products,
             })
            });
            this.carts = carts
            return carts
            //this.carts = JSON.parse(fs.readFileSync(this.path))
        }
        catch{
            console.log("Saliendo por el catch")
            this.carts = []
            return []
          //  this.saveCarts()
      //      console.log ("El archivo " + this.path + " no existe, creándolo en blanco.")
        }
        return this.carts
    }

    async getCartByID(cid){

        let carrito 
       // console.log(carrito)
      //  this.carts = this.getCarts()
      //  let devolver = undefined
        // this.carts.forEach((x) => {
        //     if ( Number(id) === Number(x.id)){
        //         devolver = x
        //     }
        // })
        return carrito
    }
    
    async addCart(){
        this.carts = this.getCarts()
        let id = 0
        this.carts.forEach(carrito => {if(carrito.id > id)id=carrito.id})
        id++
        this.carts.push({id, products})
        this.carts.push(products)

        this.saveCarts()
        return id
    }

    async addProductToCart(pid, cid, quantity){
        console.log("Agregando al carrito " , cid, pid, quantity)
        //this.carts = await this.getCarts()
        //console.log("El contenido del carrito antes de agregar es:" ,this.carts)
        let carrito = await this.cartModel.findOne({_id: cid})
       // console.log("El carrito encontrado es: ", carrito)
        let productoEncontrado = false
        let productos = []
        let productoNuevo = {id: pid, quantity: quantity }

        if (!carrito || carrito.length === 0){
            console.log ("Carrito no encontrado")
            return false
        }
        carrito.products.forEach((p) => {     // reviso todos sus artículos
          //  console.log("Viendo el producto ", p , " en ", carrito)
            if ( Number(pid) == Number(p.id)){  // si existe el que voy a agregar, lo sumo
                console.log("el producto es: " , p.id)
                console.log("y tiene: " , p.quantity)
                productoEncontrado = true
                console.log ("sumando",productoNuevo.quantity, " a las " , p.quantity , " anteriores")
                productoNuevo.quantity += p.quantity
            }
            else{    
                let tmp = {id: p.id, quantity: p.quantity}
                productos.push(tmp)
            }
        
        })
        productos.push(productoNuevo)
        console.log("La lista de productos es: ", productos)
        let res = await this.cartModel.updateOne({_id: cid}, {products: productos})
        console.log(res)

        return true  
    }
}
export {CartManager};