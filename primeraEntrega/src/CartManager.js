import fs from "fs"

class CartManager{

    constructor(path){
        this.carts = [],
        this.path = path
    }

    saveCarts(){
        fs.writeFileSync(this.path, JSON.stringify(this.carts))
    }

    getCarts(){
        try{
            this.carts = JSON.parse(fs.readFileSync(this.path))
        }
        catch{
            this.carts = []
            this.saveCarts()
      //      console.log ("El archivo " + this.path + " no existe, creándolo en blanco.")
        }
        return this.carts
    }

    getCartByID(id){
        this.carts = this.getCarts()
        let devolver = undefined
        this.carts.forEach((x) => {
            if ( Number(id) === Number(x.id)){
                devolver = x
            }
        })
        return devolver
    }
    
    addCart(){
        this.carts = this.getCarts()
        let id = 0
        let products = []
        this.carts.forEach(carrito => {if(carrito.id > id)id=carrito.id})
        id++
        this.carts.push({id, products})
        this.saveCarts()
        return id
    }

    addProductToCart(pid, cid, quantity){
        this.carts = this.getCarts()
        let carritoEncontrado = false
        this.carts.forEach((c) => {
            if ( Number(cid) === Number(c.id)){   // en el carrito correspondiente

                let productoEncontrado = false
                carritoEncontrado = true
                
                c.products.forEach((p) => {     // reviso todos sus artículos
                    if ( Number(pid) == Number(p.id)){  // si existe el que voy a agregar, lo sumo
                        productoEncontrado = true
                        p.quantity += quantity
            //            console.log ("sumando",cid, pid,  quantity, p.quantity)
                    }
                })
                if (!productoEncontrado){
                    let nuevoProducto = {id:pid, quantity:quantity}
              //      console.log("Agregando ", cid, nuevoProducto)
                    c.products.push(nuevoProducto)
                }
               // console.log("Guardando carrito")
                this.saveCarts()
                return true
            }
        })
        if (!carritoEncontrado){
           // console.log("No encontré el carrito, posta!")
            return false
        }else{
            return true
        }
    }

}
export {CartManager};