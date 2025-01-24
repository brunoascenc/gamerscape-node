import { Router } from "express";
import { controllerMethodBinder } from "./middlewares/controllerMethodBinder";
import { CreateCompletedController, DeleteCompletedController, GetCompletedByIdController, GettAllCompletedController } from "./controllers/completedController";
import { CreateWaitListController, DeleteWaitListController, GetAllWaitListController, GetWaitListByIdController } from "./controllers/waitListController";
import { CreateBackLogController, DeleteBacklogController, GetAllBacklogController, GetBacklogByIdController } from "./controllers/backlogController";

const routes = Router();

routes.post("/completed", controllerMethodBinder(CreateCompletedController));
routes.post("/waitlist", controllerMethodBinder(CreateWaitListController));
routes.post("/backlog", controllerMethodBinder(CreateBackLogController));
routes.get("/completed", controllerMethodBinder(GettAllCompletedController));
routes.get("/waitlist", controllerMethodBinder(GetAllWaitListController));
routes.get("/backlog", controllerMethodBinder(GetAllBacklogController));
routes.delete("/completed/:id", controllerMethodBinder(DeleteCompletedController));
routes.delete("/waitlist/:id", controllerMethodBinder(DeleteWaitListController));
routes.delete("/backlog/:id", controllerMethodBinder(DeleteBacklogController));
routes.get("/completed/:id", controllerMethodBinder(GetCompletedByIdController));
routes.get("/waitlist/:id", controllerMethodBinder(GetWaitListByIdController));
routes.get("/completed/:id", controllerMethodBinder(GetBacklogByIdController));

export { routes };
