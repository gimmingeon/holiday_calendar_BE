"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourse = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const member_entity_1 = require("./entity/member.entity");
const payment_entity_1 = require("./entity/payment.entity");
const mate_entity_1 = require("./entity/mate.entity");
const memberCondition_entity_1 = require("./entity/memberCondition.entity");
exports.AppDataSourse = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "rlaals4411",
    database: "holiday_db",
    entities: [user_entity_1.User, member_entity_1.Member, payment_entity_1.Payment, mate_entity_1.Mate, memberCondition_entity_1.MemberCondition],
    synchronize: true,
    logging: true,
});
