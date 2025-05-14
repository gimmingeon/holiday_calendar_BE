"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_sourse_1 = require("./data-sourse");
const user_router_1 = __importDefault(require("./user/user.router"));
const member_router_1 = __importDefault(require("./member/member.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jwt_validate_middleware_1 = require("./middleware/jwt-validate-middleware");
const payment_router_1 = __importDefault(require("./payment/payment.router"));
const payment_entity_1 = require("./entity/payment.entity");
const re_payment_validate_middleware_1 = require("./middleware/re-payment-validate-middleware");
data_sourse_1.AppDataSourse.initialize()
    .then(() => {
    console.log("✅ DB 연결 성공!");
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    // app.use('/calendar', jwtMiddleware, calendarRouter);
    const paymentRepository = data_sourse_1.AppDataSourse.getRepository(payment_entity_1.Payment);
    app.use('/user', user_router_1.default);
    app.use('/member', jwt_validate_middleware_1.jwtMiddleware, 
    //paidUserMiddleware(paymentRepository),
    member_router_1.default);
    app.use('/payment', jwt_validate_middleware_1.jwtMiddleware, (0, re_payment_validate_middleware_1.rePaidUserMiddleware)(paymentRepository), payment_router_1.default);
    const port = 3000;
    app.listen(port, () => {
        console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
    });
})
    .catch(error => {
    console.error("❌ DB 연결 실패!");
    console.error(error);
});
