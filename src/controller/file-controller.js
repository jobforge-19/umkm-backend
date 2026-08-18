import { getPresignedUrl } from "../service/presignedurl-service.js";
import { RequestPresignedUrl } from "../validation/file-validation.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function uploadFile(req, res, next) {
    try {
        res.status(200).json({
            message: `success upload image ${req.file.filename}`
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
async function uploadWithSignedUrl(req, res, next) {
    try {
        const request = RequestPresignedUrl.parse(req.body);

        const response = await getPresignedUrl(request);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


export default {
    uploadFile,
    uploadWithSignedUrl
};