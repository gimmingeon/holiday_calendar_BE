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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { login_id, password, name } = req.body;
            try {
                yield this.userService.signup(name, login_id, password);
                res.status(200).json({ message: "회원가입 완료" });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === "이미 존재하는 id입니다.") {
                        res.status(409).json({ message: error.message }); // 충돌
                    }
                    res.status(500).json({ message: "서버 오류가 발생했습니다." });
                }
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { login_id, password } = req.body;
            const token = yield this.userService.signIn(login_id, password);
            res.cookie('Authorization', `Bearer ${token}`);
            if (token) {
                res.status(200).json({ message: "로그인 성공" });
            }
            else {
                res.status(404).json({ message: "아이디 또는 비밀번호가 실패했습니다." });
            }
        });
    }
}
exports.UserController = UserController;
