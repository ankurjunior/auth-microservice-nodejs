/**
 * File: app.js
 * Author: Ankur Gangwar
 * Created: 2025-12-21
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./src/swagger.js";

import LoggerFactory from "./src/factories/logger.factory.js";
import LoggerService from "./src/services/logger.service.js";

import { connnections } from "./src/config/index.js";
import JwtConfigBuilder from "./src/builder/jwt.config.builder.js";
import AuthModule from "./src/module/auth/index.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;

app.use(express.json());

const { mongo, redis, mysql } = await connnections();
/**
 * Logger setup
 */
const loggerStrategy = LoggerFactory.create({
  driver: process.env.LOG_DRIVER as "console" | "mongo" | "mysql",
  mysqlDB: mysql,
});

const logger = new LoggerService(loggerStrategy);

/**
 * JWT Config (builder stays immutable)
 */
const JWTConfig = new JwtConfigBuilder()
  .secret(process.env.JWT_SECRET as string)
  .issuer("auth-service");

/**
 * Swagger UI
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Health check
 */
app.get("/", (_req: Request, res: Response) => {
  res.send("Auth system running");
});

/**
 * Auth module
 */
app.use(
  "/auth",
  AuthModule({
    mysql,
    mongo,
    redis,
    jwtConfig: JWTConfig,
  })
);

/**
 * Global logger
 */
app.locals.logger = logger;

/**
 * Server start
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});

/**
 * Local infra commands (reference)
 *
 * mongod --config /Volumes/Work/mongo/conf/mongod.conf
 * redis-server /Volumes/Work/redis/conf/redis.conf
 */
