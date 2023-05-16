const fs = require("fs")

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
    actualizar( p){
        this.id = p.id
        this.title = p.title 
        this.description = p.description
        this.price = p.price
        this.thumbnail = p.thumbnail
        this.code = p.code
        this.stock = p.stock
    }
}

class ProductManager{

    constructor(){
        this.productos= [],
        this.path = "productos.json"
    }

    getProductsFromArray(){
        console.log("Devolviendo " + this.productos.length + " productos")
        return this.productos
    }

    getProducts(){
        console.log("Generando un nuevo array desde " + this.path)
        this.productos = JSON.parse(fs.readFileSync(this.path))
        return this.productos
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.productos))
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
    

    deleteProductByID(id){
                //valido que no exista el código (que NO es el id, sino que puede ser cualquier cosa)
        if (!this.productos.some((producto) => producto.id == id )) {
            console.log ("No se encuentra el ID a eliminar: " + id +  ". Saliendo sin hacer nada.")
            return false
        }

        let arrayTemporal = []
        

        this.productos.forEach(producto => {
            if(producto.id !== id)
                arrayTemporal.push(producto)
            else
             console.log("eliminando el producto", producto)

        })


        // no sé si el scope me permite asignarlo directamente, así que le hago un nuevo push sobre un array vacío
        this.productos = []
        arrayTemporal.forEach(producto => {
          this.productos.push(producto)
          console.log("manteniendo el producto", producto)
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
                 }else{
                    console.log ("El id "+id+ " existe, pero el código " + p.code +" ya estaba en otro producto.")
                 }
                }  
        })
        this.saveProducts()

        console.log(actualizado?"producto actualizado correctamente":"Error al actualizar el producto")
        return actualizado
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
        this.saveProducts()

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

administradorDeProductos.addProduct(producto1)
administradorDeProductos.addProduct(producto2)
administradorDeProductos.addProduct(producto3)
administradorDeProductos.addProduct(producto4)
administradorDeProductos.addProduct(producto5)

console.log("Hasta este momento, tengo los productos en memoria, los muestro y después empiezo con el manejo de archivos.")
administradorDeProductos.getProductsFromArray()
console.log("Esos son los artículos antes de hacer un archivo")

// Hasta acá, es el TP anterior, pero con menos console.log... ahora guardo los productos que venía usando para generar el archivo json
administradorDeProductos.saveProducts()


// Para asegurarme de que los productos se lean del disco, genero un objeto nuevo y lo muestro (vacío)
console.log("Genero un objeto nuevo, para asegurarme de no estar utilizando las variables previas.")
const administradorDeProductosNuevo = new ProductManager()

console.log ("objeto vacío:", administradorDeProductosNuevo.getProductsFromArray())

// Muestro los valores (que deberían ser los mismos), pero ahora a partir de lo que devuelva getProducts, leyendo desde el archivo.
console.log("Muestro los artículos obtenidos desde el archivo json:", administradorDeProductosNuevo.getProducts())

// El siguiente punto ya lo tenía del TP anterior, mostrar por ID... entiendo que al tenerlo en memoria, no debería leer nuevamente el archivo.

console.log ("Muestro el producto de ID 2:", administradorDeProductosNuevo.getProductByID(2))
console.log ("Muestro el producto de ID 20 (inexistente):", administradorDeProductosNuevo.getProductByID(20))

// Declaro un nuevo producto
const producto6 = new Producto("frutilla", "dulce", 150, "/dev/null", "frutilla01", 14)



// Actualizo un artículo inexistente (no hace nada)
console.log("Actualizando el artículo 30 con el objeto recién creado")
administradorDeProductosNuevo.updateProduct(30, producto6)
console.log("Muestro el array completo (sigue igual)", administradorDeProductosNuevo.getProductsFromArray())


// Actualizo un artículo existente (caso correcto)
administradorDeProductosNuevo.updateProduct(1, producto6)
console.log("Muestro el array completo (actualizado)", administradorDeProductosNuevo.getProductsFromArray())
    
// Ahora intento actualizar otro artículo con el mismo producto (debería fallar)
console.log("Actualizando el artículo 3 con el mismo objeto")
administradorDeProductosNuevo.updateProduct(3, producto6)
console.log("Muestro el array completo (sigue igual)", administradorDeProductosNuevo.getProductsFromArray())

// elimino el id 30, inexistente
administradorDeProductosNuevo.deleteProductByID(30)

// elimino el id 3, existente
administradorDeProductosNuevo.deleteProductByID(3)
console.log("Muestro el array completo (debería faltar el ID 3)", administradorDeProductosNuevo.getProductsFromArray())


console.log("Vuelvo a agregar el producto que recién eliminé, para que aparezca con otro ID.")
administradorDeProductosNuevo.addProduct(producto4)
console.log("Muestro el array completo (debería faltar el ID 3, pero estar el 5 en su lugar)", administradorDeProductosNuevo.getProductsFromArray())
console.log("TP finalizado, el archivo productos.json debería tener los ID 1, 2, 4 y 5")
