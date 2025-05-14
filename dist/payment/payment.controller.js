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
exports.PaymentController = void 0;
class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.paymentAdvise = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { paymentKey, orderId, amount } = req.body;
            const { id: userId } = req.user;
            const paymentAdvise = yield this.paymentService.payment(paymentKey, orderId, userId, amount);
            res.status(200).json({ message: "결제 완료", paymentAdvise });
        });
    }
}
exports.PaymentController = PaymentController;
