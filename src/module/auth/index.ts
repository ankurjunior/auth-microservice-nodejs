/*
 * Created on Tue Jan 13 2026 00:03:56
 * File name : index.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Jan 13 2026 00:03:56
 * 2026 Ankur Gangwar
 */


import express, { Request, Response, NextFunction } from "express";
import authRoutes from "../../routes/auth.routes";
import AuthService from "../../services/auth.service.js";
import LogoutService from "../../services/logout.service.js";
import StrategyFactory from "../../factories/strategy.factory.js";
import UserRepository from "../../repositories/user.mysql.repo";
import TokenFactory from "../../factories/token.factory";
import TokenService from "../../services/token.service";
import { securityGuards } from "../../security/index.js";  

const  AuthModule = async (options :any) => {
  
  const router         = express.Router();
  const userRepo       = new UserRepository(options.mysql);
  const redis          = options.redis;
  const { tokenGuard } = await securityGuards();

  /**
   * 
   */
  const tokenFactory =  TokenFactory.create({
    type : "jwt",
    jwt  : options.jwtConfig,
    redis
  });
 

  const authStrategies = StrategyFactory.create({
    userRepo,
    // userRepo,
    tokenFactory,
    redis,
    enabledStrategy: "password",
  });


  const tokenService  = new TokenService(tokenFactory);
  const logoutService = new LogoutService(tokenGuard);
  const authService   = new AuthService({authStrategies, tokenService});


  router.use((req: Request, res:Response, next:NextFunction) => {
    req.authService   = authService;
    req.logoutService = logoutService;
    req.tokenService  = tokenService;
    next();
  });
 
 
  router.use(authRoutes);

  return router;
};


export default AuthModule;