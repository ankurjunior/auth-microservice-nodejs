/*
 * Created on Fri Jan 09 2026 23:14:23
 * File name : device.guard.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Fri Jan 09 2026 23:14:23
 * 2026 Ankur Gangwar
 */

import { Redis } from "ioredis";


class DeviceGaurd {

  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  /**
   * 
   * @param {*} userId 
   * @param {*} deviceId 
   * @returns 
   */
  async isBlocked(userId: number, deviceId: string): Promise<boolean> {
    const exists = await this.redis.exists(
      `blocked:device:${userId}:${deviceId}`
    );
    return exists === 1;
  }

  /**
   * 
   * @param {*} userId 
   * @param {*} deviceId 
   */
  async block(
    userId: number,
    deviceId: string,
    ttlSeconds: number = 86400 // 24 hours default
  ): Promise<void> {
    const key = `blocked:device:${userId}:${deviceId}`;

    if (ttlSeconds > 0) {
      await this.redis.set(key, "1", "EX", ttlSeconds);
    } else {
      await this.redis.set(key, "1");
    }
  }

  async unblock(userId: number, deviceId: string): Promise<void> {
    await this.redis.del(`blocked:device:${userId}:${deviceId}`);
  }
}


export default DeviceGaurd;