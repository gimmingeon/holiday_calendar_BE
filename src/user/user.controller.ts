import { UserService } from "./user.service";
import { Response, Request } from "express";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    signUp = async (req: Request, res: Response): Promise<void> => {

        const { email, password, name, phoneNumber }: { email: string, password: string, name: string, phoneNumber: string } = req.body;

        try {
            await this.userService.signup(name, email, password, phoneNumber);

            res.status(200).json({ message: "회원가입 완료" });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "이미 존재하는 id입니다.") {
                    res.status(409).json({ message: error.message }); // 충돌
                }
                res.status(500).json({ message: "서버 오류가 발생했습니다." });
            }
        }
    }

    signIn = async (req: Request, res: Response): Promise<void> => {
        const { email, password }: { email: string, password: string } = req.body;

        try {
            const token = await this.userService.signIn(email, password);

            res.cookie('Authorization', `Bearer ${token}`);
            res.status(200).json({ message: "로그인 성공" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            }
        }

    }

    myInfo = async (req: Request, res: Response): Promise<void> => {
        const { id: userId } = (req as any).user;

        const myInfo = await this.userService.myInfo(userId);

        res.status(200).json(myInfo);
    }
}