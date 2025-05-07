import { Router } from "express";
import { Payment } from "../entity/payment.entity";
import { AppDataSourse } from "../data-sourse";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { jwtMiddleware } from "../middleware/jwt-validate-middleware";
import { paidUserMiddleware } from "../middleware/pyment-validate-middleware";

const paymentRouter = Router();

const paymentRepository = AppDataSourse.getRepository(Payment);
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

paymentRouter.post(
    '/',
    (req, res) => paymentController.paymentAdvise(req, res)
);

export default paymentRouter;