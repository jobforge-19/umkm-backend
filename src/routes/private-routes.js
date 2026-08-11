import express from "express";
import { 
    isAccessTknValid,
    isRefreshTknValid,
    checkRoleSupplier
} from "../middleware/auth-middleware.js";

import { 
    upload,
    compressMiddleware 
} from "../middleware/multer.js";

import authController from "../controller/auth-controller.js";
import fileController from "../controller/file-controller.js";
import userCotroller from "../controller/user-controller.js";
import path from "node:path";


const privateRouter = express.Router();

privateRouter.post("/auth/logout", isRefreshTknValid, isAccessTknValid, authController.logout);
privateRouter.post("/auth/refresh", isRefreshTknValid,authController.getAccessToken);

privateRouter.patch("/profile/users/:role", isAccessTknValid, userCotroller.updateProfileUser);

privateRouter.get("/profile/{username}", isAccessTknValid, userCotroller.getProfileUser);

privateRouter.post("/upload/images", isAccessTknValid, upload.single('product'), compressMiddleware, fileController.uploadFile);

privateRouter.post(
    "/add/product",
    isAccessTknValid,
    checkRoleSupplier,
    upload.single('foto_produk'),
    compressMiddleware,
    authController.addProduct
    
);

// serve file
privateRouter.use(
    "/uploads/images", 
    express.static(path.join(process.cwd(), "uploads/images"))
);


export {
    privateRouter
};