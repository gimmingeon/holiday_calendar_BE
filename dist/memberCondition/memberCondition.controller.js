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
class MemberConditionController {
    constructor(memberConditionService) {
        this.memberConditionService = memberConditionService;
        this.registerCondition = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { memberId, notHoliday, avoidHoliday, connectNotHoliday, connectAvoidHoliday } = req.body;
            try {
                yield this.memberConditionService.registerCondition(memberId, notHoliday, avoidHoliday, connectNotHoliday, connectAvoidHoliday);
                res.status(201).json({ message: "조건이 등록됬습니다." });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message) {
                        res.status(400).json({ message: error.message });
                    }
                    res.status(500).json({ message: "서버 오류" });
                }
            }
        });
        this.deleteCondition = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const { id: userId } = req.user;
            try {
                const condition = yield this.memberConditionService.deleteCondition(id, userId);
                res.status(200).json(condition);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message) {
                        res.status(400).json({ message: error.message });
                    }
                    res.status(500).json({ message: "서버 오류" });
                }
            }
        });
        this.findAllCondition = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            try {
                const AllCondition = yield this.memberConditionService.findAllCondition(userId);
                res.status(200).json(AllCondition);
            }
            catch (error) {
                res.status(500).json({ message: "서버 오류" });
            }
        });
    }
}
exports.default = MemberConditionController;
// memberId: number,
// notHoliday: WeekRole[],
// avoidHoliday: WeekRole[],
// connectNotHoliday: number,
// connectAvoidHoliday: number
