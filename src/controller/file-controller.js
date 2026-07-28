
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


export default {
    uploadFile
};