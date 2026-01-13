
/*
 * Created on Sat Jan 10 2026 00:28:14
 * File name : authTokenRotation.logger.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sat Jan 10 2026 00:28:14
 * 2026 Ankur Gangwar
 */
import { Request, Response, NextFunction } from "express";

const loginTokenLoggertMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const logger = req.app.locals.logger;

  logger.info("TOKEN_ROTATION", {
    type: "TOKEN_ROTATION",
    ip: req.ip,
    username: req.body?.username || null
  });

  next();
};


export default loginTokenLoggertMiddleware;