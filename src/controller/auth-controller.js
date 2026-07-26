import authService from "../service/auth-service.js";
import {ReqRegisterUmkm} from "../validation/user-validation.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function registerUmkm(req, res, next) {
    try {
        const request = ReqRegisterUmkm.parse(req.body);
        
        const result = await authService.registerUmkm(request);

        res.status(200).json({
            message: `user ${result.username} berhasil resgiter`
        });
    } catch (error) {
        next(error);
    }
}



export default {
    registerUmkm
};