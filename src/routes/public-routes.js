import express from "express";
import { ResponseError } from "../app/error.js";
import jwt from "jsonwebtoken";
import authController from "../controller/auth-controller.js";


const publicRouter = express.Router();

publicRouter.post("/auth/register/umkm", authController.registerUmkm);
publicRouter.post("/auth/register/supplier", authController.registerSupplier);
publicRouter.post("/auth/login", authController.login);

export {
    publicRouter
};