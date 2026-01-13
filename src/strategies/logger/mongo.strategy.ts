/*
 * Created on Tue Jan 13 2026 00:46:16
 * File name : mongo.strategy.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Tue Jan 13 2026 00:46:16
 * 2026 Ankur Gangwar
 */


import LogModel from "../../model/log.model";

class MongoDBLogger { 

  async log(level:string, event:string, payload:any) {
    await LogModel.create({
      level: level,
      event,
      payload,
      timestamp: new Date().toISOString(),
    });
  }

  info(event:string, payload:any) {
    return this.log("INFO", event, payload);
  }

  async error(event:string, payload:any) {
    return this.log("ERROR", event, payload);
  }
}

export default MongoDBLogger;
