import jwt from "jsonwebtoken";
import jwtUtils from "../utils/jwt.js";
import { ResponseError } from "../app/error.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function isRefreshTknValid(req, res, next) {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) throw new ResponseError(401, "Unauthorized");
        await jwtUtils.verifyJwtToken(refreshToken.split(" ")[1], process.env.JWT_PRIVATEKEY);

        next();
    } catch (error) {
        next(error);
    }
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function isAccessTknValid(req, res, next) {
    try {
        const accessToken = req.get("Authorization");

        if (!accessToken) throw new ResponseError(400, "Cannot find Token");
        const token = await jwtUtils.verifyJwtToken(accessToken.split(" ")[1], process.env.JWT_PUBLICKEY);
        req.user = token;

        next(); 
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export async function checkRoleSupplier(req, res, next){
    try{
        const rolenya = req.user?.role;
        if(rolenya !== "SUPPLIER") throw new ResponseError(401, "Hanya Supplier Yang Bisa Menggunakan Fitur Ini");
        next();
    } catch (error) {
        next(error);
    }
}