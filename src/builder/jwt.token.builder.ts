/*
 * Created on Sun Dec 28 2025 00:01:54
 * File name : jwt.token.builder.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Dec 28 2025 00:01:54
 * 2025 Ankur Gangwar
 */

import JWT , { SignOptions } from "jsonwebtoken";
import crypto from "crypto";

type JwtPayload = {
  sub?: string | number;
  sid?: string;
  jti?: string;
  role?: string | string[];
  scopes?: string[];
  tokenType?: string;
  [key: string]: unknown; 
};

class JwtTokenBuilder {

  private secret: JWT.Secret;
  private options?: SignOptions;
  private payload: JwtPayload;

  /**
   *
   * @param {*} secret
   * @param {*} options
   */
  constructor(secret : JWT.Secret, options?:SignOptions) {
    this.secret = secret;
    this.options = options;
    this.payload = {};
  }

  subject(userId:string | number): this {
    this.payload.sub = userId;
    return this;
  }

  sessionId(sid:string): this {
    this.payload.sid = sid;
    return this;
  }


  jti():this {
    this.payload.jti = crypto.randomUUID();
    return this;
  }

  claim(key:string, value:any):this {
    this.payload[key] = value;
    return this;
  }

  role(role:string | string[]):this {
    this.payload.role = role;
    return this;
  }

  tokenType(tokenType:string):this {
    this.payload.tokenType = tokenType;
    return this;
  }

  scopes(scopes = []) {
    this.payload.scopes = scopes;
    return this;
  }

  /**
   *
   * @returns
   */
  build():string {
    if (!this.payload.sub) {
      throw new Error("JWT subject (sub) is required");
    }
    return JWT.sign(this.payload, this.secret, this.options);
  }
}

export default JwtTokenBuilder;
