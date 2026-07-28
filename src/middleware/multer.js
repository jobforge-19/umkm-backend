import multer from "multer";
import path from "node:path";
import sharp from "sharp";
import fs from "fs";
import { ResponseError } from "../app/error.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathFolder = path.join(process.cwd(), "/uploads/tmp");
        cb(null, pathFolder);
    },
    filename: (req, file, cb) => {
        const uniqName = Date.now() + "-" + file.originalname;
        cb(null, uniqName);
    } 
});


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function compressMiddleware(req, res, next) {
    try {
        if(!req.file) throw new ResponseError(400, "file not found");
        const tempPathFile = req.file.path;
        console.log(tempPathFile);
        const outputFileName = `compresed-${path.parse(req.file.filename).name}.avif`;
        const outputPath = path.join(process.cwd(), "uploads/images/", outputFileName);

        await sharp(tempPathFile)
                .resize(800)
                .avif({ 
                    quality: 80,
                    effort: 2 
                })
                .toFile(outputPath);
                
        const message = await new Promise((resolve, reject) => {
            fs.unlink(tempPathFile, (err) => {
                if(err) reject(err.message);
            });
            resolve(`success delete ${tempPathFile}`);
        });

        console.log(message);

        req.file.path = outputPath;
        req.file.filename = outputFileName;

        next();
    } catch (error) {
        next(error);
    }
}

export const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    storage: storage
});