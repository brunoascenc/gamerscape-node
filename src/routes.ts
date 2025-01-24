import { Router } from "express";
import { controllerMethodBinder } from "./middlewares/controllerMethodBinder";
import { CreateCompletedController } from "./controllers/completedController";
import { CreateWaitListController } from "./controllers/waitListController";
import { CreateBackLogController } from "./controllers/backlogController";

const routes = Router();

routes.post("/completed", controllerMethodBinder(CreateCompletedController));
routes.post("/waitlist", controllerMethodBinder(CreateWaitListController));
routes.post("/backlog", controllerMethodBinder(CreateBackLogController));

export { routes };
