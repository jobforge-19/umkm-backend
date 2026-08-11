
import { error } from "node:console";
import { ResponseError } from "../app/error.js";
import userService from "../service/user-service.js";
import { ReqGetUserProfile } from "../validation/user-validation.js";
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function updateProfileUser(req, res, next) {
    try {
        const role = req.param.role;
        let response = null;

        if(!role) throw new ResponseError(400, "role tidak ditemukan");

        if (role == "UMKM") {
            response = await userService.updateProfileUmkm(req.body);
        } else if(role == "SUPPLIER")  {
            response = await userService.updateProfileSupplier(req.body);
        } else {
            res.status(403, {
                "message": "cant update profile"
            });
        }
        res.status(200).json({
            "messsage": "success update profile"
        });
    } catch (error) {
        next(error);
    }
}

async function getProfileUser(req, res, next){
    try{
        const username = req.params.username;
         const accessToken = req.user.role;
        if(!username || !accessToken) throw new ResponseError(400, "Token Authorization tidak ditemukan atau parameter tidak valid");

        const cekReq = ReqGetUserProfile.parse(username);
       
        const response = await userService.getUserProfile(username, role);

        if(response.pesan){
            throw new ResponseError(404, "User tidak ditemukan");
        }

        res.status(200).json({"message": "Detail profil pengguna berhasil didapatkan"});
    }
    catch(err){
        next(err);
    }
}


export default {
    updateProfileUser, getProfileUser
};