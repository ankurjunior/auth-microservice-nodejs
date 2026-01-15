/*
 * Created on Wed Jan 07 2026 22:45:45
 * File name : index.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Wed Jan 07 2026 22:45:45
 * 2026 Ankur Gangwar
 */

import { connnections } from '../config/';
import DeviceGaurd from './device.guard';
import RateLimiter from './rate.limiter';
import IPGaurd from './ip.guard';
import TokenGuard from './token.guard.js';


export async function securityGuards() {
  const { redis }   = await connnections();
  const deviceGaurd = new DeviceGaurd(redis);
  const rateLimiter = new RateLimiter(redis);
  const iPGuard     = new IPGaurd(redis);
  const tokenGuard  = new TokenGuard(redis);

  return {
    deviceGaurd,
    rateLimiter,
    iPGuard,
    tokenGuard
  };
}