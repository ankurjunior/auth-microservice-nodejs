/*
 * Created on Mon Dec 29 2025 23:05:14
 * File name : jwt.token.strategy.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Mon Dec 29 2025 23:05:14
 * 2025 Ankur Gangwar
 */

import Redis from "ioredis";
import TokenStrategy from "./token.strategy.js";
import AccessTokenBuilder from "../../builder/access.token.builder.js";
import RefreshTokenBuilder from "../../builder/refresh.token.builder.js";
import RefreshTokenStore from "../../stores/refresh.token.store.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import AuthError from "../../validators/auth.js";


interface JwtIssueContext {
  id: string;
  role?: string;
  username?: string;
}

interface JwtTokenPair {
  accessToken: string;
  refreshToken: string;
}


class JWTTokenStrategy  {

  private jwtConfig:any;
  private refreshStore:any;
  private redis:Redis;
  private accessToken:any;
  private refreshToken:any;
  private secret:string;

  constructor(jwtConfig:any, redis:Redis) {
    // super();

    this.jwtConfig    = jwtConfig;
    this.redis        = redis;
    this.accessToken  = new AccessTokenBuilder(jwtConfig);
    this.refreshToken = new RefreshTokenBuilder(jwtConfig);
    this.refreshStore = new RefreshTokenStore(redis);
    this.secret       = jwtConfig.build().secret;
  }

  /**
   *
   * @param {*} authContext
   * @returns
   */
  async issue(authContext:any) {
    const sessionId    = crypto.randomUUID();
    const accessToken  = this.accessToken.build({ ...authContext, sessionId });
    const refreshToken = this.refreshToken.build({ ...authContext, sessionId });
    const payload      = jwt.verify(refreshToken, this.secret);

    await this.refreshStore.save({
      sessionId,
      jti: payload.jti,
      userId: authContext.id,
      ttl: this.#ttl(process.env.EXPIRE_IN_REFRESH as string),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken:string) {
    try {
      const payload = jwt.verify(refreshToken, this.secret);

      const { sid, jti, sub, role, username } = payload;

      const user = {
        sessionId: sid,
        jti,
        id: sub,
        role: role,
        username: username,
      };

      const record = await this.refreshStore.get(sid);

      if (!record || record.revoked || record.jti !== jti) {
        await this.refreshStore.revoke(sid);

        throw new AuthError(
          "Refresh token reuse detected",
          "REFRESH_TOKEN_REUSE"
        );
      }

      const newRefreshToken = this.refreshToken.build({ ...user, sid });
      const newAccessToken  = this.accessToken.build({ ...user, sid });
      const newPayload      = jwt.verify(newRefreshToken, this.secret);

      await this.refreshStore.save({
        sessionId: sid,
        jti      : newPayload.jti,
        userId   : sub,
        ttl      : this.#ttl(process.env.EXPIRE_IN_REFRESH as string),
      });

      return {
        accessToken : newAccessToken,
        refreshToken: newRefreshToken,
      };

    } catch (err:any) {
      if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        throw new AuthError("Invalid refresh token", "INVALID_REFRESH_TOKEN");
      }

      if (err instanceof AuthError) {
        throw err;
      }

      throw new AuthError("Refresh failed", "REFRESH_FAILED");
    }
  }

  #ttl(expiresIn:string) {
    if (typeof expiresIn === "number") return expiresIn;
    if (expiresIn.endsWith("days")) return parseInt(expiresIn) * 86400;
    if (expiresIn.endsWith("h")) return parseInt(expiresIn) * 3600;
    if (expiresIn.endsWith("m")) return parseInt(expiresIn) * 60;
    throw new Error("Invalid expiresIn format");
  }
}

export default JWTTokenStrategy;
