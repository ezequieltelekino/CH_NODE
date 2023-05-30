import { Router } from 'express';

const router = Router();
const carts = []

router.get("/", (req,res) => {
    res.send({users})
}) 

router.post("/", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({status: "success"})
})
export default router;