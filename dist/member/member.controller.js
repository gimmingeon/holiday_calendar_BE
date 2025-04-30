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
class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
        this.registerMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, role } = req.body;
            const { id: userId } = req.user;
            const member = yield this.memberService.registerMember(name, role, userId);
            console.log('new member', member);
            res.status(201).json(member);
        });
        this.deleteMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const member = yield this.memberService.deleteMember(id);
            res.status(200).json(member);
        });
        this.updateMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, updateName, updateRole } = req.body;
            const member = yield this.memberService.updateMember(id, updateName, updateRole);
            res.status(200).json(member);
        });
        this.findAllMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const member = yield this.memberService.findAllMember(userId);
            res.status(200).json(member);
        });
        this.findOneMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const member = yield this.memberService.findOneMember(id);
            res.status(200).json(member);
        });
    }
}
exports.default = MemberController;
