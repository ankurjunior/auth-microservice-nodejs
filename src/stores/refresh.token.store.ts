/*
 * Created on Tue Jan 13 2026 22:34:27
 * File name : refresh.token.store.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Jan 13 2026 22:34:27
 * 2026 Ankur Gangwar
 */

import Redis from "ioredis";

interface SessionPayload {
  sessionId: string;
  jti      : string;
  userId   : number | string;
  ttl      : number; // seconds
}

class RefreshTokenStore {
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  key(sessionId: string) {
    return `refresh:${sessionId}`;
  }


  /**
   * 
   * @param param0 
   */
  async save({ sessionId, jti, userId, ttl }: SessionPayload) {
    await this.redis.set(
      this.key(sessionId),
      JSON.stringify({ jti, userId, revoked: false }),
      "EX",
      ttl
    );
  }

  /**
   * 
   * @param sessionId 
   * @returns 
   */
  async get(sessionId: string) {
    const data = await this.redis.get(this.key(sessionId));
    return data ? JSON.parse(data) : null;
  }


  /**
   * 
   * @param sessionId 
   * @returns 
   */
  async revoke(sessionId: string) {
    const record = await this.get(sessionId);
    if (!record) return;

    record.revoked = true;
    await this.redis.set(this.key(sessionId), JSON.stringify(record));
  }


  /**
   * 
   * @param sessionId 
   */
  async delete(sessionId: string) {
    await this.redis.del(this.key(sessionId));
  }
}

export default RefreshTokenStore;
