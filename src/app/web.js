import express from "express";
import { errMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-routes.js";
import { onlyLoginRouter } from "../routes/private-routes.js";
import cors from "cors";

const web = express();


const corsMiddleware = cors({
    origin: "*"
});

web.use(express.json());
web.use(corsMiddleware);

web.use(publicRouter);
web.use(onlyLoginRouter);

web.use(errMiddleware);

export {
    web
};