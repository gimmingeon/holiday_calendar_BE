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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
class PaymentService {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    payment(paymentKey, orderId, userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretKey = process.env.TOSS_SECRET_KEY;
            const encoded = "Basic " + Buffer.from(secretKey + ":").toString("base64");
            const response = yield axios_1.default.post("https://api.tosspayments.com/v1/payments/confirm", {
                paymentKey, orderId, amount
            }, {
                headers: {
                    Authorization: encoded,
                    "Content-Type": "application/json"
                }
            });
            const paymentData = response.data;
            console.log("paymentdata: " + paymentData);
            const payment = yield this.paymentRepository.findOne({
                where: {
                    userId,
                    expiredAt: (0, typeorm_1.LessThan)(new Date())
                }
            });
            if (!payment) {
                yield this.paymentRepository.save({
                    userId: userId,
                    expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                });
            }
            else {
                yield this.paymentRepository.update({ userId: userId }, { expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            }
            return paymentData;
        });
    }
}
exports.PaymentService = PaymentService;
