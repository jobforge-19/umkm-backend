import express from "express";
import { errMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-routes.js";
import { privateRouter } from "../routes/private-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const web = express()
            .route("/api");


const corsMiddleware = cors({
    origin: "*",
    credentials: true
});

web.use(corsMiddleware);
web.use(express.json());
web.use(cookieParser());

web.use(publicRouter);
web.use(privateRouter);

web.use(errMiddleware);

export {
    web
};