/*
 * Created on Fri Jan 09 2026 23:31:37
 * File name : auth.controller.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Fri Jan 09 2026 23:31:37
 * 2026 Ankur Gangwar
 */

import { Request, Response } from "express"; 
 
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await req.authService.login(
      req.params.type,
      req.body
    );

    res.status(200).json({ data: token });
  } catch (err: any) {
    res.status(401).json({
      message: err.message || "Authentication failed",
    });
  }
};




export const logout = async (req: Request, res: Response) => {
  try {
    await req.logoutService.logout({
      accessToken: req.headers.authorization,
      refreshJTI: req.body?.refreshJti
    });
    res.json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(403).json({
      message: err.message || "Gadbad ho gai h!!"
    }); 
  }
}