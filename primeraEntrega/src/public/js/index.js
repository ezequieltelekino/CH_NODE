const socket = io();

// Mensaje hacia el servidor (emit pelado)
socket.emit("actualizar_lista", {});  

//socket.broadcast.emit ("message", "Esto es un mensaje enviado desde el front hacia todo el mundo, menos para el emisor")
socket.on ("user_connected", (data) => {
    console.warn ("Broadcast:", data)
}) ;

socket.on ("evento_para_socket_individual", (data) => {
    console.warn("Para mí: ", data)
}) ;


socket.on ("evento_para_todos_menos_socket_actual", (data) => {
    console.log(data)
}) ;

socket.on ("evento_para_todos", (data) => {
    console.log("Recibimos todos: ", data)
}) ;

