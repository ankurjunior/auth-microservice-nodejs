/*
 * Created on Thu Dec 25 2025 18:14:41
 * File name : mysql.strategy.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 18:14:41
 * 2025 Ankur Gangwar
 */


import { Pool } from "mysql2/typings/mysql/lib/Pool";

class MysqlLogger {
  private pool : Pool;
  private mysqlDB : Pool;
  constructor(mysqlDB:Pool) {
    this.mysqlDB = mysqlDB;
    this.pool = mysqlDB;
  }

  async log(level:string, event:string, payload:any) {
    await this.pool.execute(
      `INSERT INTO logs (level, event, payload, created_at) VALUES (?, ?, ?, NOW())`,
      [level, event, JSON.stringify(payload)]
    );
  }

  info(event:string, payload:any) {
    return this.log("INFO", event, payload);
  }

  error(event:string, payload:any) {
    return this.log("INFO", event, payload);
  }
}

export default MysqlLogger;
