import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WeekRole } from "./enum/weekRole";
import { Member } from "./member.entity";

@Entity()
export class MemberCondition {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: "simple-array" })
    notHoliday!: WeekRole[];

    @Column({ type: "simple-array" })
    avoidHoliday!: WeekRole[];

    @Column({ type: "int", unsigned: true })
    connectNotHoliday!: number;

    @Column({ type: "int", unsigned: true })
    connectAvoidHoliday!: number;

    @OneToOne(() => Member, { onDelete: 'CASCADE' })
    @JoinColumn()
    member!: Member;

}