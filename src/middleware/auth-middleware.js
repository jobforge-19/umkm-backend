import jwt from "jsonwebtoken";
import jwtUtils from "../utils/jwt.js";
import { ResponseError } from "../app/error.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function onlyLoggedUser(req, res, next) {
    try {
        const token = req.cookies.refresh_token;

        if (!token) throw new ResponseError(401, "Unauthorized");

        const decodedToken = await jwtUtils.verifyJwtToken(token.split(" ")[1], process.env.JWT_PRIVATEKEY);
        res.status(200).json({
            hh: decodedToken.fullName
        });
        next();
    } catch (error) {
        next(error);
    }
}