import { Router } from "express";
import { controllerMethodBinder } from "./middlewares/controllerMethodBinder";
import { CreateCompletedController, DeleteCompletedController, GettAllCompletedController } from "./controllers/completedController";
import { CreateWaitListController, GetAllWaitListController } from "./controllers/waitListController";
import { CreateBackLogController, GetAllBacklogController } from "./controllers/backlogController";

const routes = Router();

routes.post("/completed", controllerMethodBinder(CreateCompletedController));
routes.post("/waitlist", controllerMethodBinder(CreateWaitListController));
routes.post("/backlog", controllerMethodBinder(CreateBackLogController));
routes.get("/completed", controllerMethodBinder(GettAllCompletedController));
routes.get("/waitlist", controllerMethodBinder(GetAllWaitListController));
routes.get("/backlog", controllerMethodBinder(GetAllBacklogController));
routes.delete("/completed/:id", controllerMethodBinder(DeleteCompletedController));

export { routes };
