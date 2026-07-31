import authService from "../service/auth-service.js";
import {ReqLogin, ReqRegisterSupplier, ReqRegisterUmkm} from "../validation/user-validation.js";
import jwtUtils from "../utils/jwt.js";
import { ResponseError } from "../app/error.js";

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

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function getAccessToken(req, res, next) {
    try {
        const token = req.cookies.refresh_token;

        if(!token) throw new ResponseError(401, "Unauthorized");

        const decodedToken = await jwtUtils.verifyJwtToken(token.split(" ")[1], process.env.JWT_PRIVATEKEY);
        
        const accessToken = jwtUtils.createAccesToken({
            fullName: decodedToken.fullName,
            role: decodedToken.role,
            username: decodedToken.username
        });

        res.status(200).json({
            accessToken: accessToken
        });
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
async function logout(req, res, next) {
    try {
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true,
            path: "/"
        }).status(200).json({
            message: "success logout"
        });
    } catch (error) {
        next(error);
    }
}


export default {
    registerUmkm,
    registerSupplier,
    login,
    logout,
    getAccessToken
};

