/*
* Created on Fri Jan 09 2026 23:20:27
* File name : ip.guard.ts
* This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
* Description : Fri Jan 09 2026 23:20:27
* 2026 Ankur Gangwar
*/



import { Redis } from "ioredis";

class IPGaurd {
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }


  /**
   * 
   * @param {*} ip 
   * @returns 
   */
  async isBlocked(ip: string): Promise<boolean> {
    const exists = await this.redis.exists(
      `blocked:ip:${ip}`
    );
    return exists === 1;
  }



  /**
   * 
   * @param {*} ip 
   * @param {*} ttl 
   */
  async block(ip: string, ttlSeconds: number = 3600):Promise<void> {
    const key = `blocked:ip:${ip}`;
     if (ttlSeconds > 0) {
      await this.redis.set(key, "1", "EX", ttlSeconds);
    } else {
      await this.redis.set(key, "1");
    }
  }
}


export default IPGaurd;