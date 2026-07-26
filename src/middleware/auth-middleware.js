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
        const refreshToken = req.cookies.refresh_token;
        const accessToken = req.get("Authorization");

        if (!refreshToken) throw new ResponseError(401, "Unauthorized");
        await jwtUtils.verifyJwtToken(refreshToken.split(" ")[1], process.env.JWT_PRIVATEKEY);

        if (!accessToken) throw new ResponseError(400, "Access token tidak valid");
        await jwtUtils.verifyJwtToken(accessToken.split(" ")[1], process.env.JWT_PUBLICKEY);
        next();
    } catch (error) {
        next(error);
    }
}