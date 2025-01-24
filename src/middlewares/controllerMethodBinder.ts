import { Request, Response, NextFunction } from "express";
type ControllerType = {
  new (): { handle(req: Request, res: Response, next: NextFunction): void };
};

export const controllerMethodBinder = <T extends ControllerType>(
  controller: T,
  methodName = "handle"
) => {
  return (req: Request, res: Response, next: Function) => {
    const controllerInstance = new controller();
    const method = controllerInstance[methodName];
    return method.call(controllerInstance, req, res, next);
  };
};
