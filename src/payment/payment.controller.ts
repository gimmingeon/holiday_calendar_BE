import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    paymentAdvise = async (req: Request, res: Response): Promise<void> => {

        const { paymentKey, orderId, amount }: { paymentKey: string, orderId: string, amount: number } = req.body;

        const { id: userId } = (req as any).user;

        const paymentAdvise = await this.paymentService.payment(paymentKey, orderId, userId, amount)

        res.status(200).json({ message: "결제 완료", paymentAdvise })
    }
}