import jwt from "jsonwebtoken";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function isLoginMiddleware(req, res, next) {
    try {
        const token = req.get("Authorization").split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
        next();
    } catch (error) {
        next(error);
    }
}