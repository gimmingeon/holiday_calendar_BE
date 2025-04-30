import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import calendarRouter from "./calendar/calendar.router";
import { AppDataSourse } from "./data-sourse";
import userRouter from "./user/user.router";
import memberRouter from "./member/member.router";
import cookieParser from "cookie-parser";
import { jwtMiddleware } from "./middleware/jwt-validate-middleware";

AppDataSourse.initialize()
    .then(() => {
        console.log("✅ DB 연결 성공!");
        const app: Express = express();

        app.use(bodyParser.json());
        app.use(express.json());
        app.use(cookieParser());

        app.use('/calendar', jwtMiddleware, calendarRouter);
        app.use('/user', userRouter);
        app.use('/member', jwtMiddleware, memberRouter);

        const port: number = 3000;
        app.listen(port, () => {
            console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
        });
    })
    .catch(error => {
        console.error("❌ DB 연결 실패!");
        console.error(error);
    });
