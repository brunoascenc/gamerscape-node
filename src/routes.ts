import { Router } from "express";
import { controllerMethodBinder } from "./middlewares/controllerMethodBinder";
import { CreateCompletedController, DeleteCompletedController, GetCompletedByIdController, GettAllCompletedController, UpdateCompletedController } from "./controllers/completedController";
import { CreateWaitListController, DeleteWaitListController, GetAllWaitListController, GetWaitListByIdController } from "./controllers/waitListController";
import { CreateBackLogController, DeleteBacklogController, GetAllBacklogController, GetBacklogByIdController } from "./controllers/backlogController";
import { CreateUserController, DeleteRefreshTokenController, GetAllUserController, GetRefreshTokenController, GetRefreshTwitchTokenController, LoginUserController } from "./controllers/authController";
import { authenticateToken } from "./middlewares/authorization";
import { GetAnticipatedGamesController, GetComingSoonGamesController, GetPopularGamesController } from "./controllers/gameController";

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
routes.patch("/completed/:id", controllerMethodBinder(UpdateCompletedController));
routes.post("/auth/create-user", controllerMethodBinder(CreateUserController));
routes.get("/user", authenticateToken, controllerMethodBinder(GetAllUserController));
routes.post("/auth/login", controllerMethodBinder(LoginUserController));
routes.get("/auth/refresh-token", controllerMethodBinder(GetRefreshTokenController));
routes.delete("/auth/refresh-token", controllerMethodBinder(DeleteRefreshTokenController));
routes.get("/auth/refresh-token-twitch", controllerMethodBinder(GetRefreshTwitchTokenController));
routes.get("/games/popular/:accessToken", controllerMethodBinder(GetPopularGamesController));
routes.get("/games/anticipated/:accessToken", controllerMethodBinder(GetAnticipatedGamesController));
routes.get("/games/coming-soon/:accessToken", controllerMethodBinder(GetComingSoonGamesController));

export { routes };
