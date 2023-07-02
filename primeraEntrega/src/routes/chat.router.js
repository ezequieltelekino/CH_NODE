import { Router } from 'express';
import { messageModel } from '../dao/models/messages.model.js';

const router = Router();

router.get("/", async (req,res) => {
    const result = await messageModel.find()
    console.log("(chat router) Los mensajes son:", result.length)
    let listaDeMensajes = []
    result.forEach((m) => {
        let mensaje = {
            user: m.user,
            message: m.message
        }
        listaDeMensajes.push(mensaje)

    })

    res.render("chat",{listaDeMensajes: listaDeMensajes})


}) 

router.post("/", async (req,res) => {

    console.log("Creando un mensaje: ", msg)
    res.status(201).send(" Mensaje enviado correctamente: " + mensaje)
})

export default router;