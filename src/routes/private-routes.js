import express from "express";
import { onlyLoggedUser } from "../middleware/auth-middleware.js";


const onlyLoginRouter = express.Router();


onlyLoginRouter.use(onlyLoggedUser);

onlyLoginRouter.get("/token", async(req, res, next) => {
    try {
        res.status(200).json({
            message: "success"
        });
    } catch (error) {
        next(error);
    }
}); 

export {
    onlyLoginRouter
};