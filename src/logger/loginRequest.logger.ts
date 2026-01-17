 /*
 * Created on Sat Jan 10 2026 00:15:45
 * File name : loginRequest.logger.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sat Jan 10 2026 00:15:45
 * 2026 Ankur Gangwar
 */
 
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const loginContextMiddleware = (
  req : Request,
  res : Response,
  next: NextFunction
): void => {
  const logger = req.app.locals.logger;

  req.context = {
    requestId: crypto.randomUUID(),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    startTime: Date.now(),
    username: req.body?.username ?? null,
  };

  logger?.info("LOGIN_REQUEST", {
    requestId: req.context.requestId,
    username: req.context.username,
    ip: req.context.ip,
    userAgent: req.context.userAgent,
  });

  next();
};

export default loginContextMiddleware;
