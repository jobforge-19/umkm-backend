import express from "express";
import { errMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-routes.js";
import { onlyLoginRouter } from "../routes/private-routes.js";

const web = express();


web.use(express.json());

web.use(publicRouter);
web.use(onlyLoginRouter);

web.use(errMiddleware);

export {
    web
};