/*
 * Created on Sat Jan 10 2026 01:19:38
 * File name : auth.service.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sat Jan 10 2026 01:19:38
 * 2026 Ankur Gangwar
 */


import AuthResponseBuilder from "../builder/auth.response.builder"; 

class AuthService {
  private strategy:any;
  private tokenService:any;

  constructor(strategy:any) { 
    this.strategy     = strategy.authStrategies;
    this.tokenService = strategy.tokenService;
  }

  async login(type:string, payload:any) {
    if (this.strategy.type !== type) {
      throw new Error("Invalid Login Process");
    }
    
    const user                        = await this.strategy.authenticate(payload);
    const {accessToken, refreshToken} = await this.tokenService.issue(user); 
    return this.#buildAuthResponse(user, accessToken, refreshToken);
  }

  #buildAuthResponse(user:any, token:string, refreshToken:string) {
    return new AuthResponseBuilder()
      .withToken(token)
      .withRefreshToken(refreshToken)
      .withUser({ ...user, loginAt: new Date() })
      .build();
  }
}

export default AuthService;
