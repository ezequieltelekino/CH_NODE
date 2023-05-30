import fs from "fs"

class ProductManager{

    constructor(path){
        this.productos= [],
        this.path = path
    }



    getProducts(){
        //console.log("Generando un nuevo array desde " + this.path)
        try{
            this.productos = JSON.parse(fs.readFileSync(this.path))
        }
        catch{
            console.log ("El archivo " + this.path + " no existe.")
        }
        return this.productos
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.productos))
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
        console.log("Intentando agregar (addproduct)" ,p)
        this.productos = this.getProducts()
        console.log("Recibiendo lista de artículos" , this.productos)

        //valido que no exista el código (que NO es el id, sino que puede ser cualquier cosa)
        if (this.productos.some((producto) => producto.code == p.code )) {
            console.log("Ya existía!", p.code)

            return false
        }

        // genero un id = 0, me quedo con el máximo del array existente, y le sumo uno (manera rústica,lo sé)
        let idDelNuevoProducto = 0
        this.productos.forEach(producto => {if(producto.id > idDelNuevoProducto)idDelNuevoProducto=producto.id})
        idDelNuevoProducto++
        p.id = idDelNuevoProducto
        this.productos.push(p)
        this.saveProducts()
        console.log("Se agrega con el ID ", p.id)

        return true
    }
}
export {ProductManager};