/*
 * Created on Wed Jan 14 2026 23:33:36
 * File name : token.blacklist.service.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Wed Jan 14 2026 23:33:36
 * 2026 Ankur Gangwar
 */


import { Redis } from "ioredis";

interface gaurdPayload {
    type: string,
    jti: string,
    expireInSeconds?: number
}


class TokenGuard {
    private redis: Redis;
    constructor(redis: Redis) {
        this.redis = redis;
    }

    /**
     * 
     * @param param0 
     */
    async block({ type, jti, expireInSeconds = 86400 }: gaurdPayload): Promise<void> {
        const key = `block-list:${type}:${jti}`;
        await this.redis.set(key, "1", "EX", expireInSeconds);
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    async isBlocked({ type, jti }: gaurdPayload): Promise<boolean> {
        const key = `block-list:${type}:${jti}`;
        return (await this.redis.exists(key)) === 1;
    }
}


export default TokenGuard;