import express from "express";
import { isLoginMiddleware } from "../middleware/auth-middleware.js";


const onlyLoginRouter = express.Router();


onlyLoginRouter.use(isLoginMiddleware);

onlyLoginRouter.post("/test/auth", async(req, res, next) => {
    try {
        // 
        userLogin.parse(reqestFromFrontend);
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