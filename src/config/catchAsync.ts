import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      console.error("Error in catchAsync:", error);
      res.status(500).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };
};

export default catchAsync;
