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
exports.MemberService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    registerMember(name, role, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const existedMember = await this.memberRepository.findOneBy({
            //     name: name
            // });
            // if (existedMember) {
            //     throw new Error('이미 존재하는 이름입니다 이름 뒤에 숫자를 붙여 구분하세요.');
            // }
            const registerMember = yield this.memberRepository.save({
                name: name,
                role: role,
                userId: userId
            });
            return registerMember;
        });
    }
    deleteMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findMember = yield this.memberRepository.findOneBy({ id });
            if (!findMember) {
                throw (0, http_errors_1.default)(404, "존재하지 않는 멤버입니다.");
            }
            yield this.memberRepository.delete({ id });
            return { message: "멤버가 삭제되었습니다." };
        });
    }
    updateMember(id, updateName, updateRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateMember = yield this.memberRepository.update({ id: id }, { name: updateName, role: updateRole });
            return this.memberRepository.findOneBy({ id: id });
        });
    }
    findAllMember(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAllMember = yield this.memberRepository.find({
                where: { userId: userId }
            });
            return findAllMember;
        });
    }
    findOneMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOneMember = yield this.memberRepository.findOneBy({
                id: id
            });
            return findOneMember;
        });
    }
}
exports.MemberService = MemberService;
