import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    try {
        const { Authorization } = req.cookies;

        if (!Authorization) {
            throw new Error("토큰이 존재하지 않습니다.");
        }

        const [tokenType, toeknValue] = Authorization.split(' ');

        if (tokenType !== "Bearer") {
            throw new Error("토큰 타입이 일치하지 않습니다.");
        }

        if (!toeknValue) {
            throw new Error("인증 방식이 올바르지 않습니다.");
        }

        const decoded = jwt.verify(toeknValue, 'custom-secret-key');

        (req as any).user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
}