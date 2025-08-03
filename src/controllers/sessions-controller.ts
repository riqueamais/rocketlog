import { Request, Response, NextFunction } from "express";

class SessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    return response.status(501).json({
      message: "Session creation not implemented yet",
    });
  }
}

export { SessionsController };