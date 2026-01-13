/*
 * Created on Sat Jan 10 2026 01:11:11
 * File name : security.d.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Security guard contracts
 * These define what each security component MUST implement
 * 2026 Ankur Gangwar
 */ 

export interface deviceGaurd {
  isBlocked(userId: number, deviceId: string): Promise<boolean>;
}

export interface iPGuard {
  isBlocked(ip: string): Promise<boolean>;
}

export interface RateLimiter {
  check(ip: string, route: string): Promise<void>;
}

/**
 * Aggregate type returned by securityGuards()
 */
export interface SecurityGuards {
  deviceGaurd: deviceGaurd;
  iPGuard: iPGuard;
  rateLimiter: rateLimiter;
}
