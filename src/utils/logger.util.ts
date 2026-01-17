/*
 * Created on Sun Jan 18 2026 00:25:14
 * File name : logger.util.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 00:25:14
 * 2026 Ankur Gangwar
 */
const colors = {
  reset  : '\x1b[0m',
  red    : '\x1b[31m',
  green  : '\x1b[32m',
  yellow : '\x1b[33m',
  blue   : '\x1b[34m',
  cyan   : '\x1b[36m',
};

const log = {
  info   : (msg: string) => console.log(`${colors.blue}[INFO]: `, msg, `${colors.reset}`),
  success: (msg: string) => console.log(`${colors.green}[SUCCESS]: `, msg, `${colors.reset}`),
  warn   : (msg: string) => console.log(`${colors.yellow}[WARN]: `, msg, `${colors.reset}`),
  error  : (msg: string) => console.log(`${colors.red}[ERROR]: `, msg, `${colors.reset}`),
};

export default log;