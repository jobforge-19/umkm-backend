
import { ResponseError } from "../app/error.js";
import userService from "../service/user-service.js";
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


export default {
    updateProfileUser
};