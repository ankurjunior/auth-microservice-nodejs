import "express";

declare module "express-serve-static-core" {
  interface Request {
    deviceId:string;
    tokenService?:any;
    authService?:any;
    context?: {
      requestId: string;
      ip?: string;
      deviceId?: string;
      userAgent?: string;
      startTime: number;
      username: string | null;
    };
    user?:{
      id:number
    }
  }
}