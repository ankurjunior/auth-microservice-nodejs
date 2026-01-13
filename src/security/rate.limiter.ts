/*
 * Created on Tue Jan 06 2026 22:57:51
 * File name : rate.limiter.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Jan 06 2026 22:57:51
 * 2026 Ankur Gangwar
 */

import { Redis } from "ioredis";


class RateLimiter {
private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  async check(ip:string, route:string, limit:number = 10, window:number = 60):Promise<void> {

    const key   = `rl: ${ip}: ${route}`;
    const count = await this.redis.incr(key);

    if (count === 1) {
      await this.redis.expire(key, window);
    }

    if (count > limit) {
      throw new Error("Too many requests. Please slow down.");
    }

  }
}

export default RateLimiter;
