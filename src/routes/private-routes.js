import express from "express";
import { 
    isAccessTknValid,
    isRefreshTknValid
} from "../middleware/auth-middleware.js";

import { 
    upload,
    compressMiddleware 
} from "../middleware/multer.js";

import authController from "../controller/auth-controller.js";
import fileController from "../controller/file-controller.js";
import path from "node:path";


const privateRouter = express.Router();

privateRouter.post("/auth/logout",
    isRefreshTknValid,
    isAccessTknValid, 
    authController.logout
);

privateRouter.post("/auth/refresh", 
    isRefreshTknValid,
    authController.getAccessToken
);

privateRouter.post("/upload/images",
    isAccessTknValid,
    upload.single('product'),
    compressMiddleware,
    fileController.uploadFile
);

// serve file
privateRouter.use("/uploads/images", express.static(path.join(process.cwd(), "uploads/images")));


export {
    privateRouter
};