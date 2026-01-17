/**
 * File: redis.config.js
 * Author: Ankur Gangwar
 * Created: 2025-12-25
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */


import Redis, { RedisOptions } from "ioredis";
import dotenv from "dotenv";
import log from "../utils/logger.util.js";

dotenv.config();

class RedisClient {
  private static instance: Redis;

  private constructor() {
    // prevent new()
  }

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      const options: RedisOptions = {
        host    : process.env.REDIS_HOST,
        port    : Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD || undefined,
        db      : Number(process.env.REDIS_DB || 0),
        tls: process.env.REDIS_TLS === "true" ? {} : undefined,
        retryStrategy: (times: number) => {
          return Math.min(times  * 50, 2000);
        }
      };

      RedisClient.instance = new Redis(options);

      RedisClient.instance.on("connect", () => {
        log.success("Redis connected");
      });

      RedisClient.instance.on("error", (err: Error) => {
        console.error("Redis error:", err);
      });
    }

    return RedisClient.instance;
  }
}

export default RedisClient;
