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
exports.MemberConditionService = void 0;
class MemberConditionService {
    constructor(memberRepository, memberConditionRepository) {
        this.memberRepository = memberRepository;
        this.memberConditionRepository = memberConditionRepository;
    }
    registerCondition(memberId, notHoliday, avoidHoliday, connectNotHoliday, connectAvoidHoliday) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield this.memberRepository.findOneByOrFail({ id: memberId });
            let condition = yield this.memberConditionRepository.findOne({ where: { member: { id: memberId } } });
            if (condition) {
                condition.notHoliday = notHoliday;
                condition.avoidHoliday = avoidHoliday;
                condition.connectNotHoliday = connectNotHoliday;
                condition.connectAvoidHoliday = connectAvoidHoliday;
            }
            else {
                condition = this.memberConditionRepository.create({
                    member,
                    notHoliday,
                    avoidHoliday,
                    connectNotHoliday,
                    connectAvoidHoliday
                });
            }
            return yield this.memberConditionRepository.save(condition);
        });
    }
    deleteCondition(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = yield this.memberConditionRepository.findOne({
                where: { id },
                relations: ['member'],
            });
            if (!condition) {
                throw new Error("존재하지 않는 멤버조건입니다.");
            }
            if (condition.member.userId !== userId) {
                throw new Error("권한이 없는 아이디입니다.");
            }
            yield this.memberConditionRepository.delete({
                id
            });
            return { message: "조건이 삭제되었습니다." };
        });
    }
    findAllCondition(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = yield this.memberConditionRepository.find({
                where: { member: { userId } },
                relations: ['member']
            });
            return condition.map((member) => ({
                id: member.id,
                memberId: member.member.id,
                name: member.member.name,
                notHoliday: member.notHoliday,
                avoidHoliday: member.avoidHoliday,
                connectNotHoliday: member.connectNotHoliday,
                connectAvoidHoliday: member.connectAvoidHoliday
            }));
        });
    }
}
exports.MemberConditionService = MemberConditionService;
