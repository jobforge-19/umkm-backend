import express from "express";
import { ResponseError } from "../app/error.js";


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


export {
    publicRouter
};