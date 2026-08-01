import express from "express";
import { errMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-routes.js";
import { privateRouter } from "../routes/private-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const web = express();


const corsMiddleware = cors({
    origin: "*",
    credentials: true
});

web.use(corsMiddleware);
web.use(express.json());
web.use(cookieParser());


web.get('/api', async(req, res, next) => {
    res.status(200).json({
        "message": "success"
    });
});

web.use("/api", publicRouter, privateRouter);

web.use(errMiddleware);



export {
    web
};