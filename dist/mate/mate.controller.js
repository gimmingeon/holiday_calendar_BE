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
class MateController {
    constructor(mateService) {
        this.mateService = mateService;
        this.registerMate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { memberAId, memberBId, mateRole } = req.body;
            const { id: userId } = req.user;
            try {
                yield this.mateService.registerMate(memberAId, memberBId, userId, mateRole);
                res.status(201).json({ message: "짝이 등록되었습니다." });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === "이미 등록된 짝입니다.") {
                        res.status(409).json({ message: error.message });
                    }
                    res.status(500).json({ message: "서버 오류가 발생" });
                }
            }
        });
        this.deleteMate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const { id: userId } = req.user;
            try {
                const mate = yield this.mateService.deleteMate(id, userId);
                res.status(200).json(mate);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message) {
                        res.status(400).json({ message: error.message });
                    }
                    res.status(500).json({ message: "서버 오류 발생" });
                }
            }
        });
        this.findAllMate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const mate = yield this.mateService.findAllMate(userId);
            res.status(200).json(mate);
        });
    }
}
exports.default = MateController;
