"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mate = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const member_entity_1 = require("./member.entity");
const mateRole_1 = require("./enum/mateRole");
let Mate = class Mate {
};
exports.Mate = Mate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], Mate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: mateRole_1.MateRole, default: mateRole_1.MateRole.together }),
    __metadata("design:type", String)
], Mate.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, { eager: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", member_entity_1.Member)
], Mate.prototype, "member1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, { eager: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", member_entity_1.Member)
], Mate.prototype, "member2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mate, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Mate.prototype, "user", void 0);
exports.Mate = Mate = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["member1", "member2"])
], Mate);
