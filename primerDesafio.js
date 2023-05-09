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

    constructor(){
        this.productos= []
    }

    getProducts(){
        console.log("Devolviendo " + this.productos.length + " productos")
        return this.productos
    }

    getProductByID(id){
        let devolver = undefined
        this.productos.forEach(producto => {if(producto.id === id)devolver=producto})

        if (devolver === undefined){
            console.log("Not found.")
        }else{
            console.log ("Devolviendo el producto " + id, devolver)
        }
        return devolver  //si encontró algo, devuelve el objeto, de lo contrario, devuelve undefined.
    }
    
    addProduct(p){

        //valido que no exista el código (que NO es el id, sino que puede ser cualquier cosa)
        if (this.productos.some((producto) => producto.code == p.code )) {
            console.log ("Se ignora el producto " + p.code) +  " porque está repetido."
            return
        }

        // genero un id = 0, me quedo con el máximo del array existente, y le sumo uno (manera rústica,lo sé)
        let idDelNuevoProducto = 0
        this.productos.forEach(producto => {if(producto.id > idDelNuevoProducto)idDelNuevoProducto=producto.id})
        idDelNuevoProducto++
        p.id = idDelNuevoProducto
        this.productos.push(p)
    }
}

// genero algunos productos para después agregarlos
const producto1 = new Producto("manzana", "roja deliciosa", 100, "/dev/null", "manz01", 10)
const producto2 = new Producto("manzana", "verde", 110, "/dev/null", "manz01", 11)  // code repetido, debería bocharme
const producto3 = new Producto("manzana", "verde deliciosa", 120, "/dev/null", "manz02", 12)
const producto4 = new Producto("banana", "de Ecuador", 130, "/dev/null", "banana01", 13)
const producto5 = new Producto("ananá", "rasposa", 140, "/dev/null", "anana01", 14)

console.log("Muestro los productos que voy a incluir")
console.log (producto1,producto2,producto3,producto4,producto5)

const administradorDeProductos = new ProductManager()
console.log("Agrego producto 1")
administradorDeProductos.addProduct(producto1)
let productos = administradorDeProductos.getProducts()

console.log ("Agrego producto 2 (debería fallar)")
administradorDeProductos.addProduct(producto2)
productos = administradorDeProductos.getProducts()

console.log ("Agrego producto 3")
administradorDeProductos.addProduct(producto3)
productos = administradorDeProductos.getProducts()

console.log ("Agrego producto 4")
administradorDeProductos.addProduct(producto4)
productos = administradorDeProductos.getProducts()

console.log ("Agrego producto 5")
administradorDeProductos.addProduct(producto5)
productos = administradorDeProductos.getProducts()


console.log("Busco el producto 10")
administradorDeProductos.getProductByID(10)

console.log("Busco el producto 3")
administradorDeProductos.getProductByID(3)
