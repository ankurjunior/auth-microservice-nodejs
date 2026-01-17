/*
 * Created on Thu Dec 25 2025 18:06:01
 * File name : console.strategy.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 18:06:01 | Console Logger | Every login request will be logged by logger on CONSOLE only
 * 2025 Ankur Gangwar
 */

import log from "../../utils/logger.util.js";
class ConsoleLogger {

  loggerError(level: string, event: string, payload: any) {
    log.error(
      JSON.stringify({
        level: level,
        event,
        payload,
        timestamp: new Date().toISOString(),
      })
    );
  }


  loggerInfo(level: string, event: string, payload: any) {
    log.info(
      JSON.stringify({
        level: level,
        event,
        payload,
        timestamp: new Date().toISOString(),
      })
    );
  }


  info(event: string, payload: any) {
    return this.loggerInfo("INFO", event, payload);
  }

  error(event: string, payload: any) {
    return this.loggerError("ERROR", event, payload);
  }
}

export default ConsoleLogger;
