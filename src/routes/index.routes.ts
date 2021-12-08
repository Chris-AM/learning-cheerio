import { Router } from "express";
import charactersRouter from "./characters.routes";

const routes = Router();

routes.use("/characters", charactersRouter);

export default routes;