/*
 * Created on Fri Jan 16 2026 00:03:17
 * File name : logout.service.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Fri Jan 16 2026 00:03:17
 * 2026 Ankur Gangwar
 */
 
import jwt, { JwtPayload } from "jsonwebtoken";


interface LogoutPayload {
    accessToken: any, refreshJti: string
}

class LogoutService { 

    constructor(private tokenGuard :any ) {  }

    /**
     * 
     * @param param0 
     */
    async logout({ accessToken, refreshJti }: LogoutPayload) { 
        const now = Math.floor(Date.now() / 1000);  
        
        const payload = jwt.verify(
            accessToken,
            process.env.JWT_SECRET!,
            { ignoreExpiration: true }
        ) as JwtPayload;
  
        await this.tokenGuard.block({ type: "access", jti: payload.jti, expireInSeconds: (payload.exp!-now) });
    }
}

export default LogoutService;