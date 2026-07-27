import express from "express";
import { 
    isAccessTknValid,
    isRefreshTknValid
} from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";


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


export {
    privateRouter
};