/**
 * File: strategy.factory.js
 * Author: Ankur Gangwar
 * Created: 2025-12-21
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */


import Redis from "ioredis";
import PasswordStrategy from "../strategies/password.strategy";
import OtpStrategy from "../strategies/otp.strategy";
import HybridStrategy from "../strategies/hybrid.strategy";

interface StrategyFactoryOptions {
  userRepo    : any;
  otpRepo?    : any;
  tokenFactory: any;
  redis       : Redis;
  enabledStrategy: "password" | "otp" | "hybrid";
}

class StrategyFactory {
  static create({
    userRepo,
    // otpRepo,
    tokenFactory,
    redis,
    enabledStrategy,
  }: StrategyFactoryOptions) {
    switch (enabledStrategy) {
      case "password":
        return new PasswordStrategy(userRepo, tokenFactory, redis);
      default:
        return new PasswordStrategy(userRepo, tokenFactory, redis);
    }
  }
}

export default StrategyFactory;
