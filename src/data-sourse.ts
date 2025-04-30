import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Member } from "./entity/member.entity";

export const AppDataSourse = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "rlaals4411",
    database: "holiday_db",
    entities: [User, Member],
    synchronize: true,
    logging: true,
})