/**
 * File: token.factory.js
 * Author: Ankur Gangwar
 * Created: 2025-12-22
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */
 
 
import JWTTokenStrategy from "../strategies/token/jwt.token.strategy";


class TokenFactory {
  private config: any;
  
  static create(config:any) {
    if (!config || !config.type) {
      throw new Error("Token type not provided");
    }

    switch (config.type) {
      case "jwt":
        return new JWTTokenStrategy(config.jwt, config.redis);
      default:
        throw new Error(`Unsupported token type: ${config.type}`);
    }
  }

}

export default TokenFactory;
