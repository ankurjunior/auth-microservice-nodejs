/*
 * Created on Tue Jan 13 2026 00:41:23
 * File name : logger.factory.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Jan 13 2026 00:41:23
 * 2026 Ankur Gangwar
 */


import {
  MongoStrategy,
  MysqlStrategy,
  ConsoleStrategy,
} from "../strategies/logger/index.js";

class LoggerFactory {
  static create(config:any) {
    switch (config.driver) {
      case "mongo":
        return new MongoStrategy();
      case "mysql":
        return new MysqlStrategy(config.mysqlDB);
      case "console":
      default:
        return new ConsoleStrategy();
    }
  }
}


export default LoggerFactory;