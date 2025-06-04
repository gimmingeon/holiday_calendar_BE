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
exports.MateService = void 0;
class MateService {
    constructor(mateRepository, userRepository, memberRepository) {
        this.mateRepository = mateRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
    }
    registerMate(memberAId, memberBId, userId, mateRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const [member1Id, member2Id] = [memberAId, memberBId].sort((a, b) => a - b);
            const user = yield this.userRepository.findOneByOrFail({ id: userId });
            const member1 = yield this.memberRepository.findOneByOrFail({ id: member1Id });
            const member2 = yield this.memberRepository.findOneByOrFail({ id: member2Id });
            const existedMate = yield this.mateRepository.findOne({
                where: {
                    member1: { id: member1Id },
                    member2: { id: member2Id },
                    user: { id: userId },
                }
            });
            if (existedMate) {
                throw new Error('이미 등록된 짝입니다.');
            }
            const mates = this.mateRepository.create({ user, member1, member2, role: mateRole });
            return yield this.mateRepository.save(mates);
        });
    }
    deleteMate(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedMate = yield this.mateRepository.findOneBy({
                id
            });
            if ((existedMate === null || existedMate === void 0 ? void 0 : existedMate.user.id) !== userId) {
                throw new Error("권한이 없습니다.");
            }
            if (!existedMate) {
                throw new Error('존재하지 않는 짝입니다.');
            }
            yield this.mateRepository.delete({
                id
            });
            return { message: "짝이 삭제되었습니다." };
        });
    }
    findAllMate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mates = yield this.mateRepository.find({
                where: { user: { id: userId } }
            });
            return mates.map((mate) => ({
                id: mate.id,
                role: mate.role,
                member1Name: mate.member1.name,
                member2Name: mate.member2.name
            }));
        });
    }
}
exports.MateService = MateService;
