import { MoreThan, Repository } from "typeorm";
import { Payment } from "../entity/payment.entity";
import { NextFunction, Request, Response } from "express";

export const paidUserMiddleware = (paymentRepository: Repository<Payment>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id: userId } = (req as any).user;

            const now = new Date();

            const payment = await paymentRepository.findOne({
                where: {
                    userId: userId,
                    expiredAt: MoreThan(now)
                }
            });

            if (!payment) {
                res.status(403).json({ message: "결제를 하지 않거나 결제일이 지났습니다." })
                return;
            }

            next();

        } catch (error) {
            console.error("결제 확인 중 오류: ", error);
            res.status(500).json({ message: "서버 오류" });
        }
    }
}