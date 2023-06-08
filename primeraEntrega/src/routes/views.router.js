import express from "express";
import { Router } from 'express';


const viewsRouter = express.Router();


viewsRouter.get("/realTimeProducts", (req, res) => {

    res.render("realTimeProducts", {});
});


export default viewsRouter;