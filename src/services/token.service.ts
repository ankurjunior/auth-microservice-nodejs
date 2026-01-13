/*
 * Created on Wed Dec 31 2025 00:45:01
 * File name : token.service.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Wed Dec 31 2025 00:45:01
 * 2025 Ankur Gangwar
 */

class TokenService { 
  private strategy:any;
  constructor(tokenStrategy:any) {
    if (!tokenStrategy) {
      throw new Error("TokenService requires a strategy");
    }
    this.strategy = tokenStrategy;
  }

  issue(authContext:any) {
    return this.strategy.issue(authContext);
  }

  refresh(refreshContext:any) {
    return this.strategy.refresh(refreshContext);
  }
}

export default TokenService;
