/*
 * Created on Thu Dec 25 2025 19:35:20
 * File name : loginResult.logger.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 19:35:20
 * 2025 Ankur Gangwar
 */

import { Request, Response, NextFunction } from "express";

const loginResultMiddleware = (req: Request, res: Response, next: NextFunction): void => {

  const logger = req.app.locals.logger;
  
  res.on("finish", () => {
    if (res.statusCode === 200) {
      logger.info("LOGIN_SUCCESS", {
        type: req.params.type,
        username: req.body?.username || null,
      });
    } else {
      logger.error("LOGIN_FAILED", {
        type: req.params.type,
        username: req.body?.username || null,
        statusCode: res.statusCode,
      });
    }
  });

  next();
}

export default loginResultMiddleware;