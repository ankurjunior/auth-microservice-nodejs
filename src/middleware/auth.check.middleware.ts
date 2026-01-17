/*
 * Created on Thu Jan 15 2026 22:01:55
 * File name : auth.check.middleware.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Jan 15 2026 22:01:55
 * 2026 Ankur Gangwar
 */

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { SecurityGuards } from "../types/security.js";
import { Request, Response, NextFunction } from "express";
import { decode } from "punycode";
type SecurityGuardsType = () => Promise<SecurityGuards>;

interface gaurdPayload {
    type: string,
    jti: string,
    expireInSeconds?: number
}

const authCheck = (securityGuards: SecurityGuardsType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { tokenGuard } = await securityGuards();
            const token = req.headers?.authorization?.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Auth Token is Missing!! Don't try to be smart" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
            const isBlocked = await tokenGuard.isBlocked({ type: "refresh", jti: decoded.jti });

            if (isBlocked) {
                return res.status(401).json({ message: "Auth Token is Missing!! Don't try to be smart" });
            }

            req.user = decoded; 
            next();
        } catch (err) {
            next(err);
        }

    }
}


export default authCheck;