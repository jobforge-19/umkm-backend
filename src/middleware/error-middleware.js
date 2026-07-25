import z from "zod";
import { ResponseError } from "../app/error.js";

/**
 * 
 * @param {Error} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function errMiddleware(err, req, res, next) {
    if(err instanceof z.ZodError) {
        res.status(400).json({
            message: err.issues
        });
    } else if(err instanceof ResponseError) {
        res.status(err.status).json({
            message: err.message
        });
    } else {
        res.status(500).json({
            message: err.message
        });
    }
}