import express from "express";
import { ResponseError } from "../app/error.js";
import jwt from "jsonwebtoken";


const publicRouter = express.Router();


publicRouter.get('/', async(req, res, next) => {
    try {
        throw new ResponseError(400, "test error");

        res.status(200).json({
            message: "success"
        });
    } catch (error) {
        next(error);
    }
});

publicRouter.post('/testbrearer', async(req, res, next) => {
    try {
        const token = req.get("Authorization").split(" ")[1];
        const resultVerify = jwt.verify(token, "rahasia123");
        res.status(200).json({
            token,
            decodedToken: jwt.decode(token),
            verifyResult: resultVerify,
            secretKey: process.env.JWT_SECRETKEY
        });
    } catch (error) {
        next(error);
    }
});


export {
    publicRouter
};