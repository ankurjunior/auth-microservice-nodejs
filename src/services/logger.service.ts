/*
 * Created on Thu Dec 25 2025 15:22:25
 * File name : logger.service.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 15:22:25
 * 2025 Ankur Gangwar
 */

class LoggerService {
  private loggerStrategy: any;
  constructor(loggerStrategy:any) {
    this.loggerStrategy = loggerStrategy;
  }

  info(event: string, payload:any) {
    return this.loggerStrategy.info(event, payload);
  }

  error(event: string, payload:any) {
    return this.loggerStrategy.info(event, payload);
  }
}

export default LoggerService;
