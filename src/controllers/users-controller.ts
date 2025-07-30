import { Request, Response, NextFunction } from "express";

class UsersController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({
      message: "User created successfully",
    });
  }
}

export { UsersController };
