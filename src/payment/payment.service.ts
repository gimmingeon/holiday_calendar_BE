import axios from "axios";
import dotenv from "dotenv"
import { LessThan, Repository } from "typeorm";
import { Payment } from "../entity/payment.entity";

dotenv.config();

export class PaymentService {

    constructor(
        private readonly paymentRepository: Repository<Payment>
    ) { }
    async payment(paymentKey: string, orderId: string, userId: number, amount: number) {
        const secretKey = process.env.TOSS_SECRET_KEY!;
        const encoded = "Basic " + Buffer.from(secretKey + ":").toString("base64");

        const response = await axios.post(
            "https://api.tosspayments.com/v1/payments/confirm",
            {
                paymentKey, orderId, amount
            },
            {
                headers: {
                    Authorization: encoded,
                    "Content-Type": "application/json"
                }
            }
        )

        const paymentData = response.data;
        console.log("paymentdata: " + paymentData);

        const payment = await this.paymentRepository.findOne({
            where: {
                userId,
                expiredAt: LessThan(new Date())
            }
        });

        if (!payment) {
            await this.paymentRepository.save({
                userId: userId,
                expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            })
        } else {
            await this.paymentRepository.update(
                { userId: userId },
                { expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
            )
        }

        return paymentData;
    }
}