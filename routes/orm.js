import { Router } from "express";
import { mainController } from "../controllers/mainController.js";
import { manipulateRefreshToken } from "../controllers/refreshTokensController.js";

export const ormRoute = Router()

ormRoute.all('/users/:action', mainController)
        .all('/tasks/:action',mainController)
        .all('/rol/:action', mainController)
        .all('/typeIncident/:action', mainController)
        .all('/incidents/:action', mainController)
        .all('/refresh', manipulateRefreshToken)
        .all('/test',(req,res)=>{
                console.log(req.body)
                res.json(req.body)
        })