/*
 * Created on Mon Jan 12 2026 23:01:21
 * File name : password.strategy.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Mon Jan 12 2026 23:01:21
 * 2026 Ankur Gangwar
 */


import bcrypt from "bcrypt"; 
import Redis from "ioredis"; 
import {PasswordValidator} from "../validators/password.validator";
import BruteForceGuard from "../security/brute.force.guard";

interface AuthPayload {
  username: string;
  password: string;
  [key: string]: any;
}

interface UserRepository {
  findByUsername(username: string): Promise<AuthPayload | null>;
}

interface TokenFactory {
  generate(user: AuthPayload): Promise<string>;
}

class PasswordStrategy {

  private BruteForceGuard: BruteForceGuard;
  private redis          : Redis;
  private type           : string;
  private userRepo       : UserRepository;
  private tokenFactory   : TokenFactory;

  constructor(userRepo:UserRepository , tokenFactory:TokenFactory, redis: Redis) {
    this.type            = "password";
    this.userRepo        = userRepo; 
    this.tokenFactory    = tokenFactory; 
    this.redis           = redis; 
    this.BruteForceGuard = new BruteForceGuard(redis);
  }


  /**
   * 
   * @param {*} payload 
   * @returns 
   */
  async authenticate(payload:AuthPayload) {

    this.#validatePayload(payload);

    const user = await this.#getUser(payload.username);

    await this.#verifyPassword(payload.username, payload.password, user.password);

    return user;
  }



  /* ===================== PRIVATE METHODS ===================== */

  #validatePayload(payload:AuthPayload) {
    PasswordValidator(payload);
  }

  async #getUser(username:string) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      await this.BruteForceGuard.recordFailure(username);
      throw new Error("User not found!!");
    }
    return user;
  }

  async #verifyPassword(username:string, rawPassword:string, hashedPassword:string) {
    const ok = await bcrypt.compare(rawPassword, hashedPassword);
    if (!ok) {
      await this.BruteForceGuard.recordFailure(username);
      throw new Error("User name or password is incorrect!!");
    }
  }
}

export default PasswordStrategy;
