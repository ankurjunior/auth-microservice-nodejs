/*
 * Created on Thu Dec 25 2025 18:06:01
 * File name : console.strategy.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 18:06:01 | Console Logger | Every login request will be logged by logger on CONSOLE only
 * 2025 Ankur Gangwar
 */

/**
 *
 */
class ConsoleLogger {

  log(level: string, event: string, payload: any) {
    console.log(
      JSON.stringify({
        level: level,
        event,
        payload,
        timestamp: new Date().toISOString(),
      })
    );
  }

  info(event: string, payload: any) {
    return this.log("INFO", event, payload);
  }

  error(event: string, payload: any) {
    return this.log("ERROR", event, payload);
  }
}

export default ConsoleLogger;
