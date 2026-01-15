import { Router } from "express";

const router = Router();
import { Request, Response, NextFunction } from "express";
/**
 * Loading controllers
 */
import {login} from "../controllers/auth.controller.js";
import loginRequestLogger from "../logger/loginRequest.logger.js";
import loginResultLogger from "../logger/loginResult.logger.js";
import authTokenRotationLogger from "../logger/authTokenRotation.logger.js";
import {securityGuards} from "../security/index.js";
import securityMiddleware from "../middleware/security.middleware.js"; 
import authCheck from "../middleware/auth.check.middleware.js";

const secure    = securityMiddleware(securityGuards);
const AuthCheck = authCheck(securityGuards);
 
/**
 * @swagger
 * /auth/login/password:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: test_user
 *               password:
 *                 type: string
 *                 example: Test@123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login/:type",
  secure,
  loginRequestLogger,
  loginResultLogger,
  login
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Token Rotation
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: xxxxxxxxxxxx
 *     responses:
 *       200:
 *         description: New Token Received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

router.post("/refresh", AuthCheck, secure, authTokenRotationLogger, async (req: Request, res : Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  // const response = await req.tokenService.refresh(refreshToken);
  const response = '';
  return res.json(response);
});

export default router;
