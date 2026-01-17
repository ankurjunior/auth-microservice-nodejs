/*
 * Created on Fri Jan 16 2026 00:03:17
 * File name : logout.service.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Fri Jan 16 2026 00:03:17
 * 2026 Ankur Gangwar
 */

import { securityGuards } from "../security/index.js"; 
import Redis from "ioredis";
import jwt, { JwtPayload } from "jsonwebtoken";


interface logoutPayload {
    accessToken: any, refreshJti: string
}

class LogoutService {
    private redis: Redis;

    constructor(redis: Redis) {
        this.redis = redis;
    }

    /**
     * 
     * @param param0 
     */
    async logout({ accessToken, refreshJti }: logoutPayload) {
        const { tokenGuard } = await securityGuards();
        const now = Math.floor(Date.now() / 1000);
        const token = accessToken.split(" ")[1];
    

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!,
            { ignoreExpiration: true }
        ) as JwtPayload;

        // Access token revoke
        await tokenGuard.block({ type: "access", jti: payload.jti, expireInSeconds: 1098765432 });
    }
}

export default LogoutService;