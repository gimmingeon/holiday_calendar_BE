"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(toeknValue, 'custom-secret-key');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
};
exports.jwtMiddleware = jwtMiddleware;
