const socket = io();

// Mensaje hacia el servidor (emit pelado)
//socket.emit("actualizar_lista", {});  

//socket.broadcast.emit ("message", "Esto es un mensaje enviado desde el front hacia todo el mundo, menos para el emisor")
socket.on ("user_connected", (data) => {
    console.log ("Broadcast:", data)
}) ;

socket.on ("evento_para_socket_individual", (data) => {
    console.warn("Para mí: ", data)
}) ;


socket.on ("evento_para_todos_menos_socket_actual", (data) => {
    console.log(data)
}) ;




socket.on ("actualizar_productos",  (data) => {

    if (data.length === undefined)
        return
     console.log("Recibimos todos: ", data, "Largo: ", data.length)
    let divQueContieneProductos = document.getElementById("divQueContieneProductos")
    if (divQueContieneProductos)
         divQueContieneProductos.remove()
    divQueContieneProductos = document.createElement("div")
    divQueContieneProductos.id="divQueContieneProductos"
   console.log("Nuevo array", data)
    data.forEach( (prod) => {
        let contenido = prod.id + " | " + prod.title + " | " + prod.description  + " | " + prod.code  + " | " + prod.price    
        let linea = document.createElement("p")
        linea.innerHTML = contenido
        divQueContieneProductos.append(linea)
    }) 
    document.body.append(divQueContieneProductos)
    console.log(divQueContieneProductos)
}) ;

const form = document.getElementById('formularioAgregarProducto')
form.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: form.elements.title.value,
        description: form.elements.description.value,
        code: form.elements.code.value,
        price: form.elements.price.value,
    }
    console.log("Evento formulario", product)
    socket.emit('solicito_agregar_producto', product)
    form.reset()
})