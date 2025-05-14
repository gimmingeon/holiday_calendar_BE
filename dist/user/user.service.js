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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    signup(name, email, password, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedUser = yield this.userRepository.findOneBy({
                email
            });
            if (existedUser) {
                throw new Error("이미 존재하는 이메일입니다.");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 11);
            const signupUser = yield this.userRepository.save({
                email, password: hashedPassword, name, phoneNumber
            });
            return signupUser;
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedUser = yield this.userRepository
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.email = :email', { email })
                .getOne();
            if (!existedUser) {
                throw new Error("이메일가 틀렸습니다..");
            }
            else if (!(yield bcrypt_1.default.compare(password, existedUser.password))) {
                throw new Error("비밀번호가 틀렸습니다.");
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: existedUser.id }, 'custom-secret-key', { expiresIn: "3h" });
            return accessToken;
        });
    }
    myInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedUser = yield this.userRepository.findOneBy({
                id: userId
            });
            return existedUser;
        });
    }
}
exports.UserService = UserService;
