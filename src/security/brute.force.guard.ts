/*
 * Created on Tue Jan 06 2026 22:59:07
 * File name : brute.force.guard.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Jan 06 2026 22:59:07
 * 2026 Ankur Gangwar
 */

import Redis from "ioredis";

class BruteForceGuard {
  private redis : Redis;

  constructor(redis : Redis) {
    this.redis = redis;
  }

  async recordFailure(username : string) {
    const key = `bruteforceguard: ${username}`;
    const attempts = await this.redis.incr(key);

    if (attempts === 1) {
      await this.redis.expire(key, 900); // 15 mins
    }

    if (attempts >= 5) {
      throw new Error(
        "Account temporarily locked due to multiple failed attempts." 
      );
    }
  }

  async reset(username : string) {
    await this.redis.del(`bf:${username}`);
  }
}

export default BruteForceGuard;
