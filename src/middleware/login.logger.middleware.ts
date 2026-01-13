/*
 * Created on Thu Dec 25 2025 15:29:51
 * File name : login.logger.middleware.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 15:29:51
 * 2025 Ankur Gangwar
 */


import { Request, Response, NextFunction } from "express";

module.exports =  () =>{
  return (req:Request, res:Response, next:NextFunction) => {
    const logger = req.app.locals.logger;
    // Create request-scoped context
    req.context = {
      requestId: crypto.randomUUID(),
      ip       : req.ip,
      userAgent: req.headers["user-agent"],
      startTime: Date.now(),
      username : req.body?.username || null,
    };

    // Initial log (attempt started)
    logger.info("LOGIN_ATTEMPT_STARTED", {
        requestId: req.context.requestId,
        username : req.context.username,
        ip       : req.context.ip,
        userAgent: req.context.userAgent,
    });

    next();
  };
};
