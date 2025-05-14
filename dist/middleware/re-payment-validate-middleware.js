"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rePaidUserMiddleware = void 0;
const typeorm_1 = require("typeorm");
const rePaidUserMiddleware = (paymentRepository) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id: userId } = req.user;
            const now = new Date();
            const payment = yield paymentRepository.findOne({
                where: {
                    userId: userId,
                    expiredAt: (0, typeorm_1.MoreThan)(now)
                }
            });
            if (payment) {
                res.status(403).json({ message: "아직 월정액 기간이 남아있습니다." });
                return;
            }
            next();
        }
        catch (error) {
            console.error("결제 확인 중 오류: ", error);
            res.status(500).json({ message: "서버 오류" });
        }
    });
};
exports.rePaidUserMiddleware = rePaidUserMiddleware;
