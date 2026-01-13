/**
 * File: index.js
 * Author: Ankur Gangwar
 * Created: 2025-12-25
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */

import "dotenv/config";
import RedisClient from "./redis.config.js";
import MongoDBCLient from "./mongo.config.js";
import MySQLDBClient from "./mysql.config.js";


export async function connnections() {
  const redis = RedisClient.getInstance();
  const mongo = await MongoDBCLient.getInstance();
  const mysql = await MySQLDBClient.getInstance();
  
  return {
    mongo: mongo,
    redis: redis,
    mysql: mysql
  };
}

