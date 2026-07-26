import authService from "../service/auth-service.js";
import {ReqLogin, ReqRegisterSupplier, ReqRegisterUmkm} from "../validation/user-validation.js";

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
            message: `user ${result.username} berhasil register`
        });
    } catch (error) {
        next(error);
    }
}


async function registerSupplier(req, res, next){
    try{
        const request = ReqRegisterSupplier.parse(req.body);
        const hasil = await authService.registerSupplier(request);
        res.status(200).json({message: `user ${hasil.username} berhasil register`});
    }
    catch(error){
        next(error);
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function login(req, res, next) {
    try {
        const request = ReqLogin.parse(req.body);
        const token = await authService.login(request);

        res.status(200)
        .cookie("refresh_token", `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            path: "/",
            expires: new Date(Date.now() + 7 * 24 * 60 * 1000)
        })
        .json({
            message: "success login"
        });
    } catch (error) {
        next(error);
    }
}


export default {
    registerUmkm,
    registerSupplier,
    login
};

