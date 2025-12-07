

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config";


const authorize = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "No token provided",
                });
            }

            // Handle Bearer token
            if (token.startsWith("Bearer ")) {
                token = token.split(" ")[1];
            }

            // Verify token
            const decoded = jwt.verify(
                token!,
                config.jwtSecret as string
            ) as JwtPayload;

            req.user = decoded;

            // Role access check
            if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized request!!",
                });
            }

            // Admin → full access
            if (decoded.role === "admin") {
                return next();
            }

            // Customer → only for routes having :userId
            if (decoded.role === "customer" && req.params.userId) {
                const paramAsNumber = Number(req.params.userId);

                if (decoded.id !== paramAsNumber) {
                    return res.status(403).json({
                        success: false,
                        message: "You can only access your own data",
                    });
                }
            }

            next();
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
                error: error.message,
            });
        }
    };
};


export default authorize;